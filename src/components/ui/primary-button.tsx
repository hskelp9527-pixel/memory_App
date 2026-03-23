import type { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`rounded-full border border-secondary/25 bg-[radial-gradient(circle_at_top,#f0d4ce,#c96e61_62%,#9b4338)] px-7 py-3 font-label text-[11px] uppercase tracking-[0.22em] text-white shadow-[0_12px_22px_rgba(0,0,0,0.18),inset_0_2px_2px_rgba(255,255,255,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(0,0,0,0.22),inset_0_2px_2px_rgba(255,255,255,0.22)] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
