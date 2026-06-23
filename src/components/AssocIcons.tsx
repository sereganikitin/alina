// Одноцветные лого-локапы ассоциаций (иконка + текст), наследуют currentColor.
type Props = { className?: string };

// --- EMDR Russia: глаз (два «мазка» век) + спираль ---
function EmdrEye({ className }: Props) {
  return (
    <svg
      viewBox="0 0 48 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 16C13 5.5 35 5.5 45 16" />
      <path d="M4.5 16.8C14.5 26 33.5 26 43.5 16" />
      <path d="M24 9.2a6.8 6.8 0 1 1-6.6 8.6 4.5 4.5 0 1 0 4.4-5.7 2.4 2.4 0 1 1-2.3 3.1" />
    </svg>
  );
}

// --- IFS Russia: три матрёшки с платком, лицом и пояском ---
function Doll({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        vectorEffect="non-scaling-stroke"
        d="M0-12c-2.5 0-4 1.8-4 3.8 0 1.1.5 2 1.2 2.7-1.5 1-2.4 3.1-2.4 5.7 0 3.6 2.3 6.3 5.2 6.3s5.2-2.7 5.2-6.3c0-2.6-.9-4.7-2.4-5.7.7-.7 1.2-1.6 1.2-2.7 0-2-1.5-3.8-4-3.8z"
      />
      {/* платок / линия лица */}
      <path vectorEffect="non-scaling-stroke" d="M-3.2-6.1a3.7 3.7 0 0 0 6.4 0" />
      {/* поясок на теле */}
      <path vectorEffect="non-scaling-stroke" d="M-4.6 2.6a6.2 4 0 0 0 9.2 0" />
    </g>
  );
}

function IfsDolls({ className }: Props) {
  return (
    <svg
      viewBox="0 0 56 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <Doll x={17} y={22} s={0.8} />
      <Doll x={39} y={22} s={0.8} />
      <Doll x={28} y={26} s={1.05} />
    </svg>
  );
}

// Текст скрыт на узких экранах (остаётся только значок).
export function EmdrLogo() {
  return (
    <span className="inline-flex items-center gap-2">
      <EmdrEye className="h-7 w-auto md:h-8" />
      <span className="hidden h-7 w-px bg-current opacity-40 sm:block" />
      <span className="hidden font-display text-[11px] leading-[1.1] tracking-[0.12em] sm:block">
        EMDR
        <br />
        RUSSIA
      </span>
    </span>
  );
}

export function IfsLogo() {
  return (
    <span className="inline-flex items-center gap-2">
      <IfsDolls className="h-8 w-auto md:h-9" />
      <span className="hidden font-sans text-[13px] font-semibold leading-none tracking-wide sm:inline">
        IFS <span className="font-normal">Russia</span>
      </span>
    </span>
  );
}
