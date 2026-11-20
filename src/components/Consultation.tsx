"use client";

import { useRef } from "react";
import { useContent } from "@/lib/useContent";
import { RichText } from "@/lib/richText";

export default function Consultation() {
  const c = useContent();
  const rules = useRef<HTMLDetailsElement>(null);
  const { consultation } = c;
  return (
    <>
      <section id="consult" className="consult">
        <div className="wrap">
          <div className="kicker">Консультация</div>
          <h2 className="section-h">Формат и условия</h2>

          <div className={consultation.image ? "consult-layout with-photo" : "consult-layout"}>
            <div>
              {!!consultation.formats.length && (
                <ul className="consult-formats">
                  {consultation.formats.map((format) => <li key={format}>{format}</li>)}
                </ul>
              )}
              <dl className="facts">
                {consultation.facts.map(({ label, value }) => (
                  <div className="fact" key={label}>
                    <dt className="k">{label}</dt>
                    <dd className="v">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {consultation.image && (
              <div className="consult-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={consultation.image} alt="Алина Дубовская" loading="lazy" />
              </div>
            )}
          </div>
          {consultation.cancellationRules && (
            <details id="session-rules" className="session-rules" ref={rules}>
              <summary className="btn btn-primary">Правила отмен и переносов сессии</summary>
              <RichText html={consultation.cancellationRules} />
            </details>
          )}
        </div>
      </section>

      {/* FAQ — слева аккордеон капсул Q/A (ответ скрыт, раскрывается по клику), справа фото */}
      <section className="faq-section">
        <div className="wrap">
          <div className="kicker">Вопросы и ответы</div>
          <div className="faq-row">
            <div className="faq-block">
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
                      <div className="faq-text ans">
                        <RichText html={item.a} />
                        {consultation.cancellationRules && item.q === "Можно ли пропускать сессии?" && (
                          <a href="#session-rules" className="section-text-link" onClick={() => {
                            if (rules.current) rules.current.open = true;
                          }}>Правила отмен и переносов</a>
                        )}
                      </div>
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
    </>
  );
}