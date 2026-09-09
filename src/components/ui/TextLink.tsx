"use client";

import { motion } from "framer-motion";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  accent?: string;
  className?: string;
  external?: boolean;
}

export default function TextLink({
  href,
  children,
  accent = "var(--color-cream)",
  className = "",
  external = true,
}: TextLinkProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`relative inline-block text-cream-faded hover:text-cream transition-colors duration-300 cursor-pointer ${className}`}
      data-cursor="interactive"
      whileHover="hover"
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-px"
        style={{ backgroundColor: accent }}
        initial={{ width: "0%" }}
        variants={{
          hover: { width: "100%" },
        }}
        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
      />
    </motion.a>
  );
}
