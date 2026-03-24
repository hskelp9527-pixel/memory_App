import { redirect } from "next/navigation";

import { hasPublicEnv } from "@/lib/env";
import { getSupabaseServerComponentClient } from "@/lib/supabase/server";

export async function requireUser() {
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

  return user;
}

export async function getOptionalUser() {
  if (!hasPublicEnv()) {
    return null;
  }

  const supabase = await getSupabaseServerComponentClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}
