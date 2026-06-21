"use client";

import { useState } from "react";

// Заявки уходят в админку (сохраняются в базе заявок).
const BOOKING_ENDPOINT = "/api/bookings";

type Status = "idle" | "sending" | "sent" | "demo" | "error";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent || !name.trim() || !contact.trim()) return;

    if (!BOOKING_ENDPOINT) {
      setStatus("demo"); // отправка ещё не подключена
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch(BOOKING_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent" || status === "demo") {
    return (
      <div className="rounded-2xl border border-line bg-background p-8 text-center">
        <p className="font-display text-2xl text-foreground">Спасибо!</p>
        <p className="mt-3 text-foreground/75">
          {status === "sent"
            ? "Заявка отправлена — Алина свяжется с вами."
            : "Форма в демо-режиме: отправку в Telegram подключим, когда будет бот."}
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-gold";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="bf-name" className="mb-1.5 block text-sm text-muted">
          Имя
        </label>
        <input
          id="bf-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
          placeholder="Как к вам обращаться"
        />
      </div>

      <div>
        <label htmlFor="bf-contact" className="mb-1.5 block text-sm text-muted">
          Контакт для связи
        </label>
        <input
          id="bf-contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className={inputClass}
          placeholder="Telegram, телефон или email"
        />
      </div>

      <div>
        <label htmlFor="bf-message" className="mb-1.5 block text-sm text-muted">
          Коротко о запросе{" "}
          <span className="text-muted/60">(необязательно)</span>
        </label>
        <textarea
          id="bf-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="Что хотелось бы обсудить"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-foreground/75">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 shrink-0 accent-terracotta"
        />
        <span>
          Я согласен(а) на обработку персональных данных в соответствии с{" "}
          <a href="#contacts" className="underline underline-offset-2">
            политикой конфиденциальности
          </a>
          .
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm text-terracotta">
          Не удалось отправить. Попробуйте ещё раз или напишите в мессенджер.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-terracotta px-8 py-3.5 font-sans text-lg text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Отправляем…" : "Записаться"}
      </button>
    </form>
  );
}
