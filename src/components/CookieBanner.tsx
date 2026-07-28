"use client";

import { useEffect, useState } from "react";
import { useContent, useContentReady } from "@/lib/useContent";

const STORAGE_KEY = "cookie-consent-ack";

export default function CookieBanner() {
  const c = useContent();
  const ready = useContentReady();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, [ready]);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Уведомление об использовании cookie">
      <p className="cookie-banner-text">
        {c.legal.cookieText}{" "}
        <a href="/privacy" className="underline underline-offset-2">
          Подробнее
        </a>
        .
      </p>
      <button type="button" className="btn btn-primary cookie-banner-btn" onClick={accept}>
        Хорошо
      </button>
    </div>
  );
}
