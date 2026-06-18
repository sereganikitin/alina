/**
 * Раздел «О подходе» — философия работы.
 * Тексты — черновик по беседам с Алиной; финальные формулировки за ней.
 */
import Wave from "./Wave";

export default function Approach() {
  return (
    <section
      id="approach"
      data-nav-theme="light"
      className="relative bg-background px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40"
    >
      {/* Переход от секции «Принципы работы» (cream) */}
      <Wave
        className="absolute left-0 top-0 h-16 w-full rotate-180 md:h-24"
        fill="var(--cream)"
      />

      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-4xl md:text-5xl">О подходе</h2>

        {/* Черновик — уточнит Алина */}
        <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/80">
          <p>
            В работе я опираюсь на запрос: мы вместе держим в фокусе то, ради
            чего вы пришли, и сверяемся с этим на каждой сессии. Если мы от
            запроса отходим — я говорю об этом и объясняю, зачем.
          </p>
          <p>
            Мне важно, чтобы терапия была не только бережной, но и
            эффективной — поэтому я слежу за исследованиями и опираюсь на
            доказательные методы. При этом контакт и теплота для меня — высокая
            ценность: рядом можно быть разным.
          </p>
          <p>
            Терапия — это не про то, чтобы переделать себя. Это про то, чтобы
            узнать и понять себя, научиться быть с собой в контакте и жить так,
            как комфортно именно вам.
          </p>
        </div>

        <a
          href="#booking"
          className="mt-12 inline-flex items-center gap-2 font-display text-lg text-foreground underline decoration-gold decoration-1 underline-offset-8 transition-colors hover:text-terracotta"
        >
          Записаться на консультацию
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
