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
 * На мобиле — бургер с полноэкранным меню.
 */
export default function SiteHeader() {
  const [onDark, setOnDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const HEADER_MID = 32;
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

      // На самом верху (загрузка) шапка прозрачная — её не видно поверх hero.
      // При любом скролле включаем фон-плашку, чтобы контент (в т.ч. hero)
      // срезался под меню и текст не наезжал на текст шапки.
      setScrolled(window.scrollY > 8);
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("navthemerefresh", compute);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("navthemerefresh", compute);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Блокируем прокрутку фона, когда открыто мобильное меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Цвет иконки/брендов: при открытом меню фон светлый -> тёмный текст
  const light = onDark && !open;
  const brand = light ? "text-gold" : "text-foreground";
  const sub = light ? "text-white/90" : "text-foreground/75";
  const link = light
    ? "text-white/90 hover:text-white"
    : "text-foreground/75 hover:text-foreground";
  const burger = light ? "bg-white" : "bg-foreground";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled && !open
          ? "bg-background/55 backdrop-blur-xl backdrop-saturate-150"
          : ""
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-12">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="transition-colors"
        >
          <span
            className={`block font-display text-[1.8rem] leading-none tracking-wide md:text-4xl ${brand}`}
          >
            Алина Дубовская
          </span>
          <span
            className={`mt-1.5 block font-sans text-sm lowercase tracking-wide ${sub}`}
          >
            психолог
          </span>
        </a>

        {/* Десктоп-меню */}
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

        {/* Бургер (мобилка) */}
        <button
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`h-0.5 w-6 rounded-full transition-all ${burger} ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded-full transition-all ${burger} ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded-full transition-all ${burger} ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Полноэкранное мобильное меню */}
      {open && (
        <nav className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-background md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-2xl text-foreground transition-colors hover:text-terracotta"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
