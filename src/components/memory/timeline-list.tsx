"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { MemoryDetailModal } from "@/components/memory/memory-detail-modal";
import { NewMemoryModal } from "@/components/memory/new-memory-modal";
import { PolaroidCard } from "@/components/memory/polaroid-card";
import type { MemoryRecord } from "@/types/memory";

type DecoratedMemory = {
  memory: MemoryRecord;
  align: "left" | "right";
  index: number;
  variant: 0 | 1 | 2;
};

type TimelineListProps = {
  initialMemories: MemoryRecord[];
};

export function TimelineList({ initialMemories }: TimelineListProps) {
  const router = useRouter();
  const [memories, setMemories] = useState(initialMemories);
  const [selectedMemory, setSelectedMemory] = useState<MemoryRecord | null>(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function refreshMemories() {
    const response = await fetch("/api/memories", {
      cache: "no-store"
    });
    const payload = (await response.json()) as { data?: MemoryRecord[] };

    setMemories(payload.data ?? []);
  }

  async function handleLogout() {
    setIsLoggingOut(true);

    await fetch("/api/auth/logout", {
      method: "POST"
    });

    router.push("/login");
    router.refresh();
  }

  const decoratedMemories = useMemo<DecoratedMemory[]>(
    () =>
      memories.map((memory, index) => ({
        memory,
        align: index % 2 === 0 ? "left" : "right",
        index,
        variant: (index % 3) as 0 | 1 | 2
      })),
    [memories]
  );

  return (
    <>
      <main className="relative mx-auto max-w-[22rem] px-2 pb-28 pt-10 sm:max-w-6xl sm:px-4 sm:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-28 hidden h-[34rem] sm:block">
          <div className="absolute left-[calc(50%-11rem)] top-10 h-20 w-20 rounded-full border border-tertiary/10 opacity-70" />
          <div className="absolute right-[calc(50%-12rem)] top-48 h-24 w-24 rounded-full border border-tertiary/10 opacity-60" />
          <div className="absolute left-[calc(50%-2px)] top-0 h-full w-[4px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_32%)] opacity-70" />
          <div className="absolute left-[calc(50%-7rem)] top-16 h-px w-24 rotate-[-24deg] bg-tertiary/20" />
          <div className="absolute right-[calc(50%-8rem)] top-60 h-px w-28 rotate-[28deg] bg-tertiary/20" />
        </div>
        <div className="mb-5 flex justify-end sm:mb-8">
          <button
            className="rotate-[8deg] rounded-full border-2 border-secondary/40 bg-[radial-gradient(circle_at_top,#f6ddd8,#d48a7d_60%,#a44c40)] px-3 py-1.5 font-label text-[9px] uppercase tracking-[0.18em] text-white shadow-[0_8px_18px_rgba(0,0,0,0.16),inset_0_2px_3px_rgba(255,255,255,0.28)] transition hover:-translate-y-1 hover:rotate-[5deg] hover:shadow-[0_10px_22px_rgba(0,0,0,0.2)] active:translate-y-[1px] sm:px-5 sm:py-2 sm:text-[11px] sm:tracking-[0.22em]"
            disabled={isLoggingOut}
            onClick={handleLogout}
            type="button"
          >
            {isLoggingOut ? "退出中" : "退出登录"}
          </button>
        </div>
        <header className="mb-8 text-center sm:mb-20">
          <p className="font-label text-[10px] uppercase tracking-[0.28em] text-primary/60 sm:text-xs sm:tracking-[0.4em]">
            Memory Vine Timeline
          </p>
          <h1 className="mt-2 font-hand text-[2.5rem] text-primary sm:mt-4 sm:text-7xl">记忆之蔓</h1>
        </header>
        {decoratedMemories.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-sm border border-dashed border-primary/20 bg-surface px-8 py-16 text-center shadow-paper">
            <p className="font-headline text-2xl text-primary">还没有第一条记忆</p>
            <p className="mt-3 text-base text-primary/70">
              点击右下角的按钮，把第一张拍立得留在时间轴里。
            </p>
          </div>
        ) : (
          <div className="relative space-y-6 sm:space-y-14 md:space-y-16">
            <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 -translate-x-1/2">
              <div className="relative h-full w-[1px] bg-[linear-gradient(180deg,transparent,#d7b37d_8%,#c19e67_50%,#d7b37d_92%,transparent)] opacity-95 sm:w-[1.5px] md:w-[2px]">
                <span className="mv-soft-pulse absolute left-1/2 top-[18%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-tertiary/15 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_62%)] sm:h-8 sm:w-8" />
                <span className="mv-soft-pulse absolute left-1/2 top-[49%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-tertiary/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_60%)] [animation-delay:1.1s] sm:h-7 sm:w-7" />
                <span className="mv-soft-pulse absolute left-1/2 top-[72%] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-tertiary/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_60%)] [animation-delay:2.1s] sm:h-8 sm:w-8" />
                <span className="absolute left-1/2 top-[10%] -translate-x-1/2 text-[8px] text-tertiary/80 sm:text-[14px] md:text-xl">❦</span>
                <span className="absolute left-1/2 top-[33%] -translate-x-1/2 rotate-90 text-[8px] text-tertiary/80 sm:text-[14px] md:text-xl">❦</span>
                <span className="absolute left-1/2 top-[56%] -translate-x-1/2 text-[8px] text-tertiary/80 sm:text-[14px] md:text-xl">❦</span>
                <span className="absolute left-1/2 top-[79%] -translate-x-1/2 rotate-45 text-[8px] text-tertiary/80 sm:text-[14px] md:text-xl">❦</span>
              </div>
            </div>
            {decoratedMemories.map(({ memory, align, index, variant }) => (
              <PolaroidCard
                key={memory.id}
                align={align}
                isActive={selectedMemory?.id === memory.id}
                index={index}
                memory={memory}
                onClick={() => setSelectedMemory(memory)}
                variant={variant}
              />
            ))}
          </div>
        )}
      </main>
      <button
        className="fixed bottom-5 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#f3e2c7]/80 bg-[radial-gradient(circle_at_top,#f3e2c7,#c19e67_55%,#a57d43)] text-[18px] text-primary shadow-[0_12px_24px_rgba(0,0,0,0.22),inset_0_2px_3px_rgba(255,255,255,0.35)] transition hover:-translate-y-1 hover:scale-105 active:translate-y-[1px] active:shadow-[0_4px_10px_rgba(0,0,0,0.2)] sm:bottom-8 sm:right-8 sm:h-16 sm:w-16 sm:text-[26px]"
        onClick={() => setIsComposerOpen(true)}
        type="button"
      >
        <span className="translate-y-[-1px]">✢</span>
      </button>
      {isComposerOpen ? (
        <NewMemoryModal
          onClose={() => setIsComposerOpen(false)}
          onCreated={refreshMemories}
        />
      ) : null}
      {selectedMemory ? (
        <MemoryDetailModal
          memory={selectedMemory}
          onDeleted={async () => {
            await refreshMemories();
            setSelectedMemory(null);
          }}
          onClose={() => setSelectedMemory(null)}
        />
      ) : null}
    </>
  );
}
