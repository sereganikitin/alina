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
            {c.principles.side.items.map((item) => (
              <div key={item.title} className="ph-side-item">
                <p className="ph-side-item-title"><b>{item.title}</b></p>
                <p className="ph-side-item-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <h3 className="section-h">С чем я работаю</h3>

        <div className="chips">
          {c.principles.requests.map((r) => (
            <span key={r} className="chip">{r}</span>
          ))}
        </div>

        <h3 className="section-h">С кем я работаю</h3>
        <p className="with">
          {c.principles.withWhom}
        </p>
      </div>
    </section>
  );
}