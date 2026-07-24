/**
 * Волна по нижнему краю секции — заливка цветом следующей секции (беж),
 * поверх — та же бумажная зернистая текстура, что и на фоне секций
 * (--paper в globals.css), чтобы волна не смотрелась гладкой вставкой
 * на фоне зернистых секций сверху/снизу.
 */
export default function Wave({
  className = "",
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="wave-noise" x="0" y="0" width="120" height="120" filterUnits="userSpaceOnUse">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" stitchTiles="stitch" result="t" />
          <feColorMatrix in="t" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.49  0 0 0 0 0.4  0 0 0 0.35 0" />
        </filter>
        <pattern id="wave-paper" patternUnits="userSpaceOnUse" width="120" height="120">
          <rect width="120" height="120" fill={fill} />
          <rect width="120" height="120" filter="url(#wave-noise)" style={{ mixBlendMode: "multiply" }} />
        </pattern>
      </defs>
      <path
        d="M0,64 C240,16 480,16 720,52 C960,88 1200,104 1440,56 L1440,120 L0,120 Z"
        fill="url(#wave-paper)"
      />
    </svg>
  );
}