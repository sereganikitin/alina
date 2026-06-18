"use client";

import { useEffect, useState } from "react";
import Wave from "./Wave";

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

const VARIANTS: Variant[] = [
  {
    id: "beige-1",
    label: "Беж · рука у виска",
    image: "/photos/hero-beige-1.jpg",
    dark: false,
    size: "cover",
    position: "center 42%",
    bg: "var(--background)",
  },
  {
    id: "beige-2",
    label: "Беж · рука у подбородка",
    image: "/photos/hero-beige-2.jpg",
    dark: false,
    // фон дострочен по краям -> отдалено, на всю ширину без полей
    size: "cover",
    position: "center 52%",
    bg: "var(--background)",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(1); // финал: беж, рука у подбородка
  const v = VARIANTS[index];

  // Сообщаем фиксированной шапке о смене фона (для пересчёта контраста)
  useEffect(() => {
    window.dispatchEvent(new Event("navthemerefresh"));
  }, [index]);

  // Цвета текста в зависимости от фона фото
  const textColor = v.dark ? "text-gold" : "text-foreground";
  const ruleColor = v.dark ? "bg-gold/40" : "bg-foreground/30";

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden"
      data-nav-theme={v.dark ? "dark" : "light"}
    >
      {/* Фон-фото */}
      <div
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${v.image})`,
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
            <div className={`mb-5 h-px w-16 ${ruleColor}`} />
            <blockquote
              className={`font-display text-[1.85rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-[3.25rem] ${textColor}`}
            >
              «Тебе нужно больше&nbsp;помощи, чем ты&nbsp;думаешь»
            </blockquote>
          </figure>
        </div>

        <div className="flex-1" />

        {/* Буллеты по нижнему краю */}
        <div className="px-6 pb-12 md:px-12 md:pb-28">
          <ul
            className={`flex flex-col gap-2 text-sm tracking-wide sm:flex-row sm:gap-10 ${textColor}`}
          >
            <li>Более 100 часов супервизий</li>
            <li>Более 200 часов личной терапии</li>
          </ul>
        </div>
      </div>

      {/* Волна по нижнему краю */}
      <Wave className="absolute bottom-0 left-0 z-10 h-16 w-full md:h-24" />

      {/* Переключатель вариантов (временный, для согласования) */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 rounded-xl bg-black/70 p-3 text-xs text-white backdrop-blur">
        <span className="opacity-70">Вариант шапки:</span>
        {VARIANTS.map((variant, i) => (
          <button
            key={variant.id}
            onClick={() => setIndex(i)}
            className={`rounded-md px-3 py-1.5 text-left transition-colors ${
              i === index ? "bg-white text-black" : "hover:bg-white/20"
            }`}
          >
            {i + 1}. {variant.label}
          </button>
        ))}
      </div>
    </section>
  );
}
