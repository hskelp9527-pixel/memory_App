"use client";

import { useEffect, useState } from "react";

type BookCoverProps = {
  username: string;
};

export function BookCover({ username }: BookCoverProps) {
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (!isOpening) {
      return;
    }

    const timer = window.setTimeout(() => {
      window.location.assign("/timeline");
    }, 420);

    return () => window.clearTimeout(timer);
  }, [isOpening]);

    return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="w-full max-w-5xl text-center">
        <p className="font-label text-xs uppercase tracking-[0.6em] text-primary/60">
          Private Archive
        </p>
        <button
          className="mx-auto mt-10 block [perspective:1800px]"
          onClick={() => setIsOpening(true)}
          type="button"
        >
          <div
            className={`relative flex h-[38rem] max-w-md flex-col items-center justify-center rounded-r-xl bg-[radial-gradient(circle_at_top,_#604c3f,_#3a2e26_60%)] px-8 shadow-[15px_15px_30px_rgba(0,0,0,0.35)] transition-[transform,box-shadow,filter,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpening ? "translate-y-[-4px] scale-[0.992] shadow-[20px_18px_38px_rgba(0,0,0,0.22)] brightness-[1.02]" : "hover:-translate-y-1 hover:rotate-[-0.4deg]"}`}
          >
            <div className={`pointer-events-none absolute inset-y-5 left-[18px] w-[88%] rounded-r-[22px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_24%,rgba(255,255,255,0.04)_78%,rgba(0,0,0,0.07))] transition duration-[420ms] ${isOpening ? "opacity-70" : "opacity-100"}`} />
            <div className={`pointer-events-none absolute inset-[10px] rounded-r-xl border border-white/6 transition duration-300 ${isOpening ? "opacity-40" : "opacity-0"}`} />
            <span className="absolute inset-y-10 left-3 w-[6px] rounded-full bg-black/10" />
            <span className="absolute right-[-14px] top-1/2 h-20 w-10 -translate-y-1/2 rounded-r-md bg-[linear-gradient(180deg,#f3e2c7,#c19e67)] shadow-[0_4px_10px_rgba(0,0,0,0.25)]" />
            <p className="font-headline text-3xl uppercase tracking-[0.5em] text-[#c19e67]">
              Memories
            </p>
            <div className="my-16 w-full rotate-[-2deg] bg-surface px-6 py-8 shadow-paper">
              <p className="font-hand text-6xl text-primary">Our Story</p>
            </div>
            <p className="font-label text-sm uppercase tracking-[0.4em] text-[#d2c4a7]">
              {username}
            </p>
            <p className="mt-16 font-label text-[11px] uppercase tracking-[0.5em] text-[#e9d4b3]/65 transition duration-500">
              {isOpening ? "Entering..." : "Tap the book"}
            </p>
          </div>
        </button>
      </div>
    </main>
  );
}
