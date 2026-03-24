import { NextResponse } from "next/server";

import { hasPublicEnv } from "@/lib/env";
import { createMemoryRequestSchema } from "@/lib/memory/schemas";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  if (!hasPublicEnv()) {
    return NextResponse.json(
      { error: "Deployment is missing Supabase environment variables." },
      { status: 503 }
    );
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .order("memory_date", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Failed to load memories." }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  if (!hasPublicEnv()) {
    return NextResponse.json(
      { error: "Deployment is missing Supabase environment variables." },
      { status: 503 }
    );
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
  }

  try {
    const payload = createMemoryRequestSchema.parse(await request.json());
    const insertResult = await supabase.from("memories").insert({
      user_id: user.id,
      title: payload.title,
      memory_date: payload.memoryDate,
      specific_time: payload.specificTime || null,
      location: payload.location || null,
      media_url: payload.mediaUrl,
      media_path: payload.mediaPath,
      media_type: payload.mediaType,
      media_storage_mode: payload.mediaStorageMode,
      media_preview_url: payload.mediaPreviewUrl || null,
      media_preview_path: payload.mediaPreviewPath || null,
      media_original_path: payload.mediaOriginalPath || null,
      media_original_size: payload.mediaOriginalSize || null,
      media_original_mime_type: payload.mediaOriginalMimeType || null,
      media_chunk_count: payload.mediaChunkCount || null,
      media_chunk_size: payload.mediaChunkSize || null,
      media_width: payload.mediaWidth || null,
      media_height: payload.mediaHeight || null,
      caption: payload.caption,
      content: payload.content
    }).select("*").single();

    if (insertResult.error) {
      return NextResponse.json({ error: "Failed to save memory." }, { status: 400 });
    }

    return NextResponse.json({ data: insertResult.data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save memory." },
      { status: 400 }
    );
  }
}
