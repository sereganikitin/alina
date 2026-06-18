import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import FloatingContact from "@/components/FloatingContact";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
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
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
