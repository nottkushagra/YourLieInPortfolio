"use client";

import {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  sineOffset: number;
  sineSpeed: number;
  sineAmplitude: number;
  color: string;
  shape: number; // 0-2 for different petal shapes
}

export interface SakuraParticlesRef {
  triggerBurst: (x: number, y: number, count?: number) => void;
}

const PETAL_COLORS = [
  "rgba(255, 183, 213, ALPHA)", // sakura pink
  "rgba(255, 214, 232, ALPHA)", // light pink
  "rgba(255, 255, 255, ALPHA)", // white
  "rgba(196, 181, 253, ALPHA)", // occasional lavender
  "rgba(255, 200, 220, ALPHA)", // mid pink
];

const SakuraParticles = forwardRef<SakuraParticlesRef>(function SakuraParticles(
  _,
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animRef = useRef<number>(0);
  const reducedMotion = useRef(false);
  const windRef = useRef({ angle: 0, speed: 0.3 });

  const createPetal = useCallback(
    (x?: number, y?: number, burst = false): Petal => {
      const canvas = canvasRef.current;
      const w = canvas?.width || window.innerWidth;
      const h = canvas?.height || window.innerHeight;

      return {
        x: x ?? Math.random() * w,
        y: y ?? -20 - Math.random() * 100,
        size: 5 + Math.random() * 10,
        speedY: burst ? -2 - Math.random() * 4 : 0.3 + Math.random() * 0.6,
        speedX: burst
          ? (Math.random() - 0.5) * 5
          : (Math.random() - 0.5) * 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: 0.12 + Math.random() * 0.3,
        sineOffset: Math.random() * Math.PI * 2,
        sineSpeed: 0.008 + Math.random() * 0.015,
        sineAmplitude: 20 + Math.random() * 30,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        shape: Math.floor(Math.random() * 3),
      };
    },
    []
  );

  const triggerBurst = useCallback(
    (x: number, y: number, count = 15) => {
      for (let i = 0; i < count; i++) {
        petalsRef.current.push(createPetal(x, y, true));
      }
    },
    [createPetal]
  );

  useImperativeHandle(ref, () => ({ triggerBurst }), [triggerBurst]);

  useEffect(() => {
    // Check reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
    if (mq.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize petals
    for (let i = 0; i < 25; i++) {
      const petal = createPetal();
      petal.y = Math.random() * canvas.height;
      petalsRef.current.push(petal);
    }

    let time = 0;

    const drawPetal = (ctx: CanvasRenderingContext2D, petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.globalAlpha = petal.opacity;

      const colorWithAlpha = petal.color.replace("ALPHA", String(petal.opacity));

      if (petal.shape === 0) {
        // Classic ellipse petal
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size * 0.5, petal.size, 0, 0, Math.PI * 2);
        ctx.fillStyle = colorWithAlpha;
        ctx.fill();
      } else if (petal.shape === 1) {
        // Heart-like petal
        ctx.beginPath();
        ctx.moveTo(0, -petal.size * 0.4);
        ctx.bezierCurveTo(
          petal.size * 0.6, -petal.size,
          petal.size * 0.8, 0,
          0, petal.size * 0.6
        );
        ctx.bezierCurveTo(
          -petal.size * 0.8, 0,
          -petal.size * 0.6, -petal.size,
          0, -petal.size * 0.4
        );
        ctx.fillStyle = colorWithAlpha;
        ctx.fill();
      } else {
        // Teardrop petal
        ctx.beginPath();
        ctx.moveTo(0, -petal.size * 0.5);
        ctx.quadraticCurveTo(
          petal.size * 0.5, 0,
          0, petal.size * 0.5
        );
        ctx.quadraticCurveTo(
          -petal.size * 0.5, 0,
          0, -petal.size * 0.5
        );
        ctx.fillStyle = colorWithAlpha;
        ctx.fill();
      }

      // Highlight on all shapes
      ctx.beginPath();
      ctx.ellipse(
        -petal.size * 0.1,
        -petal.size * 0.15,
        petal.size * 0.2,
        petal.size * 0.3,
        0.3,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${petal.opacity * 0.25})`;
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;

      // Update wind direction slowly
      windRef.current.angle += 0.001;
      const windX = Math.sin(windRef.current.angle) * windRef.current.speed;

      petalsRef.current.forEach((petal, i) => {
        // Update position with wind
        petal.y += petal.speedY;
        petal.x +=
          petal.speedX +
          windX +
          Math.sin(time * petal.sineSpeed + petal.sineOffset) *
            (petal.sineAmplitude * 0.008);
        petal.rotation += petal.rotationSpeed;

        // Burst petals slow down (gravity)
        if (petal.speedY < 0) {
          petal.speedY += 0.06;
          petal.opacity *= 0.998;
        }

        // Reset if off screen
        if (petal.y > canvas.height + 30) {
          petalsRef.current[i] = createPetal();
        }
        if (petal.x < -40 || petal.x > canvas.width + 40) {
          petalsRef.current[i] = createPetal();
        }

        drawPetal(ctx, petal);
      });

      // Clean up excess burst petals
      if (petalsRef.current.length > 70) {
        petalsRef.current = petalsRef.current.slice(-50);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [createPetal]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none"
      aria-hidden="true"
    />
  );
});

export default SakuraParticles;
