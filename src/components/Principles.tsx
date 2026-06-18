/**
 * Раздел «Принципы работы»: с чем и с кем работаю + ссылка на метод.
 * Светлый фон с волнистым разделителем сверху (переход от секции «Обо мне»).
 * Тексты — черновик из ТЗ; финальные формулировки пишет Алина.
 */
import Wave from "./Wave";

const REQUESTS = [
  "Травма любого характера",
  "Травма привязанности",
  "Потеря и горе",
  "Абьюз (моральный / физический / сексуализированный)",
  "ПТСР",
  "РПП",
  "Тема границ",
  "Чувство стыда и вины",
  "Созависимые отношения",
  "Сепарация от родителей",
  "Поиск ресурса",
  "Психосоматика",
  "Принятие тела",
];

export default function Principles() {
  return (
    <section id="principles" className="relative bg-cream px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40">
      {/* Волнистый разделитель: беж секции «Обо мне» спускается в кремовый */}
      <Wave
        className="absolute left-0 top-0 h-16 w-full rotate-180 md:h-24"
        fill="var(--background)"
      />

      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-4xl md:text-5xl">Принципы работы</h2>

        <h3 className="mt-12 font-display text-2xl text-terracotta">
          С чем я работаю
        </h3>
        <ul className="mt-6 flex flex-wrap gap-3">
          {REQUESTS.map((r) => (
            <li
              key={r}
              className="rounded-full border border-line bg-background/60 px-4 py-2 text-sm text-foreground/85"
            >
              {r}
            </li>
          ))}
        </ul>

        <h3 className="mt-14 font-display text-2xl text-terracotta">
          С кем я работаю
        </h3>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/80">
          {/* Черновик — уточнит Алина */}
          Со взрослыми людьми в долгосрочной онлайн-терапии. Подробности об
          условиях и форматах — в разделе «Консультация».
        </p>

        <a
          href="#approach"
          className="mt-12 inline-flex items-center gap-2 font-display text-lg text-foreground underline decoration-gold decoration-1 underline-offset-8 transition-colors hover:text-terracotta"
        >
          Подробнее о методе
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
