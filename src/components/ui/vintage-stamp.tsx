type VintageStampProps = {
  location?: string | null;
  date: string;
  time?: string | null;
};

export function VintageStamp({ location, date, time }: VintageStampProps) {
  return (
    <div className="relative border-b border-dashed border-primary/30 pb-4 sm:pb-5">
      <div className="flex flex-col gap-3 pr-0 sm:flex-row sm:justify-between sm:gap-6 sm:pr-24">
        <div className="min-w-0">
          <p className="font-label text-[9px] uppercase tracking-[0.24em] text-primary/55 sm:text-[10px] sm:tracking-[0.3em]">
            地点
          </p>
          <p className="mt-1 truncate font-label text-[13px] font-medium text-primary sm:text-sm">
            {location || "未知地点"}
          </p>
        </div>
        <div className="min-w-0 sm:text-right">
          <p className="font-label text-[9px] uppercase tracking-[0.24em] text-primary/55 sm:text-[10px] sm:tracking-[0.3em]">
            日期与时间
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 sm:block">
            <p className="font-label text-[13px] font-medium text-primary sm:text-sm">{date}</p>
            {time ? <p className="font-label text-[11px] text-primary/60 sm:text-xs">{time}</p> : null}
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 hidden h-16 w-16 items-center justify-center rounded-full border-4 border-secondary text-center text-[10px] uppercase tracking-[0.2em] text-secondary rotate-12 sm:flex">
        邮戳
      </div>
      <div className="mt-3 inline-flex rotate-[6deg] items-center justify-center rounded-full border-2 border-secondary/55 px-3 py-1 font-label text-[9px] uppercase tracking-[0.18em] text-secondary sm:hidden">
        邮戳
      </div>
    </div>
  );
}
