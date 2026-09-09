"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Voice() {
  return (
    <section
      id="voice"
      className="relative min-h-screen flex items-center px-8 md:px-16 lg:px-24 py-32 overflow-hidden"
      style={{ backgroundColor: "var(--color-night)" }}
    >
      {/* Ambient glow — slightly warmer */}
      <div
        className="absolute top-0 right-0 w-[50%] h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 75% 40%, rgba(196, 164, 108, 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Content column — 25% from left, narrow */}
      <div className="relative z-10 w-full max-w-[560px] ml-0 md:ml-[8%]">
        <ScrollReveal>
          <p className="type-body text-base md:text-lg leading-[1.9]">
            I fell in love with building things the way most people fall in love
            with music — slowly, and then all at once.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="type-body text-base md:text-lg leading-[1.9] mt-8">
            Right now I&apos;m deep into{" "}
            <span className="text-cream font-medium">machine learning</span>{" "}
            and{" "}
            <span className="text-cream font-medium">
              full-stack development
            </span>
            . Not because they&apos;re trending. Because I want to understand
            how things think — and how to make them think better.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="type-body text-base md:text-lg leading-[1.9] mt-8">
            When I&apos;m not writing code, I&apos;m listening to Einaudi,
            reading about distributed systems, or thinking about what to build
            next.
          </p>
        </ScrollReveal>

        {/* Quote */}
        <ScrollReveal delay={0.45}>
          <div className="mt-14 pl-6 border-l border-golden/15">
            <p className="type-editorial text-[15px] text-cream-muted leading-[2]">
              &ldquo;The best technology is the kind you don&apos;t notice — it
              just works, and it makes life a little better.&rdquo;
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
