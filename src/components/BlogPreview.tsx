"use client";

import { useRef } from "react";
import { useContent } from "@/lib/useContent";

export default function BlogPreview() {
  const c = useContent();
  const trackRef = useRef<HTMLDivElement>(null);
  const posts = c.blog.posts;

  if (posts.length === 0) return null;

  function scroll(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  }

  return (
    <section id="blog-preview" className="blog-preview">
      <div className="wrap">
        <div className="bp-head">
          <div>
            <div className="kicker">Блог</div>
            <h2 className="section-h">Читайте в блоге</h2>
          </div>
          {posts.length > 1 && (
            <div className="bp-arrows">
              <button
                type="button"
                className="bp-arrow"
                aria-label="Назад"
                onClick={() => scroll(-1)}
              >
                ‹
              </button>
              <button
                type="button"
                className="bp-arrow"
                aria-label="Вперёд"
                onClick={() => scroll(1)}
              >
                ›
              </button>
            </div>
          )}
        </div>

        <div className="bp-track" ref={trackRef}>
          {posts.map((p) => (
            <a key={p.slug} href={`/blog/post/?slug=${encodeURIComponent(p.slug)}`} className="bp-card">
              {p.cover && (
                <div className="bp-cover">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.cover} alt="" />
                </div>
              )}
              <div className="bp-title">{p.title}</div>
              <div className="bp-date muted">{p.date}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
