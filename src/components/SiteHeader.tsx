"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Обо мне", href: "#about" },
  { label: "Образование", href: "#education" },
  { label: "Принципы", href: "#principles" },
  { label: "Подход", href: "#approach" },
  { label: "Консультация", href: "#consult" },
  { label: "Блог", href: "/blog" },
  { label: "Контакты", href: "#contacts" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";
  // Якоря рассчитаны на главную; вне её ведём сперва на "/", браузер сам прыгнет к якорю.
  const navHref = (href: string) => (href.startsWith("#") && !home ? "/" + href : href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header id="hdr" className={scrolled && !open ? "scrolled" : ""}>
      <div className="nav">
        <a href="/" onClick={() => setOpen(false)} className="brand">
          Алина Дубовская
        </a>
        <ul>
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={navHref(item.href)}>{item.label}</a>
            </li>
          ))}
        </ul>
        {/* Бургер (мобилка) */}
        <button
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
        >
          <span className={`h-0.5 w-6 rounded-full bg-[var(--ink)] transition-all ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 rounded-full bg-[var(--ink)] transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 rounded-full bg-[var(--ink)] transition-all ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <nav className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-[var(--bg)] md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={navHref(item.href)}
              onClick={() => setOpen(false)}
              className="font-display text-2xl text-[var(--ink)] hover:text-[var(--terra)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}