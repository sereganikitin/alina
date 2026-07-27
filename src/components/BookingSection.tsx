"use client";

import BookingForm from "./BookingForm";

export default function BookingSection() {
  return (
    <section className="booking-section">
      <div className="wrap">
        <div style={{ maxWidth: "32rem" }}>
          <h3 className="serif" style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Записаться на сессию</h3>
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
