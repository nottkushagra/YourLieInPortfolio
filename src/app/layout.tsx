import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "kushagra's web ★ revki.me",
  description:
    "Kushagra's single-viewport dashboard & memoir. Machine learning, full-stack engineering, and interactive systems.",
  keywords: [
    "portfolio",
    "developer",
    "machine learning",
    "software engineer",
    "AI",
    "full-stack",
    "Kushagra",
    "revki.me",
    "isobelsweb",
    "neocities",
  ],
  openGraph: {
    title: "kushagra's web ★ revki.me",
    description:
      "A single-viewport dashboard & memoir in code. Crafted with care.",
    type: "website",
    url: "https://revki.me",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`} data-theme="lime">
      <body className="antialiased bg-[#0c1017] text-[#f3efe6]">
        {children}
      </body>
    </html>
  );
}
