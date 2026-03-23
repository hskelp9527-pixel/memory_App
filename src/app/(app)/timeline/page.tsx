import { redirect } from "next/navigation";

import { TimelineList } from "@/components/memory/timeline-list";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { MemoryRecord } from "@/types/memory";

export default async function TimelinePage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("memories")
    .select("*")
    .order("memory_date", { ascending: false })
    .order("created_at", { ascending: false });

  return <TimelineList initialMemories={(data ?? []) as MemoryRecord[]} />;
}
