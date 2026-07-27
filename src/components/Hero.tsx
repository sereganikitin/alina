"use client";

import { useEffect } from "react";
import Wave from "./Wave";
import { useContent } from "@/lib/useContent";

// Минималистичные контурные иконки (v03 style)
const iconCls = "w-[47%] h-[47%]";

const HandshakeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m20.6 4h1.4l0.6 10h-2" />
    <path d="M3 4 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </svg>
);

const ClockIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 12L12 5.5 M12 12L15.4 14" />
    <circle cx="12" cy="12" r="1.15" fill="currentColor" stroke="none" />
  </svg>
);

const PersonIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
    <circle cx="12" cy="8.3" r="2.9" />
    <path d="M6.6 18.6c0-3 2.4-5 5.4-5s5.4 2 5.4 5" />
    <circle cx="4.6" cy="9.8" r="1.7" />
    <path d="M2 17.6c0-1.9 1.1-3.2 2.9-3.3" />
    <circle cx="19.4" cy="9.8" r="1.7" />
    <path d="M22 17.6c0-1.9-1.1-3.2-2.9-3.3" />
  </svg>
);

const LockIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={iconCls}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2.2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    <circle cx="12" cy="15" r="1.1" />
  </svg>
);

const STAT_ICONS = [HandshakeIcon, ClockIcon, PersonIcon];

export default function Hero() {
  const c = useContent();
  const heroImage = c.hero.image || "/photos/hero-beige-2.jpg";

  useEffect(() => {
    window.dispatchEvent(new Event("navthemerefresh"));
  }, []);

  return (
    <section className="hero">
      <div
        className="hero-photo"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: "72% 22%",
          backgroundColor: "var(--bg)",
        }}
      />
      <div className="hero-scrim" />
      <div className="hero-inner">
        <figure className="hero-quote">
          {c.hero.quote}
        </figure>

        <ul className="badges">
          {c.hero.stats.slice(0, 3).map((s, i) => (
            <li key={s.label} className="badge">
              <span className="ic">{STAT_ICONS[i]}</span>
              <span>
                <span className="n">{s.value}</span>
                <span className="l">{s.label}</span>
              </span>
            </li>
          ))}
          <li className="badge">
            <span className="ic">{LockIcon}</span>
            <span>
              <span className="n">{c.hero.security.title}</span>
              <span className="l">{c.hero.security.note}</span>
            </span>
          </li>
        </ul>

        <div className="hero-cta">
          <a href="#contacts" className="btn btn-primary">
            {c.hero.cta.primary}
          </a>
          <a href="#approach" className="lnk">
            {c.hero.cta.secondary} →
          </a>
        </div>
      </div>

      <Wave className="wave" />
    </section>
  );
}