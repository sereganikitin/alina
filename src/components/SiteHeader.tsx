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
    // Высота «плашки» шапки: ниже неё контент срезается фоном.
    const HEADER_H = 76;
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

      // Hero — первая секция с data-nav-theme. Пока он на экране — шапка прозрачная;
      // как только ушёл под шапку — включаем фон-плашку (контент срезается под меню).
      const hero = document.querySelector<HTMLElement>("[data-nav-theme]");
      setScrolled(hero ? hero.getBoundingClientRect().bottom <= HEADER_H : true);
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
  const sub = light ? "text-white/70" : "text-muted";
  const link = light
    ? "text-white/90 hover:text-white"
    : "text-foreground/75 hover:text-foreground";
  const burger = light ? "bg-white" : "bg-foreground";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled && !open
          ? "border-b border-white/15 bg-background/50 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-150"
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
            className={`block font-display text-[1.6rem] font-semibold leading-none tracking-wide md:text-3xl ${brand}`}
          >
            Алина Дубовская
          </span>
          <span
            className={`mt-1.5 block font-sans text-[0.65rem] uppercase tracking-[0.3em] md:text-xs ${sub}`}
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
