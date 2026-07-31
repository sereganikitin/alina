"use client";

import type { ReactNode } from "react";
import { useContent } from "@/lib/useContent";
import { RichText } from "@/lib/richText";
import { EmdrLogo, IfsLogo } from "./AssocIcons";
import BookingForm from "./BookingForm";

// Оборачивает значок в ссылку, только если URL задан — иначе значок
// остаётся некликабельным (просто <span>).
function AssocLink({ url, children }: { url: string; children: ReactNode }) {
  if (!url) return <span className="assoc-icon">{children}</span>;
  return (
    <a href={url} target="_blank" rel="noreferrer" className="assoc-icon">
      {children}
    </a>
  );
}

const TelegramIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M21.05 3.16 2.63 10.36c-1.24.5-1.23 1.19-.23 1.5l4.72 1.47 1.82 5.6c.22.62.38.86.78.86.4 0 .58-.18.8-.4l1.94-1.9 4.03 2.98c.74.4 1.28.2 1.47-.68l2.66-12.55c.28-1.1-.42-1.6-1.57-1.08Zm-11.5 8.9 7.9-4.9c.4-.24.76-.1.46.16l-6.7 6.1-.26 2.9-1.4-4.26Z" />
  </svg>
);

const WhatsappIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.85.84-3-.2-.32A8.2 8.2 0 1 1 12 20.2Zm4.5-6.15c-.25-.13-1.45-.72-1.67-.8-.22-.08-.38-.13-.55.13-.16.25-.63.8-.77.96-.14.16-.28.18-.53.06-.25-.13-1.05-.4-2-1.26-.74-.66-1.23-1.48-1.38-1.74-.14-.25-.02-.4.1-.52.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.44-.06-.13-.55-1.36-.76-1.86-.2-.5-.4-.42-.55-.43h-.47c-.16 0-.44.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.9 2.4 1.02 2.57.13.16 1.77 2.72 4.28 3.8.6.26 1.06.42 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.45-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);

const InstagramIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export default function Contacts() {
  const c = useContent();
  return (
    <>
      <section id="contacts" className="contacts">
        <div className="wrap">
          <div className="kicker" style={{ marginBottom: "24px" }}>Контакты</div>
          <div className="contacts-grid">
            <div className="contacts-form">
              <h3 className="serif" style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Записаться на сессию</h3>
              <BookingForm />
            </div>

            <div className="contacts-card">
              <h2>Давайте познакомимся</h2>
              <RichText
                html={c.contacts.note}
                className="muted"
                style={{ marginTop: "16px", fontSize: "1.1rem" }}
              />
              <div className="msgs">
                <a href={c.contacts.telegramUrl || "#"} className="btn btn-primary">
                  {TelegramIcon}
                  Telegram
                </a>
                <a href={c.contacts.whatsappUrl || "#"} className="btn btn-ghost">
                  {WhatsappIcon}
                  WhatsApp
                </a>
              </div>

              <p className="muted" style={{ marginTop: "24px", fontSize: "1.1rem" }}>Мои блоги:</p>
              <div className="msgs" style={{ marginTop: "16px" }}>
                <a href={c.contacts.telegramChannelUrl || "#"} className="btn btn-ghost">
                  {TelegramIcon}
                  Telegram-канал
                </a>
                <a href={c.contacts.instagramUrl || "#"} className="btn btn-ghost">
                  {InstagramIcon}
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="assoc">
          <AssocLink url={c.contacts.emdrUrl}>
            <EmdrLogo />
          </AssocLink>
          <AssocLink url={c.contacts.ifsUrl}>
            <IfsLogo />
          </AssocLink>
        </div>
        © 2026 Алина Дубовская · психолог, EMDR- и IFS-терапевт
        <div className="footer-links">
          <a href="/privacy">Политика конфиденциальности</a>
          <a href="/personal-data">Согласие на обработку персональных данных</a>
          <a href="/offer">Договор оферты</a>
        </div>
      </footer>
    </>
  );
}
