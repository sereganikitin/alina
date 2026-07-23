"use client";

import { useContent } from "@/lib/useContent";
import BookingForm from "./BookingForm";

export default function Consultation() {
  const c = useContent();
  return (
    <section id="consult" className="consult">
      <div className="wrap">
        <div className="kicker">Консультация</div>
        <h2 className="section-h">Формат и условия</h2>

        <div className="facts">
          {c.consultation.facts.map((f) => (
            <div key={f.label} className="fact">
              <div className="k">{f.label}</div>
              <div className="v">{f.value}</div>
            </div>
          ))}
        </div>

        <p className="note">{c.consultation.note}</p>

        <div style={{ marginTop: "28px" }}>
          <a href="#contacts" className="btn btn-primary">
            Записаться на первую сессию
          </a>
        </div>

        {/* Форма записи */}
        <div style={{ marginTop: "60px", maxWidth: "32rem" }}>
          <h3 className="serif" style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Записаться</h3>
          <BookingForm />
        </div>

        {/* FAQ аккордеон — summary::after в CSS рисует "+" */}
        <div className="faq">
          {c.faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <div className="ans">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}