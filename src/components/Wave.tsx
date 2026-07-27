import { WAVE_CURVE_WIDTH, waveCurvePath } from "@/lib/waveCurve";

/**
 * Волна по нижнему краю секции — по форме повторяет реальную кривую шва
 * (см. src/lib/waveCurve.ts). Ниже кривой — не плоская заливка цветом, а
 * срез картинки следующей секции (textureImage) поверх той же бумажной
 * зернистой текстуры (--paper), чтобы волна не смотрелась отдельной
 * закрашенной полосой, а стыковалась с фоном идущего ниже блока.
 * Выше кривой — прозрачно, сквозь неё видно фото/фон текущей секции.
 */
const VIEWBOX_HEIGHT = 90;
const OFFSET_Y = 16;
// Начиная с этой высоты (в % от VIEWBOX_HEIGHT) картинка-срез плавно
// растворяется в сплошную заливку (fill+шум) — к нижнему краю полосы
// остаётся ровно тот же плоский фон+зерно, что и в начале следующей
// секции (см. .about::before/mask-image в globals.css), поэтому шов
// сходится в одном и том же тоне, а не в двух разных срезах картинки.
const FADE_START_FRACTION = 40 / VIEWBOX_HEIGHT;
// Соотношение сторон src/../public/photos/about-texture.png — 1920×1266.
const TEXTURE_ASPECT = 1920 / 1266;

export default function Wave({
  className = "",
  fill = "currentColor",
  textureImage = "/photos/about-texture.png",
}: {
  className?: string;
  fill?: string;
  textureImage?: string | null;
}) {
  const curve = waveCurvePath(OFFSET_Y);
  const textureHeight = Math.round(WAVE_CURVE_WIDTH / TEXTURE_ASPECT);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${WAVE_CURVE_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="wave-noise" x="0" y="0" width={WAVE_CURVE_WIDTH} height={VIEWBOX_HEIGHT} filterUnits="userSpaceOnUse">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" stitchTiles="stitch" result="t" />
          <feColorMatrix in="t" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.49  0 0 0 0 0.4  0 0 0 0.7 0" />
        </filter>
        <linearGradient id="wave-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset={FADE_START_FRACTION} stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id="wave-fade-mask">
          <rect width={WAVE_CURVE_WIDTH} height={VIEWBOX_HEIGHT} fill="url(#wave-fade)" />
        </mask>
        <pattern id="wave-fill" patternUnits="userSpaceOnUse" width={WAVE_CURVE_WIDTH} height={VIEWBOX_HEIGHT}>
          <rect width={WAVE_CURVE_WIDTH} height={VIEWBOX_HEIGHT} fill={fill} />
          <rect width={WAVE_CURVE_WIDTH} height={VIEWBOX_HEIGHT} filter="url(#wave-noise)" style={{ mixBlendMode: "multiply" }} />
          {textureImage && (
            <image
              href={textureImage}
              x="0"
              y="0"
              width={WAVE_CURVE_WIDTH}
              height={textureHeight}
              preserveAspectRatio="xMidYMin slice"
              mask="url(#wave-fade-mask)"
            />
          )}
        </pattern>
      </defs>
      <path
        d={`${curve} L${WAVE_CURVE_WIDTH},${VIEWBOX_HEIGHT} L0,${VIEWBOX_HEIGHT} Z`}
        fill="url(#wave-fill)"
      />
    </svg>
  );
}
