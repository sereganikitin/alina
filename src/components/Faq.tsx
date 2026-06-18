/**
 * Раздел «Частые вопросы» — нативный аккордеон (<details>), без JS.
 * Вопросы/ответы — черновик по беседам; финал за Алиной.
 */
import Wave from "./Wave";

const QA = [
  {
    q: "Как проходит первая сессия?",
    a: "Знакомимся, я расспрашиваю о запросе и о том, что привело вас в терапию, рассказываю, как устроена наша работа, и мы вместе намечаем направление. Это встреча, на которой можно ничего не решать заранее.",
  },
  {
    q: "В каком формате мы работаем?",
    a: "Только онлайн — я работаю с людьми из разных стран. Терапия долгосрочная, со встречами раз в неделю; другая регулярность — по договорённости.",
  },
  {
    q: "Сколько стоит сессия?",
    a: "8 000 ₽ за сессию. Оплата в рублях; для клиентов из других стран — по курсу.",
  },
  {
    q: "С кем вы работаете?",
    a: "Со взрослыми. Я работаю с русскоязычными клиентами в любом часовом поясе, если есть свободные места в расписании.",
  },
  {
    q: "Можно ли гарантировать результат?",
    a: "Психолог не может обещать конкретный результат — это было бы нечестно. Я могу гарантировать профессиональную, бережную работу и встречу, на которой мы движемся к вашему запросу.",
  },
];

export default function Faq() {
  return (
    <section
      id="faq"
      data-nav-theme="light"
      className="relative bg-background px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40"
    >
      {/* Переход от секции «Консультация» (cream) */}
      <Wave
        className="absolute left-0 top-0 h-16 w-full rotate-180 md:h-24"
        fill="var(--cream)"
      />

      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-4xl md:text-5xl">Частые вопросы</h2>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {QA.map((item) => (
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
