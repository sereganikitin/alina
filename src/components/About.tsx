/**
 * Раздел «Обо мне».
 * Фото в арке + подпись над аркой, регалии и методы.
 * Тексты — черновик из ТЗ; финальные формулировки пишет Алина.
 */
const METHODS = [
  "EMDR-терапия",
  "IFS-подход (работа с частями)",
  "Соматические практики",
  "Проективные методики",
  "Интегральные методики из разных подходов",
];

export default function About() {
  return (
    <section
      id="about"
      data-nav-theme="light"
      className="bg-background px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Фото в арке с подписью над ней */}
        <div className="flex flex-col items-center">
          <p className="mb-5 font-display text-sm uppercase tracking-[0.3em] text-muted">
            Обо мне
          </p>
          <div className="relative w-full max-w-sm overflow-hidden rounded-t-[999px] rounded-b-3xl shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photos/about.jpg"
              alt="Алина"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>

        {/* Регалии и методы */}
        <div>
          <h2 className="font-display text-3xl leading-snug md:text-4xl">
            Психолог, EMDR-терапевт, IFS-терапевт, танцевально-двигательный
            терапевт
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground/80">
            Действительный член Национальной ассоциации EMDR.
          </p>

          <h3 className="mt-10 font-display text-xl text-terracotta">Методы</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {METHODS.map((m) => (
              <li key={m} className="flex items-start gap-3 text-foreground/85">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
