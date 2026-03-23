import Image from "next/image";

import type { MemoryRecord } from "@/types/memory";

type PolaroidCardProps = {
  memory: MemoryRecord;
  align: "left" | "right";
  isActive: boolean;
  index: number;
  onClick: () => void;
  variant: 0 | 1 | 2;
};

const variants = {
  0: {
    left: "translate-x-[-0.35rem] rotate-[-3deg] md:translate-x-[-0.2rem]",
    right: "translate-x-[0.35rem] rotate-[3deg] md:translate-x-[0.2rem]",
    width: "w-[41%] max-w-[8.7rem] sm:w-[56%] sm:max-w-[12.8rem]"
  },
  1: {
    left: "translate-x-[-0.15rem] rotate-[-1deg] md:translate-x-0",
    right: "translate-x-[0.15rem] rotate-[1deg] md:translate-x-0",
    width: "w-[39%] max-w-[8.2rem] sm:w-[53%] sm:max-w-[12.1rem]"
  },
  2: {
    left: "translate-x-[-0.55rem] rotate-[-4deg] md:translate-x-[-0.3rem]",
    right: "translate-x-[0.55rem] rotate-[4deg] md:translate-x-[0.3rem]",
    width: "w-[40%] max-w-[8.5rem] sm:w-[55%] sm:max-w-[12.5rem]"
  }
} as const;

export function PolaroidCard({ memory, align, index, isActive, onClick, variant }: PolaroidCardProps) {
  const style = variants[variant];

  return (
    <div
      className={`mv-fade-in flex ${align === "left" ? "justify-start md:pr-4 lg:pr-10" : "justify-end md:pl-4 lg:pl-10"}`}
      style={{ animationDelay: `${Math.min(index * 70, 280)}ms` }}
    >
      <button
        className={`group relative min-w-[7rem] ${style.width} ${align === "left" ? style.left : style.right} text-left transition duration-500 ease-out hover:rotate-0 hover:-translate-y-1 md:w-full md:max-w-sm ${isActive ? "z-10 rotate-0 -translate-y-1 scale-[1.02]" : ""}`}
        onClick={onClick}
        type="button"
      >
        <div className={`absolute left-1/2 top-0 h-3.5 w-10 -translate-x-1/2 -translate-y-1/2 bg-[#d2c4a799] transition duration-300 sm:h-5 sm:w-16 md:h-6 md:w-20 ${isActive ? "opacity-100" : "opacity-85"}`} />
        <div className={`border border-primary/10 bg-surface p-2.5 pb-7 shadow-[3px_4px_0_rgba(44,38,33,0.10),0_10px_24px_rgba(44,38,33,0.08)] transition duration-500 ease-out group-hover:shadow-[6px_10px_0_rgba(44,38,33,0.12),0_18px_30px_rgba(44,38,33,0.10)] sm:p-4 sm:pb-10 md:p-4 md:pb-12 ${isActive ? "shadow-[7px_11px_0_rgba(44,38,33,0.12),0_20px_34px_rgba(44,38,33,0.12)] ring-1 ring-primary/10" : ""}`}>
          <div className={`pointer-events-none absolute right-2 top-2 rounded-full border border-primary/8 px-2 py-0.5 font-label text-[7px] uppercase tracking-[0.12em] text-primary/45 transition sm:right-3 sm:top-3 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
            Open
          </div>
          <div className={`pointer-events-none absolute left-1/2 top-0 h-10 w-[86%] -translate-x-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_70%)] transition duration-500 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
          <div className="pointer-events-none absolute left-1.5 top-1.5 h-9 w-9 rounded-full border border-primary/5 sm:left-2 sm:top-2 sm:h-12 sm:w-12" />
          <div className="relative h-20 w-full overflow-hidden sm:h-32 md:h-72">
            {memory.media_type === "image" ? (
              <Image
                alt={memory.title}
                className="object-cover transition duration-500 group-hover:scale-105"
                fill
                src={memory.media_url}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-primary-deep text-paper">
                <span className="font-label text-xs uppercase tracking-[0.4em]">Video</span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_32%,rgba(44,38,33,0.08))]" />
          </div>
          <div className="mt-2 flex items-center justify-between sm:mt-3">
            <span className="rounded-full bg-primary/5 px-2 py-1 font-label text-[7px] uppercase tracking-[0.12em] text-primary/45 sm:text-[8px]">
              {memory.media_type === "image" ? "Photo" : "Video"}
            </span>
            <span className="font-label text-[7px] uppercase tracking-[0.14em] text-primary/35 sm:text-[8px]">
              Click to view
            </span>
          </div>
          <p className="mt-1.5 text-center font-hand text-[0.95rem] leading-tight text-primary/85 sm:mt-3 sm:text-[1.45rem] md:mt-4 md:text-4xl">
            {memory.caption}
          </p>
          <p className="absolute bottom-1.5 right-2 font-label text-[7px] uppercase tracking-[0.14em] text-primary/45 sm:bottom-3 sm:right-4 sm:text-[9px] md:text-[10px]">
            {memory.memory_date}
          </p>
        </div>
      </button>
    </div>
  );
}
