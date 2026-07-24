"use client";

import { useContent } from "@/lib/useContent";
import { RichText } from "@/lib/richText";

export default function Principles() {
  const c = useContent();
  return (
    <section id="principles" className="principles">
      <div className="wrap">
        <div className="kicker">Принципы работы</div>

        <div className="prin-photo">
          <div className="ph-photo">
            <div className="ph-arch">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.principles.image} alt="Алина" />
            </div>
            <div className="ph-circles">
              {c.principles.circles.slice(0, 3).map((label, i) => (
                <div key={i} className="ph-circle">
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="ph-side">
            <h3 className="prin-h">С чем я работаю</h3>
            <div className="chips">
              {c.principles.requests.map((r) => (
                <span key={r} className="chip">{r}</span>
              ))}
            </div>

            <h3 className="prin-h" style={{ marginTop: "36px" }}>С кем я работаю</h3>
            <RichText html={c.principles.withWhom} className="with" />
          </div>
        </div>

        <div className="prin-full">
          <h3 className="prin-h">{c.principles.side.title}</h3>
          <div className="prin-items-grid">
            {c.principles.side.items.map((item, i) => (
              <div key={item.title} className="ph-side-item">
                <p className="ph-side-item-title">
                  <span className="ph-side-item-num">{String(i + 1).padStart(2, "0")}/</span>
                  {item.title}
                </p>
                <RichText html={item.text} className="ph-side-item-text" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}