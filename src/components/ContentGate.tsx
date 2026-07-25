"use client";

import type { ReactNode } from "react";
import { useContentReady } from "@/lib/useContent";

/**
 * Не рендерит детей, пока не загрузится настоящий /content.json — иначе
 * секции внутри успевают на долю секунды отрисоваться с вшитыми в сборку
 * дефолтами (старое фото/текст) и тут же переключиться на актуальные.
 */
export default function ContentGate({ children }: { children: ReactNode }) {
  const ready = useContentReady();
  if (!ready) return null;
  return <>{children}</>;
}
