"use client";

import { useEffect, useState } from "react";
import BookingForm from "./BookingForm";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [attention, setAttention] = useState(false);

  // Через минуту на сайте кнопка начинает мерцать
  useEffect(() => {
    const t = setTimeout(() => setAttention(true), 60_000);
    return () => clearTimeout(t);
  }, []);

  // Esc закрывает попап
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const showAttn = attention && !open;

  return (
    <>
      {/* Попап с формой */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="fixed bottom-24 left-4 right-4 z-[60] max-h-[80vh] overflow-auto rounded-2xl bg-cream p-6 shadow-2xl sm:left-auto sm:right-6 sm:w-[380px]"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-xl text-foreground">
                  Записаться на консультацию
                </p>
                <p className="mt-1 text-sm text-muted">
                  Оставьте контакты — Алина свяжется с вами.
                </p>
              </div>
              <button
                type="button"
                aria-label="Закрыть"
                onClick={() => setOpen(false)}
                className="-mr-1 -mt-1 shrink-0 rounded-full p-2 text-muted transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <BookingForm />
          </div>
        </>
      )}

      {/* Кнопка-конвертик */}
      <button
        type="button"
        aria-label="Записаться на консультацию"
        onClick={() => {
          setOpen(true);
          setAttention(false);
        }}
        className="fixed bottom-6 right-6 z-[55] flex h-14 w-14 items-center justify-center"
      >
        {/* Пульсирующее кольцо */}
        {showAttn && (
          <span className="absolute inset-0 animate-ping rounded-full bg-terracotta/40" />
        )}
        <span
          className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-cream shadow-lg transition-transform hover:scale-105 ${
            showAttn ? "fab-attn" : ""
          }`}
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </button>
    </>
  );
}
