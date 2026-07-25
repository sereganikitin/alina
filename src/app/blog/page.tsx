"use client";

import { useContent } from "@/lib/useContent";
import ContentGate from "@/components/ContentGate";

export default function BlogPage() {
  const c = useContent();
  const posts = c.blog.posts;

  return (
    <main className="flex-1">
      <ContentGate>
        <section className="blog-hero">
          <div className="wrap">
            <div className="kicker">Блог</div>
            <h1 className="section-h">Блог</h1>

            {posts.length === 0 ? (
              <p className="muted blog-empty">Статей пока нет — загляните позже.</p>
            ) : (
              <div className="blog-list">
                {posts.map((p, i) => (
                  <a
                    key={p.slug}
                    href={`/blog/post/?slug=${encodeURIComponent(p.slug)}`}
                    className="blog-entry"
                    style={{ flexDirection: i % 2 === 1 ? "row-reverse" : "row" }}
                  >
                    {p.cover && (
                      <div className="blog-cover">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.cover} alt="" />
                      </div>
                    )}
                    <div className="blog-entry-text">
                      <h3>{p.title}</h3>
                      <div className="muted blog-entry-date">{p.date}</div>
                      <p className="blog-excerpt">{p.excerpt}</p>
                      <span className="blog-more btn btn-primary">Читать далее</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      </ContentGate>
    </main>
  );
}
