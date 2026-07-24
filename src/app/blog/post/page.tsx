"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useContent } from "@/lib/useContent";
import { RichText } from "@/lib/richText";

function BlogPostContent() {
  const c = useContent();
  const slug = useSearchParams().get("slug") || "";
  const post = c.blog.posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="blog-hero">
        <div className="wrap">
          <div className="kicker">Блог</div>
          <h1 className="section-h">Статья не найдена</h1>
          <a href="/blog" className="lnk article-back">
            ← Ко всем статьям
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-hero">
      <div className="wrap article">
        <a href="/blog" className="lnk article-back">
          ← Ко всем статьям
        </a>
        <div className="kicker">Блог</div>
        <h1 className="section-h">{post.title}</h1>
        <div className="muted blog-entry-date">{post.date}</div>

        {post.cover && (
          <div className="article-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover} alt="" />
          </div>
        )}

        <RichText html={post.body} className="article-body" />
      </div>
    </section>
  );
}

export default function BlogPostPage() {
  return (
    <main className="flex-1">
      <Suspense fallback={null}>
        <BlogPostContent />
      </Suspense>
    </main>
  );
}
