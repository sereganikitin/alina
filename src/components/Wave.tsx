/** Волна по нижнему краю секции — заливка цветом следующей секции (беж). */
export default function Wave({
  className = "",
  fill = "var(--background)",
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
      <path
        d="M0,64 C240,16 480,16 720,52 C960,88 1200,104 1440,56 L1440,120 L0,120 Z"
        fill={fill}
      />
    </svg>
  );
}
