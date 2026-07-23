"use client";

import { useContent } from "@/lib/useContent";

export default function Contacts() {
  const c = useContent();
  return (
    <>
      <section id="contacts" className="contacts section">
        <div className="wrap">
          <div className="kicker" style={{ justifyContent: "center" }}>Контакты</div>
          <h2 style={{ marginTop: "16px" }}>Давайте познакомимся</h2>
          <p className="muted" style={{ marginTop: "16px", fontSize: "1.1rem" }}>
            {c.contacts.note}
          </p>
          <div className="msgs">
            <a href="#" className="btn btn-primary">Telegram</a>
            <a href="#" className="btn btn-ghost">WhatsApp</a>
          </div>
        </div>
      </section>

      <footer>
        © 2026 Алина Дубовская · психолог, EMDR- и IFS-терапевт
      </footer>
    </>
  );
}