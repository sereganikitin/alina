/**
 * Раздел «Образование».
 * Плейсхолдеры под сканы дипломов — реальные добавим позже через админку.
 * Подписи — черновик по беседам/ТЗ, уточнит Алина.
 */
const DIPLOMAS = [
  "Высшее психологическое образование",
  "Преподаватель психологии",
  "EMDR-терапевт",
  "IFS-терапевт",
  "Танцевально-двигательный терапевт",
  "Действительный член Национальной ассоциации EMDR",
];

const EXTRA = [
  "Регулярное ежегодное повышение квалификации",
  "Публикация в «Psychologies»",
  "Опыт преподавания психологии — 4 года",
];

export default function Education() {
  return (
    <section
      id="education"
      data-nav-theme="light"
      className="bg-background px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-4xl md:text-5xl">Образование</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/80">
          {/* Черновик — уточнит Алина */}
          Непрерывный профессиональный путь: в профессии с 17 лет, более 10 лет
          практики. Дипломы государственного образца — ниже.
        </p>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DIPLOMAS.map((d) => (
            <li
              key={d}
              className="overflow-hidden rounded-2xl border border-line bg-cream"
            >
              {/* Плейсхолдер скана диплома */}
              <div className="flex aspect-[4/3] items-center justify-center bg-line/60">
                <span className="text-sm text-muted">скан появится</span>
              </div>
              <p className="px-5 py-4 text-foreground/85">{d}</p>
            </li>
          ))}
        </ul>

        <ul className="mt-10 flex flex-col gap-2.5">
          {EXTRA.map((e) => (
            <li key={e} className="flex items-start gap-3 text-foreground/85">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{e}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
