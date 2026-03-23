"use client";

type ConfirmStampDialogProps = {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmStampDialog({
  title,
  description,
  confirmLabel,
  cancelLabel = "再想想",
  isPending = false,
  onConfirm,
  onCancel
}: ConfirmStampDialogProps) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[rgba(53,42,34,0.38)] backdrop-blur-[2px]">
      <div className="mv-float-in relative w-[min(88vw,22rem)] rotate-[-2deg] border border-[#d8c4a8] bg-[linear-gradient(180deg,#fffaf2,#f5e8d3)] px-5 py-6 shadow-[0_18px_34px_rgba(0,0,0,0.24)]">
        <div className="absolute left-1/2 top-0 h-5 w-16 -translate-x-1/2 -translate-y-1/2 rotate-[4deg] bg-[#d7c7a9cc]" />
        <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-secondary/25 bg-[radial-gradient(circle_at_top,#f3d8d3,#cf7b6d_62%,#983f33)] font-label text-[10px] uppercase tracking-[0.14em] text-white shadow-[0_6px_14px_rgba(0,0,0,0.18)]">
          删除
        </div>
        <p className="font-headline text-2xl text-primary">{title}</p>
        <p className="mt-3 text-sm leading-7 text-primary/75">{description}</p>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            className="rounded-full border border-primary/10 bg-white/70 px-4 py-2 text-sm text-primary/75 transition hover:bg-white"
            onClick={onCancel}
            type="button"
          >
            {cancelLabel}
          </button>
          <button
            className="rounded-full border border-secondary/25 bg-[radial-gradient(circle_at_top,#f1d4cf,#cb7064_62%,#9a4135)] px-4 py-2 font-label text-[11px] uppercase tracking-[0.16em] text-white shadow-[0_8px_16px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPending}
            onClick={onConfirm}
            type="button"
          >
            {isPending ? "处理中" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
