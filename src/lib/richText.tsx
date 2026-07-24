"use client";

import type { CSSProperties } from "react";

// Базовое форматирование из админки: жирный/курсив/подчёркивание + абзацы.
const ALLOWED_TAGS = new Set(["p", "b", "strong", "i", "em", "u", "br", "div"]);

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Вырезает всё, кроме разрешённых тегов, и все атрибуты (админка — HTML из
// contenteditable, но лучше не доверять слепо).
function sanitizeRichHtml(html: string): string {
  let out = html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "");
  out = out.replace(/<!--[\s\S]*?-->/g, "");
  out = out.replace(/<\/?([a-zA-Z0-9]+)[^>]*>/g, (match, tag) => {
    const t = String(tag).toLowerCase();
    if (!ALLOWED_TAGS.has(t)) return "";
    return match.startsWith("</") ? `</${t}>` : `<${t}>`;
  });
  return out;
}

/**
 * Старый контент — простой текст с абзацами через пустую строку (как раньше
 * делали через .split('\n\n') прямо в компонентах). Новый — HTML из
 * rich-редактора админки. Функция понимает оба варианта.
 */
export function richTextToHtml(raw: string | undefined | null): string {
  if (!raw) return "";
  const hasTags = /<[a-z][\s\S]*>/i.test(raw);
  if (hasTags) return sanitizeRichHtml(raw);
  return raw
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export function RichText({
  html,
  className,
  style,
}: {
  html: string | undefined | null;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: richTextToHtml(html) }}
    />
  );
}
