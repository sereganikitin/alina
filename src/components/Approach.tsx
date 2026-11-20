"use client";

import { useContent } from "@/lib/useContent";
import { RichText } from "@/lib/richText";

export default function Approach() {
  const { approach, principles, blog } = useContent();
  return (
    <section id="approach" className="approach-section">
      <div className="wrap">
        <h2 className="section-h">Принципы работы</h2>
        <div className={approach.image ? "approach-layout with-photo" : "approach-layout"}>
          <div className="approach-copy">
            <RichText html={approach.intro} />
            {blog.posts.some((post) => post.slug === "emdr") && (
              <a href="/blog/post/?slug=emdr" className="section-text-link">О EMDR</a>
            )}
            <RichText html={approach.closing} className="approach-closing" />
            {approach.paragraphs.map((paragraph, index) => <RichText key={index} html={paragraph} />)}
          </div>
          {approach.image && (
            <div className="approach-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={approach.image} alt="Алина Дубовская" loading="lazy" />
            </div>
          )}
        </div>
        <h3 className="section-h expectations-title">{principles.side.title}</h3>
        <div className="expectations-grid">
          {principles.side.items.map((item) => (
            <article key={item.title} className="expectation">
              <h4>{item.title}</h4>
              <RichText html={item.text} />
            </article>
          ))}
        </div>
        {approach.support && <blockquote className="approach-credo">{approach.support}</blockquote>}
      </div>
    </section>
  );
}
