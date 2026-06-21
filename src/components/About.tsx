"use client";

import { useContent } from "@/lib/useContent";

/** Раздел «Обо мне»: фото в арке + крупный заголовок и регалии.
 *  Блок «Методы» — компактный терракотовый прямоугольник, наползает
 *  на нижний-правый угол фото (~20% по ширине и высоте). */
export default function About() {
  const c = useContent();
  return (
    <section
      id="about"
      data-nav-theme="light"
      className="bg-background px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        {/* Фото в арке + наползающий блок «Методы» */}
        <div className="relative mx-auto w-full max-w-sm md:mx-0">
          <div className="overflow-hidden rounded-t-[999px] rounded-b-3xl shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.about.image}
              alt="Алина"
              className="aspect-[3/4] w-full object-cover object-[center_15%]"
            />
          </div>

          {/* Методы — компактный, наползает на низ-право фото */}
          <div className="relative z-10 mt-8 md:absolute md:left-[76%] md:top-[74%] md:mt-0 md:w-60">
            <div className="rounded-[1.75rem] bg-terracotta px-6 py-5 shadow-lg">
              <h3 className="font-display text-xl text-background">Методы</h3>
              <ul className="mt-3 flex flex-col gap-1.5">
                {c.about.methods.map((m) => (
                  <li
                    key={m}
                    className="flex items-start gap-2.5 leading-snug text-background/90"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-background/70" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Заголовок + регалии */}
        <div className="md:pt-8">
          <h2 className="font-display text-5xl font-semibold leading-none md:text-6xl">
            Обо мне
          </h2>
          <p className="mt-6 font-display text-2xl leading-snug text-foreground md:text-[1.75rem]">
            {c.about.title}
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {c.about.lead}
          </p>
        </div>
      </div>
    </section>
  );
}
