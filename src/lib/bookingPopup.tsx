"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type BookingPopupContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const BookingPopupContext = createContext<BookingPopupContextValue | null>(null);

export function BookingPopupProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <BookingPopupContext.Provider value={{ open, setOpen }}>
      {children}
    </BookingPopupContext.Provider>
  );
}

/** Открыть/закрыть попап записи (форма) — тот же попап, что у кнопки-конвертика. */
export function useBookingPopup() {
  const ctx = useContext(BookingPopupContext);
  if (!ctx) throw new Error("useBookingPopup must be used within BookingPopupProvider");
  return ctx;
}
