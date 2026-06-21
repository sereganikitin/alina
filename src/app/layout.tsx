import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import FloatingContact from "@/components/FloatingContact";

// Заголовки — Moniqa Heading (regular). Файл лежит в public/fonts.
const moniqa = localFont({
  variable: "--font-moniqa",
  src: "../../public/fonts/Moniqa-Paragraph.ttf",
  display: "swap",
});

// Остальной текст — FactorA Regular. Файл в public/fonts.
const factorA = localFont({
  variable: "--font-factora",
  src: "../../public/fonts/FactorA-Regular.woff2",
  display: "swap",
});

// Playfair — glyph-fallback для заголовков (например, кириллица, если её нет в Moniqa).
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Inter — glyph-fallback для основного текста.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Алина — психолог, EMDR- и IFS-терапевт",
  description:
    "Психолог, EMDR-терапевт, IFS-терапевт, танцевально-двигательный терапевт. Работа с травмой, ПТСР, границами, психосоматикой.",
  // Пока сайт не готов — полностью скрываем от поисковиков
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${moniqa.variable} ${factorA.variable} ${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
