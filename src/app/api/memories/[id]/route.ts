import { NextResponse } from "next/server";

import { hasPublicEnv } from "@/lib/env";
import { buildChunkObjectPath, MEMORY_MEDIA_BUCKET } from "@/lib/memory/storage";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
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

  const { id } = await context.params;
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Memory not found." }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(_request: Request, context: RouteContext) {
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

  const { id } = await context.params;
  const { data: memory, error: fetchError } = await supabase
    .from("memories")
    .select("id, media_path, media_preview_path, media_original_path, media_chunk_count")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !memory) {
    return NextResponse.json({ error: "Memory not found." }, { status: 404 });
  }

  const pathsToDelete = new Set<string>();

  if (memory.media_path) {
    pathsToDelete.add(memory.media_path);
  }

  if (memory.media_preview_path) {
    pathsToDelete.add(memory.media_preview_path);
  }

  if (memory.media_original_path && memory.media_chunk_count) {
    for (let index = 0; index < memory.media_chunk_count; index += 1) {
      pathsToDelete.add(buildChunkObjectPath(memory.media_original_path, index));
    }
  }

  if (pathsToDelete.size > 0) {
    const storageResult = await supabase.storage
      .from(MEMORY_MEDIA_BUCKET)
      .remove([...pathsToDelete]);

    if (storageResult.error) {
      return NextResponse.json({ error: "Failed to delete stored media." }, { status: 500 });
    }
  }

  const deleteResult = await supabase
    .from("memories")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (deleteResult.error) {
    return NextResponse.json({ error: "Failed to delete memory." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
