"use client";

import { NewMemoryForm } from "@/components/memory/new-memory-form";
import { PaperModal } from "@/components/ui/paper-modal";

type NewMemoryModalProps = {
  onCreated: () => Promise<void>;
  onClose: () => void;
};

export function NewMemoryModal({ onCreated, onClose }: NewMemoryModalProps) {
  return (
    <PaperModal onClose={onClose}>
      <div className="mx-auto w-full max-w-[15.5rem] px-2.5 py-3 sm:max-w-[21rem] sm:px-5 sm:py-6 md:max-w-none md:px-10 md:py-8">
        <div className="pointer-events-none absolute inset-x-4 top-3 h-6 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)] opacity-70" />
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-headline text-[1.35rem] text-primary sm:text-[2rem] md:text-3xl">新增记忆</h2>
          </div>
        </div>
        <div className="mt-2 h-px bg-[linear-gradient(90deg,transparent,rgba(74,59,50,0.18),transparent)] sm:mt-4" />
        <div className="mt-3 sm:mt-6 md:mt-8">
          <NewMemoryForm onClose={onClose} onCreated={onCreated} />
        </div>
      </div>
    </PaperModal>
  );
}
