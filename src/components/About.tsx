"use client";

import type { ReactNode } from "react";
import { useContent } from "@/lib/useContent";
import { RichText } from "@/lib/richText";
import { EmdrLogo, IfsLogo, EmdrEuropeLogo } from "./AssocIcons";

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

export default function About() {
  const c = useContent();
  return (
    <section id="about" className="about">
      <div className="wrap about-grid">
        <div className="arch">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.about.image} alt="Алина Дубовская" />
        </div>
        <div>
          <div className="kicker">Обо мне</div>
          <div className="role">{c.about.title}</div>
          <RichText
            html={c.about.lead}
            className="muted"
            style={{ marginTop: "18px", fontSize: "1.1rem" }}
          />
          <div className="assoc">
            <AssocLink url={c.contacts.emdrUrl}>
              <EmdrLogo />
            </AssocLink>
            <AssocLink url={c.contacts.ifsUrl}>
              <IfsLogo />
            </AssocLink>
            <AssocLink url={c.contacts.emdrEuropeUrl}>
              <EmdrEuropeLogo />
            </AssocLink>
          </div>
        </div>
      </div>
    </section>
  );
}