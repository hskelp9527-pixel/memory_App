import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextField({ label, error, className = "", ...props }: TextFieldProps) {
  return (
    <label className="block">
      <span className="font-hand text-[1.65rem] leading-none text-primary/80 sm:text-3xl">{label}</span>
      <input
        className={`mt-1.5 block w-full border-0 border-b border-primary/20 bg-transparent px-0 py-2.5 font-label text-[0.95rem] text-primary outline-none transition focus:border-secondary focus:ring-0 sm:mt-2 sm:py-3 sm:text-base ${className}`}
        {...props}
      />
      {error ? <span className="mt-2 block text-sm text-secondary">{error}</span> : null}
    </label>
  );
}
