"use client";

import { useContent } from "@/lib/useContent";

export default function Principles() {
  const c = useContent();
  return (
    <section id="principles" className="principles">
      <div className="wrap">
        <div className="kicker">Принципы работы</div>

        <div className="prin-photo">
          <div className="ph-arch">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.principles.image} alt="Алина" />
          </div>
          <div className="ph-side">
            <h3>{c.principles.side.title}</h3>
            <p>{c.principles.side.text}</p>
          </div>
        </div>

        <h2 className="section-h">С чем я работаю</h2>

        <div className="chips">
          {c.principles.requests.map((r) => (
            <span key={r} className="chip">{r}</span>
          ))}
        </div>

        <h2 className="section-h">С кем я работаю</h2>
        <p className="with">
          {c.principles.withWhom}
        </p>

        <h2 className="section-h">Основные принципы работы</h2>

        <p className="with">
          <b>Безопасность и бережность</b>
        </p>
        <p className="with">
         Клиент определяет границы пространства, то есть имеет право на «нет», «стоп», на любые чувства и проявления себя, возникающие в процессе. 
         Кроме насилия над собой и терапевтом.
        </p>

      </div>
    </section>
  );
}