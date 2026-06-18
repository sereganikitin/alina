/**
 * Контакты + подвал. Тёмный фон, светлый текст.
 * Ссылки и документы — заглушки, заполним по мере готовности.
 */
const LINKS = [
  { label: "Telegram", href: "#" },
  { label: "WhatsApp", href: "#" },
  { label: "Instagram", href: "#" },
];

const DOCS = [
  { label: "Политика конфиденциальности", href: "#" },
  { label: "Согласие на обработку персональных данных", href: "#" },
  { label: "Договор оферты", href: "#" },
];

export default function Contacts() {
  return (
    <footer
      id="contacts"
      data-nav-theme="dark"
      className="bg-foreground px-6 py-20 text-cream md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-4xl md:text-5xl">Контакты</h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/70">
          Написать можно в любой удобный мессенджер — отвечаю лично.
        </p>

        <ul className="mt-8 flex flex-wrap gap-4">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="inline-flex rounded-full border border-cream/30 px-6 py-2.5 text-cream/90 transition-colors hover:border-cream hover:text-cream"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-2 text-sm text-cream/50">
          {DOCS.map((d) => (
            <li key={d.label}>
              <a href={d.href} className="underline-offset-4 hover:underline">
                {d.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-cream/40">
          © {"2026"} Алина. Психолог, EMDR- и IFS-терапевт.
        </p>
      </div>
    </footer>
  );
}
