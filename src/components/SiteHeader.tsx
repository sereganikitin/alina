"use client";

import { useEffect, useState } from "react";

const NAV = [
  { label: "Обо мне", href: "#about" },
  { label: "Принципы работы", href: "#principles" },
  { label: "О подходе", href: "#approach" },
  { label: "Консультация", href: "#booking" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

/**
 * Фиксированная шапка. Контраст подстраивается под фон секции под ней:
 * секции помечены data-nav-theme="dark" (тёмный фон) | "light" (светлый фон).
 */
export default function SiteHeader() {
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const HEADER_MID = 32; // точка замера — середина шапки

    const compute = () => {
      const sections =
        document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      let dark = false;
      sections.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= HEADER_MID && r.bottom > HEADER_MID) {
          dark = el.dataset.navTheme === "dark";
        }
      });
      setOnDark(dark);
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("navthemerefresh", compute); // смена варианта в Hero
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("navthemerefresh", compute);
      cancelAnimationFrame(raf);
    };
  }, []);

  const brand = onDark ? "text-gold" : "text-foreground";
  const link = onDark
    ? "text-white/90 hover:text-white"
    : "text-foreground/75 hover:text-foreground";

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="flex items-center justify-between px-6 py-5 md:px-12">
        <a
          href="#top"
          className={`font-display text-2xl tracking-wide transition-colors ${brand}`}
        >
          Алина
        </a>
        <nav className="hidden gap-7 text-sm tracking-wide md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`transition-colors ${link}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
