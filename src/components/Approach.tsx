"use client";

import Wave from "./Wave";
import { useContent } from "@/lib/useContent";

/** Раздел «О подходе» — философия работы. Тексты — из админки. */
export default function Approach() {
  const c = useContent();
  return (
    <section
      id="approach"
      data-nav-theme="light"
      className="relative bg-background px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40"
    >
      <Wave
        className="absolute left-0 top-0 h-16 w-full rotate-180 md:h-24"
        fill="var(--cream)"
      />

      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-4xl md:text-5xl">О подходе</h2>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/80">
          {c.approach.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <a
          href="#booking"
          className="mt-12 inline-flex items-center gap-2 font-sans text-lg text-foreground underline decoration-gold decoration-1 underline-offset-8 transition-colors hover:text-terracotta"
        >
          Записаться на консультацию
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
