import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
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
  title: "Kushagra — Portfolio",
  description:
    "A curated collection of projects, ideas, and dreams — built with care, inspired by spring.",
  keywords: [
    "portfolio",
    "developer",
    "software engineer",
    "AI",
    "full-stack",
    "Kushagra",
  ],
  openGraph: {
    title: "Kushagra — Portfolio",
    description:
      "A curated collection of projects, ideas, and dreams — built with care.",
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
      <body className="bg-bg-base text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
