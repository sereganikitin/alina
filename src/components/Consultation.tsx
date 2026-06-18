/**
 * Раздел «Консультация» — формат, стоимость, запись.
 * Тексты — черновик по беседам; цифры/условия подтвердит Алина.
 */
import Wave from "./Wave";

const FACTS = [
  { label: "Формат", value: "Онлайн, из любой точки мира" },
  { label: "Язык", value: "Русскоязычная терапия" },
  { label: "Регулярность", value: "Раз в неделю, в долгосрочной работе" },
  { label: "Стоимость", value: "8 000 ₽ за сессию" },
];

export default function Consultation() {
  return (
    <section
      id="booking"
      data-nav-theme="light"
      className="relative bg-cream px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40"
    >
      {/* Переход от секции «О подходе» (beige) */}
      <Wave
        className="absolute left-0 top-0 h-16 w-full rotate-180 md:h-24"
        fill="var(--background)"
      />

      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-4xl md:text-5xl">Консультация</h2>

        <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {FACTS.map((f) => (
            <div key={f.label} className="bg-cream p-6">
              <dt className="font-display text-sm uppercase tracking-[0.2em] text-muted">
                {f.label}
              </dt>
              <dd className="mt-2 text-lg text-foreground/85">{f.value}</dd>
            </div>
          ))}
        </dl>

        {/* Черновик — уточнит Алина */}
        <p className="mt-8 text-base leading-relaxed text-muted">
          Записаться можно в Telegram или WhatsApp — отвечаю лично. Позже здесь
          появится форма записи прямо на сайте.
        </p>

        <a
          href="#contacts"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-terracotta px-8 py-3.5 font-display text-lg text-cream transition-opacity hover:opacity-90"
        >
          Записаться
        </a>
      </div>
    </section>
  );
}
