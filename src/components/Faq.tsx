"use client";

import Wave from "./Wave";
import { useContent } from "@/lib/useContent";

/** Раздел «Частые вопросы» — нативный аккордеон. Вопросы — из админки. */
export default function Faq() {
  const c = useContent();
  return (
    <section
      id="faq"
      data-nav-theme="light"
      className="relative bg-background px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40"
    >
      <Wave
        className="absolute left-0 top-0 h-16 w-full rotate-180 md:h-24"
        fill="var(--cream)"
      />

      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-4xl md:text-5xl">Частые вопросы</h2>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {c.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl text-foreground">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-terracotta transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-lg leading-relaxed text-foreground/80">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
