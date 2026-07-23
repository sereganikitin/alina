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

        <p className="with">
          <b>С кем я работаю.</b> {c.principles.withWhom}
        </p>
      </div>
    </section>
  );
}