import Hero from "@/components/Hero";
import About from "@/components/About";
import Principles from "@/components/Principles";

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <Hero />
      <About />
      <Principles />

      {/* Заглушки под следующие разделы — наполним по мере поступления ТЗ */}
      <section
        id="approach"
        data-nav-theme="light"
        className="bg-background px-6 py-24 md:px-12"
      >
        <div className="mx-auto max-w-5xl">
          <p className="font-display text-2xl text-muted">
            Раздел «О подходе» — в работе
          </p>
        </div>
      </section>
    </main>
  );
}
