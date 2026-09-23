"use client";

import { useContent } from "@/lib/useContent";
import { RichText } from "@/lib/richText";

/**
 * Геометрия схемы-солнышка (эталон — design/sun-section.html).
 * Числа — «пиксели макета» 1060 × 1345, на десктопе масштабируются через
 * --u: min(1px, 100cqw / 1060). Центр схемы — 545 / 675.
 *
 * ⚠️ Подобрано вместе с текстом: x/y — центр круга, d — диаметр, w — ширина
 * текстового блока внутри. Текст не касается края круга, круги не
 * перекрываются. Если в админке меняется количество разделов или сильно
 * удлиняются пункты — эти числа нужно пересчитывать, иначе текст вылезет
 * за круг. Порядок записей соответствует порядку разделов в контенте и
 * порядку линий в SUN_LINES (ховер подсвечивает луч по nth-child).
 */
const SUN_GEOMETRY = [
  { x: 545, y: 205, d: 400, w: 262 },
  { x: 880, y: 466, d: 330, w: 220 },
  { x: 876, y: 890, d: 366, w: 244 },
  { x: 529, y: 1140, d: 400, w: 262 },
  { x: 219, y: 879, d: 320, w: 222 },
  { x: 207, y: 480, d: 412, w: 270 },
];

/** Лучи от внешнего кольца центра (r 112) до края соответствующего круга. */
const SUN_LINES = [
  { x1: 545, y1: 563, x2: 545, y2: 405 },
  { x1: 640, y1: 616, x2: 740, y2: 553 },
  { x1: 639, y1: 736, x2: 723, y2: 790 },
  { x1: 541, y1: 787, x2: 536, y2: 940 },
  { x1: 450, y1: 734, x2: 354, y2: 794 },
  { x1: 448, y1: 619, x2: 386, y2: 583 },
];

export default function Principles() {
  const c = useContent();
  // Геометрии ровно шесть; если в админке добавят раздел сверх этого,
  // последний набор координат переиспользуется — схема не сломается, но
  // круги наложатся, и координаты нужно будет дописать.
  const geo = (i: number) => SUN_GEOMETRY[i] ?? SUN_GEOMETRY[SUN_GEOMETRY.length - 1];

  return (
    <section id="principles" className="principles">
      <div className="wrap">
        <div className="kicker">Принципы работы</div>

        {/* Схема-солнышко «с чем я работаю». Собственного кикера у неё нет —
            секция уже открыта кикером «Принципы работы» выше. */}
        <div className="sun-scale">
          <div className="sun-stage" style={{ "--cx": 545, "--cy": 675 } as React.CSSProperties}>
            <svg className="sun-lines" viewBox="0 0 1060 1345" aria-hidden="true">
              {SUN_LINES.map((l, i) => (
                <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
              ))}
            </svg>

            <div className="sun-core">
              <h2 id="sun-title">С чем я работаю</h2>
            </div>

            <ol className="sun-rays" aria-labelledby="sun-title">
              {c.principles.sun.map((sec, i) => {
                const g = geo(i);
                return (
                  <li
                    key={sec.title}
                    className="sun-ray"
                    style={{ "--x": g.x, "--y": g.y, "--d": g.d, "--w": g.w } as React.CSSProperties}
                  >
                    <div className="sun-ray-body">
                      <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                      <h3>{sec.title}</h3>
                      <ul>
                        {sec.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Две колонки под схемой: с кем работаю / с кем не работаю */}
        <div className="prin-whom">
          <div className="prin-whom-col">
            <h3 className="prin-h">{c.principles.withWhomTitle}</h3>
            <RichText html={c.principles.withWhom} className="with" />
          </div>
          <div className="prin-whom-col">
            <h3 className="prin-h">{c.principles.notWithWhomTitle}</h3>
            <RichText html={c.principles.notWithWhom} className="with" />
          </div>
        </div>

        <div className="prin-full">
          <h3 className="prin-h">{c.principles.side.title}</h3>
          <div className="prin-items-grid">
            {c.principles.side.items.map((item, i) => (
              <div key={item.title} className="ph-side-item">
                <p className="ph-side-item-title">
                  <span className="ph-side-item-num">{String(i + 1).padStart(2, "0")}</span>
                  {item.title}
                </p>
                <RichText html={item.text} className="ph-side-item-text" />
                {i === 0 && (
                  <div className="ph-circles-fit">
                    {/* Невидимый дубль подзаголовка (с цифрой) — только чтобы
                        обёртка приняла его фактическую ширину (fit-content),
                        под неё же подстроится и центрируется ряд кружков. */}
                    <p className="ph-side-item-title ph-title-ghost" aria-hidden="true">
                      <span className="ph-side-item-num">{String(i + 1).padStart(2, "0")}</span>
                      {item.title}
                    </p>
                    <div className="ph-circles ph-circles-mini">
                      {c.principles.circles.slice(0, 3).map((label, ci) => (
                        <div key={ci} className="ph-circle">
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
