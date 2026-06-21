"use client";

import { useEffect, useState } from "react";

// Демо-переключатель стилей сайта (3 варианта). Меняет только оформление,
// контент общий. Выбор запоминается в localStorage.
const THEMES = [
  { id: "base", label: "Базовый" },
  { id: "warm", label: "Тёплый" },
  { id: "dark", label: "Тёмный" },
];

function applyTheme(t: string) {
  const el = document.documentElement;
  if (t === "base") delete el.dataset.theme;
  else el.dataset.theme = t;
  try {
    localStorage.setItem("siteTheme", t);
  } catch {}
  window.dispatchEvent(new Event("navthemerefresh"));
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("base");

  useEffect(() => {
    let saved = "base";
    try {
      saved = localStorage.getItem("siteTheme") || "base";
    } catch {}
    applyTheme(saved);
    setTheme(saved);
  }, []);

  function choose(t: string) {
    setTheme(t);
    applyTheme(t);
  }

  return (
    <div className="fixed left-1/2 top-3 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/55 p-1 text-xs text-white shadow-lg backdrop-blur">
      <span className="hidden px-2 opacity-60 sm:inline">Стиль:</span>
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => choose(t.id)}
          className={`rounded-full px-3 py-1.5 transition-colors ${
            theme === t.id ? "bg-white text-black" : "hover:bg-white/20"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
