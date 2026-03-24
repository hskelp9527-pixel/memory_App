import { redirect } from "next/navigation";

import { TimelineList } from "@/components/memory/timeline-list";
import { hasPublicEnv } from "@/lib/env";
import { getSupabaseServerComponentClient } from "@/lib/supabase/server";
import type { MemoryRecord } from "@/types/memory";

export default async function TimelinePage() {
  if (!hasPublicEnv()) {
    redirect("/");
  }

  const supabase = await getSupabaseServerComponentClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("memories")
    .select("*")
    .order("memory_date", { ascending: true })
    .order("created_at", { ascending: true });

  return <TimelineList initialMemories={(data ?? []) as MemoryRecord[]} />;
}
