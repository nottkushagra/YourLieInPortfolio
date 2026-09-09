import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
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
  title: "Your Lie in Portfolio — The Spring I Found Code",
  description:
    "A collection of projects, memories, ideas, and dreams written in code. An immersive digital experience inspired by music, spring, and the art of storytelling.",
  keywords: [
    "portfolio",
    "developer",
    "software engineer",
    "interactive",
    "creative",
    "Kushagra",
    "spring symphony",
  ],
  openGraph: {
    title: "Your Lie in Portfolio — The Spring I Found Code",
    description:
      "A collection of projects, memories, ideas, and dreams — written in code.",
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
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="bg-bg-base text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
