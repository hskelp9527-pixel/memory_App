type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#5a493d,_#2c2621_58%)] px-4 py-12">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-[12%] top-[14%] h-32 w-32 rounded-full border border-white/6" />
        <div className="absolute right-[11%] top-[24%] h-20 w-20 rounded-full border border-white/6" />
        <div className="absolute bottom-[18%] left-[16%] h-px w-40 rotate-[-18deg] bg-white/8" />
        <div className="absolute right-[16%] top-[16%] h-px w-44 rotate-[18deg] bg-white/8" />
        <div className="absolute bottom-[12%] right-[14%] rotate-[-7deg] font-label text-[10px] uppercase tracking-[0.35em] text-paper/20">
          Filed in private memory
        </div>
      </div>
      <div className="relative w-full max-w-xl overflow-hidden border border-white/10 bg-paper px-8 py-12 shadow-[8px_12px_0_rgba(0,0,0,0.25),0_34px_80px_rgba(0,0,0,0.2)] md:px-14">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent_16%,transparent_78%,rgba(74,59,50,0.05))]" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-[linear-gradient(90deg,rgba(58,46,38,0.12),transparent)]" />
        <div className="absolute left-10 top-0 h-10 w-24 -translate-y-1/2 rotate-[-4deg] bg-[#d2c4a799]" />
        <div className="absolute right-12 top-0 h-10 w-20 -translate-y-1/2 rotate-[8deg] bg-[#d2c4a766]" />
        <div className="absolute bottom-6 right-8 rotate-[-4deg] rounded-full border border-primary/10 bg-white/35 px-3 py-1 font-label text-[9px] uppercase tracking-[0.18em] text-primary/35">
          Archive Access
        </div>
        <header className="mb-10 text-center">
          <p className="font-label text-xs uppercase tracking-[0.5em] text-primary/60">
            Memory Vine
          </p>
          <h1 className="mt-6 font-headline text-4xl text-primary">{title}</h1>
          <p className="mt-3 font-hand text-4xl text-secondary">{subtitle}</p>
        </header>
        {children}
      </div>
    </main>
  );
}
