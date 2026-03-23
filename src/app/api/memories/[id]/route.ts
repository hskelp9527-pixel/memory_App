import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  const { id } = await context.params;
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: "记忆不存在" }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  const { id } = await context.params;
  const { data: memory, error: fetchError } = await supabase
    .from("memories")
    .select("id, media_path")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !memory) {
    return NextResponse.json({ error: "记忆不存在" }, { status: 404 });
  }

  if (memory.media_path) {
    const storageResult = await supabase.storage
      .from("memories-media")
      .remove([memory.media_path]);

    if (storageResult.error) {
      return NextResponse.json({ error: "删除媒体失败" }, { status: 500 });
    }
  }

  const deleteResult = await supabase
    .from("memories")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (deleteResult.error) {
    return NextResponse.json({ error: "删除记忆失败" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
