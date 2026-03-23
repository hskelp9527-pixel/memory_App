import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { createMemorySchema, validateMediaFile } from "@/lib/memory/schemas";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .order("memory_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "获取记忆失败" }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("media");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "请上传媒体文件" }, { status: 400 });
    }

    const validatedFields = createMemorySchema.parse({
      title: formData.get("title"),
      memoryDate: formData.get("memoryDate"),
      specificTime: formData.get("specificTime"),
      location: formData.get("location"),
      caption: formData.get("caption"),
      content: formData.get("content")
    });

    const { mediaType } = validateMediaFile(file);
    const extension = file.name.includes(".") ? file.name.split(".").pop() : mediaType;
    const path = `${user.id}/${randomUUID()}.${extension}`;

    const uploadResult = await supabase.storage
      .from("memories-media")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false
      });

    if (uploadResult.error) {
      return NextResponse.json({ error: "媒体上传失败" }, { status: 400 });
    }

    const { data: publicUrlData } = supabase.storage
      .from("memories-media")
      .getPublicUrl(path);

    const insertResult = await supabase.from("memories").insert({
      user_id: user.id,
      title: validatedFields.title,
      memory_date: validatedFields.memoryDate,
      specific_time: validatedFields.specificTime || null,
      location: validatedFields.location || null,
      media_url: publicUrlData.publicUrl,
      media_path: path,
      media_type: mediaType,
      caption: validatedFields.caption,
      content: validatedFields.content
    }).select("*").single();

    if (insertResult.error) {
      return NextResponse.json({ error: "记忆保存失败" }, { status: 400 });
    }

    return NextResponse.json({ data: insertResult.data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "记忆保存失败" },
      { status: 400 }
    );
  }
}
