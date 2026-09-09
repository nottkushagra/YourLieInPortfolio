import type { Metadata } from "next";
import {
  Playfair_Display,
  Inter,
  JetBrains_Mono,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-editorial",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Lie in Portfolio — Kushagra",
  description:
    "A cinematic memoir in code. An interactive journey through one person's relationship with building things.",
  keywords: [
    "portfolio",
    "developer",
    "software engineer",
    "AI",
    "full-stack",
    "Kushagra",
    "cinematic",
    "interactive",
  ],
  openGraph: {
    title: "Your Lie in Portfolio — Kushagra",
    description:
      "A cinematic memoir in code. Not a portfolio — an experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-void text-cream font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
