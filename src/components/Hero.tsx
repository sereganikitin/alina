"use client";

import { useEffect, useState } from "react";
import Wave from "./Wave";
import { useContent } from "@/lib/useContent";

type Variant = {
  id: string;
  label: string;
  image: string;
  dark: boolean; // тёмное фото -> золотой/светлый текст
  // Кадрирование: size — зум (даёт вертикальный запас), position — сдвиг.
  // Чем больше Y в position, тем выше «поднимается» фото (меньше места над головой).
  // bg — цвет подложки за фото (для «отдаления» без видимого шва).
  size: string;
  position: string;
  bg: string;
};

// Минималистичные контурные иконки (стиль как у конвертика формы).
const iconCls = "h-5 w-5 sm:h-6 sm:w-6";
const PersonIcon = (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5.5 19.2c0-3.5 2.9-5.8 6.5-5.8s6.5 2.3 6.5 5.8" />
  </svg>
);
const ClockIcon = (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7.6V12l3 1.8" />
  </svg>
);
const LaptopIcon = (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4.5" y="5.5" width="15" height="10" rx="1.6" />
    <path d="M2.5 19h19" />
  </svg>
);
const LockIcon = (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    <circle cx="12" cy="15" r="1.1" />
  </svg>
);
// Иконки сопоставляются цифрам по позиции (см. defaultContent.ts → hero.stats).
const STAT_ICONS = [PersonIcon, ClockIcon, LaptopIcon];

const VARIANTS: Variant[] = [
  {
    id: "beige-1",
    label: "Беж · рука у виска",
    image: "/photos/hero-beige-3.jpg",
    dark: false,
    size: "cover",
    position: "center 25%",
    bg: "var(--background)",
  },
  {
    id: "beige-2",
    label: "Беж · рука у подбородка",
    image: "/photos/hero-beige-2.jpg",
    dark: false,
    // фон дострочен по краям -> отдалено, на всю ширину без полей
    size: "cover",
    position: "center 41%",
    bg: "var(--background)",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(1); // финал: беж, рука у подбородка
  const v = VARIANTS[index];
  const c = useContent();
  // фото шапки можно менять из админки (для основного варианта)
  const heroImage = v.id === "beige-2" ? c.hero.image || v.image : v.image;

  // Сообщаем фиксированной шапке о смене фона (для пересчёта контраста)
  useEffect(() => {
    window.dispatchEvent(new Event("navthemerefresh"));
  }, [index]);

  // Цвета текста в зависимости от фона фото
  const textColor = v.dark ? "text-gold" : "text-foreground";

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden"
      data-nav-theme={v.dark ? "dark" : "light"}
    >
      {/* Фон-фото. На десктопе слегка сдвигаем кадр вправо (Алина правее,
          справа от неё меньше пустоты). Зум 110% даёт запас, чтобы слева не было щели. */}
      <div
        className="absolute inset-0 bg-no-repeat lg:origin-center lg:translate-x-[5%] lg:scale-110"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: v.size,
          backgroundPosition: v.position,
          backgroundColor: v.bg,
        }}
      />
      {/* Контент: цитата сверху, буллеты снизу */}
      <div className="relative z-10 flex min-h-[100svh] flex-col">
        {/* Цитата вверху (над головой, на фоне) */}
        <div className="px-6 pt-28 md:px-12 md:pt-32">
          <figure className="max-w-xl">
            <blockquote
              className={`font-display text-[1.85rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-[3.25rem] ${textColor}`}
            >
              {c.hero.quote}
            </blockquote>
          </figure>
        </div>

        <div className="flex-1" />

        {/* Бейджи 2×2: иконка + число/подпись (вместо крупных цифр) */}
        <div className="px-6 md:px-12">
          <ul className="grid max-w-xs grid-cols-1 gap-y-6 lg:max-w-xl lg:grid-cols-2 lg:gap-x-6 lg:gap-y-8 xl:gap-x-8">
            {/* три цифры из контента + постоянный бейдж «Конфиденциально» */}
            {c.hero.stats.slice(0, 3).map((s, i) => (
              <li key={s.label} className="flex items-center gap-2.5 sm:gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-terracotta text-terracotta sm:h-14 sm:w-14">
                  {STAT_ICONS[i]}
                </span>
                <span className="leading-tight">
                  <span className="block whitespace-nowrap font-sans text-lg font-semibold text-terracotta sm:text-[1.7rem]">
                    {s.value}
                  </span>
                  <span
                    className={`mt-0.5 block text-[0.72rem] tracking-normal sm:text-[0.8rem] ${
                      v.dark ? "text-gold/70" : "text-muted"
                    }`}
                  >
                    {s.label}
                  </span>
                </span>
              </li>
            ))}
            <li className="flex items-center gap-2.5 sm:gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-terracotta text-terracotta sm:h-14 sm:w-14">
                {LockIcon}
              </span>
              <span className="leading-tight">
                <span className="block whitespace-nowrap font-sans text-lg font-semibold text-terracotta sm:text-[1.7rem]">
                  Безопасность
                </span>
                <span
                  className={`mt-0.5 block whitespace-nowrap text-[0.72rem] tracking-normal sm:text-[0.8rem] ${
                    v.dark ? "text-gold/70" : "text-muted"
                  }`}
                >
                  Гарантирую конфиденциальность
                </span>
              </span>
            </li>
          </ul>
        </div>

        <div className="flex-1" />

        {/* Кнопка записи + ссылка «как проходит работа» — ближе к волне */}
        <div className="px-6 pb-28 md:px-12 md:pb-32">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-7">
            <a
              href="#booking"
              className="inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3 font-sans text-sm text-cream shadow-lg transition-opacity hover:opacity-90 sm:px-7 sm:py-3.5 sm:text-base"
            >
              Записаться на первую встречу
            </a>
            <a
              href="#principles"
              className={`group inline-flex items-center gap-2.5 font-sans text-sm transition-colors hover:text-terracotta sm:text-base ${
                v.dark ? "text-gold" : "text-foreground"
              }`}
            >
              Как проходит работа
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Волна по нижнему краю */}
      <Wave className="absolute bottom-0 left-0 z-10 h-16 w-full md:h-24" />

      {/* Переключатель вариантов фото — маленький и неприметный (временный) */}
      <div className="fixed bottom-3 left-3 z-50 flex items-center gap-1.5 rounded-full bg-black/25 px-2 py-1.5 opacity-35 backdrop-blur transition-opacity hover:opacity-100">
        {VARIANTS.map((variant, i) => (
          <button
            key={variant.id}
            onClick={() => setIndex(i)}
            title={variant.label}
            aria-label={variant.label}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
