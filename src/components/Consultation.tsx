"use client";

import { useContent } from "@/lib/useContent";
import { RichText } from "@/lib/richText";
import BookingForm from "./BookingForm";

export default function Consultation() {
  const c = useContent();
  return (
    <section id="consult" className="consult">
      <div className="wrap">
        <div className="kicker">Консультация</div>
        <h2 className="section-h">Формат и условия</h2>

        <div className="facts">
          {c.consultation.facts.map((f, i) => {
            const count = c.consultation.facts.length;
            const hasOddTail = count % 2 === 1;
            const totalRows = Math.floor(count / 2) + (hasOddTail ? 1 : 0);
            const isTail = hasOddTail && i === count - 1;
            const row = isTail ? totalRows - 1 : Math.floor(i / 2);
            const isLeftCol = !isTail && i % 2 === 0;
            const isLastRow = row === totalRows - 1;
            const classes = ["fact"];
            if (isTail) classes.push("fact-full");
            if (isLeftCol) classes.push("fact-border-r");
            if (!isLastRow) classes.push("fact-border-b");
            return (
              <div key={f.label} className={classes.join(" ")}>
                <div className="k">{f.label}</div>
                <div className="v">{f.value}</div>
              </div>
            );
          })}
        </div>

        <RichText html={c.consultation.note} className="note" />

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

        {/* FAQ — слева аккордеон капсул Q/A (ответ скрыт, раскрывается по клику), справа фото */}
        <div className="faq-row">
          <div className="faq-block">
            <h3 className="faq-title">FAQ</h3>
            <div className="faq-list">
              {c.faq.map((item, i) => (
                <details key={i} className="faq-item">
                  <summary className="faq-pill faq-q">
                    <span className="faq-letter">Q</span>
                    <span className="faq-text">{item.q}</span>
                    <span className="faq-plus" aria-hidden="true">+</span>
                  </summary>
                  <div className="faq-pill faq-pill-a">
                    <span className="faq-letter">A</span>
                    <RichText html={item.a} className="faq-text ans" />
                  </div>
                </details>
              ))}
            </div>
          </div>
          {c.faqImage && (
            <div className="faq-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.faqImage} alt="" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}