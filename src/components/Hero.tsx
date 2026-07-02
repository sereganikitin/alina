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
const iconCls = "h-6 w-6 sm:h-10 sm:w-10";
// Группа людей (клиенты): крупный по центру + двое поменьше по бокам
const PersonIcon = (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8.3" r="2.9" />
    <path d="M6.6 18.6c0-3 2.4-5 5.4-5s5.4 2 5.4 5" />
    <circle cx="4.6" cy="9.8" r="1.7" />
    <path d="M2 17.6c0-1.9 1.1-3.2 2.9-3.3" />
    <circle cx="19.4" cy="9.8" r="1.7" />
    <path d="M22 17.6c0-1.9-1.1-3.2-2.9-3.3" />
  </svg>
);
// Часы — с делениями на циферблате (6 делений)
const clockCls = "h-7 w-7 sm:h-11 sm:w-11";
const ClockIcon = (
  <svg viewBox="0 0 24 24" className={clockCls} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    {/* стрелки на 16:00: минутная вверх (на 12), часовая на 4 (вниз-вправо) */}
    <path d="M12 12L12 5.5 M12 12L15.4 14" />
    {/* центр */}
    <circle cx="12" cy="12" r="1.15" fill="currentColor" stroke="none" />
  </svg>
);
// Рукопожатие (опыт/контакт)
const HandshakeIcon = (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 4 1 10h-2" />
    <path d="M3 4 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </svg>
);
const LockIcon = (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    <circle cx="12" cy="15" r="1.1" />
  </svg>
);
// Иконки сопоставляются цифрам по позиции (см. defaultContent.ts → hero.stats):
// 0 — опыт (рукопожатие), 1 — часы, 2 — клиенты (человечки).
const STAT_ICONS = [HandshakeIcon, ClockIcon, PersonIcon];

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
    // Текущее фото — широкое (2500×1461), Алина справа, слева пустой беж
    // в цвет фона. cover без доп. зума ≈ масштаб 1:1 с экраном.
    // X=72%: на узком экране (кроп по ширине) в кадре остаётся лицо справа.
    // Y=25%: на десктопе (кроп по высоте) сверху остаётся запас — голова
    //        не залезает под фиксированное меню.
    size: "cover",
    position: "72% 25%",
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
      {/* Фон-фото на всю секцию, масштаб 1:1 (cover без доп. зума).
          Кадрирование задаётся в variant.position (см. VARIANTS).
          На десктопе слегка увеличиваем с привязкой к ЛЕВОМУ-ВЕРХНЕМУ углу:
          фото начинается от левого края (без щели/шва) и от верха (голова не
          лезет под меню), а лишнее срезается справа и снизу (overflow-hidden).
          За счёт роста вправо Алина смещается ближе к правому краю. */}
      <div
        className="hero-photo absolute inset-0 bg-no-repeat lg:origin-top-left lg:scale-110"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: v.size,
          backgroundPosition: v.position,
          backgroundColor: v.bg,
        }}
      />
      {/* Затемнение фото — активно только в тёмной теме */}
      <div className="hero-scrim" />
      {/* Контент: цитата сверху, буллеты снизу */}
      <div className="relative z-10 flex min-h-[100svh] flex-col">
        {/* Цитата вверху (над головой, на фоне) — поднята ближе к имени */}
        <div className="px-6 pt-20 md:px-12 md:pt-24">
          <figure className="max-w-2xl lg:max-w-3xl">
            <blockquote
              className={`font-display text-[1.35rem] leading-[1.15] sm:text-[1.6rem] md:text-3xl lg:text-[2.15rem] ${textColor}`}
            >
              {c.hero.quote}
            </blockquote>
          </figure>
        </div>

        {/* Бейджи 2×2 — по центру ровно между низом цитаты и верхом кнопки */}
        <div className="flex flex-1 items-center px-6 md:px-12">
          <ul className="grid max-w-[15rem] grid-cols-1 gap-y-3.5 sm:max-w-xs sm:gap-y-6 lg:max-w-xl lg:grid-cols-2 lg:gap-x-6 lg:gap-y-8 xl:gap-x-8">
            {/* три цифры из контента + постоянный бейдж «Конфиденциально» */}
            {c.hero.stats.slice(0, 3).map((s, i) => (
              <li key={s.label} className="flex items-center gap-2 sm:gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-terracotta text-terracotta sm:h-16 sm:w-16">
                  {STAT_ICONS[i]}
                </span>
                <span className="leading-tight">
                  <span className="block whitespace-nowrap font-display text-base leading-none text-terracotta sm:text-[1.7rem]">
                    {s.value}
                  </span>
                  <span
                    className={`mt-1 block text-xs lowercase leading-tight tracking-normal transition-colors sm:text-base ${
                      v.dark ? "text-white/90 hover:text-white" : "text-foreground/75 hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </span>
              </li>
            ))}
            <li className="flex items-center gap-2 sm:gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-terracotta text-terracotta sm:h-16 sm:w-16">
                {LockIcon}
              </span>
              <span className="leading-tight">
                <span className="block whitespace-nowrap font-display text-base leading-none text-terracotta sm:text-[1.7rem]">
                  {c.hero.security.title}
                </span>
                <span
                  className={`mt-1 block text-xs lowercase leading-tight tracking-normal transition-colors sm:whitespace-nowrap sm:text-base ${
                    v.dark ? "text-white/90 hover:text-white" : "text-foreground/75 hover:text-foreground"
                  }`}
                >
                  {c.hero.security.note}
                </span>
              </span>
            </li>
          </ul>
        </div>

        {/* Кнопка записи + ссылка «как проходит работа» — ближе к волне */}
        <div className="px-6 pb-28 md:px-12 md:pb-32">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-7">
            <a
              href="#booking"
              className="inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3 font-sans text-sm lowercase text-cream shadow-lg transition-opacity hover:opacity-90 sm:px-7 sm:py-3.5 sm:text-base"
            >
              {c.hero.cta.primary}
            </a>
            <a
              href="#principles"
              className={`group inline-flex items-center gap-2.5 font-sans text-sm lowercase transition-colors sm:text-base ${
                v.dark ? "text-white/90 hover:text-white" : "text-foreground/75 hover:text-foreground"
              }`}
            >
              {c.hero.cta.secondary}
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
