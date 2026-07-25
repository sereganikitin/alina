"use client";

import { useEffect, useState } from "react";
import { DEFAULT_CONTENT, type SiteContent } from "./defaultContent";

// Глубокое слияние: значения из content.json перекрывают дефолты.
// Массивы заменяются целиком (если заданы).
function deepMerge<T>(def: T, over: unknown): T {
  if (over === undefined || over === null) return def;
  if (Array.isArray(def)) return (Array.isArray(over) ? over : def) as T;
  if (def && typeof def === "object") {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(def as object)) {
      out[k] = deepMerge((def as Record<string, unknown>)[k], (over as Record<string, unknown>)[k]);
    }
    return out as T;
  }
  return (over as T) ?? def;
}

let cache: SiteContent | null = null;
let promise: Promise<SiteContent> | null = null;

function loadContent(): Promise<SiteContent> {
  if (!promise) {
    promise = fetch("/content.json", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => {
        cache = deepMerge(DEFAULT_CONTENT, data);
        return cache;
      })
      .catch(() => {
        cache = DEFAULT_CONTENT;
        return cache;
      });
  }
  return promise;
}

/** Возвращает контент: сначала дефолты, после загрузки /content.json — слитый. */
export function useContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(cache ?? DEFAULT_CONTENT);

  useEffect(() => {
    if (cache) {
      setContent(cache);
      return;
    }
    loadContent().then(setContent);
  }, []);

  return content;
}

/**
 * true, когда реальный /content.json уже загружен (или загрузка не удалась
 * и подтверждённо взяты дефолты). Пока сайт статический и контент грузится
 * на клиенте, между первым рендером и ответом сервера компоненты видят
 * DEFAULT_CONTENT — вшитые в сборку значения (старые фото/тексты), а не то,
 * что реально настроено через админку. Используем это, чтобы не показывать
 * секции, пока не пришли настоящие данные, вместо мигания старым контентом.
 */
export function useContentReady(): boolean {
  const [ready, setReady] = useState(cache !== null);

  useEffect(() => {
    if (cache) {
      setReady(true);
      return;
    }
    loadContent().then(() => setReady(true));
  }, []);

  return ready;
}
