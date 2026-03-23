"use client";

import { useState } from "react";

import { PaperModal } from "@/components/ui/paper-modal";
import { ConfirmStampDialog } from "@/components/ui/confirm-stamp-dialog";
import { MemoryDetail } from "@/components/memory/memory-detail";
import type { MemoryRecord } from "@/types/memory";

type MemoryDetailModalProps = {
  memory: MemoryRecord;
  onClose: () => void;
  onDeleted: () => Promise<void>;
};

export function MemoryDetailModal({ memory, onClose, onDeleted }: MemoryDetailModalProps) {
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    setError("");

    const response = await fetch(`/api/memories/${memory.id}`, {
      method: "DELETE"
    });
    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(payload.error ?? "删除失败");
      setIsDeleting(false);
      return;
    }

    await onDeleted();
    onClose();
  }

  return (
    <PaperModal onClose={onClose}>
      <div className="relative mv-fade-in">
        <div className="pointer-events-none absolute inset-x-5 top-3 h-6 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)] opacity-70" />
        <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-full border border-tertiary/20 bg-[radial-gradient(circle_at_top,#f4e4c8,#d5b27a_60%,#a1773f)] px-3 py-1.5 font-label text-[9px] uppercase tracking-[0.16em] text-primary/70 shadow-[0_6px_14px_rgba(0,0,0,0.1)]">
          Memory Note
        </div>
        <div className="absolute right-3 top-3 z-20 flex items-center gap-2 md:right-4 md:top-4">
          <button
            className="rounded-full border border-secondary/25 bg-[radial-gradient(circle_at_top,#f4d6d1,#cf7c70_62%,#9f4439)] px-3 py-2 font-label text-[10px] uppercase tracking-[0.16em] text-white shadow-[0_8px_16px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isDeleting}
            onClick={() => setIsConfirmOpen(true)}
            type="button"
          >
            {isDeleting ? "删除中" : "删除"}
          </button>
          <button
            className="rounded-full bg-white/70 px-3 py-2 text-sm text-primary"
            onClick={onClose}
            type="button"
          >
            关闭
          </button>
        </div>
        <MemoryDetail memory={memory} />
        {error ? (
          <p className="px-6 pb-5 text-sm text-secondary md:px-10 md:pb-8">{error}</p>
        ) : null}
        {isConfirmOpen ? (
          <ConfirmStampDialog
            confirmLabel="确认删除"
            description="这条记忆会连同图片或视频一起从藤蔓中移除，而且不能恢复。"
            isPending={isDeleting}
            onCancel={() => {
              if (!isDeleting) {
                setIsConfirmOpen(false);
              }
            }}
            onConfirm={handleDelete}
            title="把这一页取下吗？"
          />
        ) : null}
      </div>
    </PaperModal>
  );
}
