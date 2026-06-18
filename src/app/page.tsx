import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      {/* Заглушки под следующие разделы — наполним по мере поступления ТЗ */}
      <section id="about" className="mx-auto max-w-5xl px-6 py-24 md:px-12">
        <p className="font-display text-2xl text-muted">
          Раздел «Обо мне» — в работе
        </p>
      </section>
      <section id="principles" className="mx-auto max-w-5xl px-6 py-24 md:px-12">
        <p className="font-display text-2xl text-muted">
          Раздел «Принципы работы» — в работе
        </p>
      </section>
    </main>
  );
}
