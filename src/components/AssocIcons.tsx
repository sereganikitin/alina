// Одноцветные значки профессиональных ассоциаций (наследуют currentColor).
type IconProps = { className?: string };

// EMDR Russia — глаз со спиралью
export function EmdrIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.5 16C12 4 36 4 45.5 16 36 28 12 28 2.5 16Z" />
      <path d="M24 9.4a6.6 6.6 0 1 1-6.4 8.2 4.3 4.3 0 1 0 4.2-5.1 2.2 2.2 0 1 1-2.1 2.7" />
    </svg>
  );
}

// IFS Russia — три матрёшки
export function IfsIcon({ className }: IconProps) {
  const doll =
    "M0-12c-2.5 0-4 1.8-4 3.8 0 1.1.5 2 1.2 2.7-1.5 1-2.4 3.1-2.4 5.7 0 3.6 2.3 6.3 5.2 6.3s5.2-2.7 5.2-6.3c0-2.6-.9-4.7-2.4-5.7.7-.7 1.2-1.6 1.2-2.7 0-2-1.5-3.8-4-3.8z";
  return (
    <svg
      viewBox="0 0 54 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={doll} transform="translate(16 22) scale(0.8)" vectorEffect="non-scaling-stroke" />
      <path d={doll} transform="translate(38 22) scale(0.8)" vectorEffect="non-scaling-stroke" />
      <path d={doll} transform="translate(27 26) scale(1.05)" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
