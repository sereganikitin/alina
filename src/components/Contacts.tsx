/**
 * Контакты + подвал. Тёмный фон, светлый текст.
 * Соцсети — пока НЕактивные иконки (подключим через админку).
 * Документы — заглушки.
 */
type IconProps = { className?: string };

function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.94 4.5 18.6 20.2c-.25 1.1-.9 1.37-1.83.85l-5.05-3.72-2.44 2.35c-.27.27-.5.5-1.02.5l.36-5.16 9.4-8.49c.41-.36-.09-.56-.63-.2L5.16 13.1l-5-1.57c-1.09-.34-1.11-1.09.23-1.61L20.53 2.9c.91-.34 1.7.2 1.41 1.6Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.33 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm5.8 14.06c-.25.69-1.45 1.32-2 1.4-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.69-.62-2.97-1.28-4.91-4.27-5.06-4.47-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37l.57.01c.18.01.43-.07.67.51.25.6.85 2.06.92 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.07 1.31 2.36 1.46.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.12.07.72-.18 1.41Z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Telegram", Icon: TelegramIcon },
  { label: "WhatsApp", Icon: WhatsAppIcon },
  { label: "Instagram", Icon: InstagramIcon },
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

        {/* Соцсети — пока неактивны (подключим через админку) */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {SOCIALS.map(({ label, Icon }) => (
            <span
              key={label}
              title="Скоро"
              aria-label={`${label} — скоро`}
              className="flex h-12 w-12 cursor-default items-center justify-center rounded-full border border-cream/20 text-cream/40"
            >
              <Icon className="h-5 w-5" />
            </span>
          ))}
          <span className="text-sm text-cream/40">ссылки появятся позже</span>
        </div>

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
          © 2026 Алина. Психолог, EMDR- и IFS-терапевт.
        </p>
      </div>
    </footer>
  );
}
