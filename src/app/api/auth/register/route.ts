import { NextResponse } from "next/server";

import { formatAuthError } from "@/lib/auth/errors";
import { registerSchema } from "@/lib/auth/schemas";
import { hasPublicEnv } from "@/lib/env";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (!hasPublicEnv()) {
    return NextResponse.json(
      { error: "Deployment is missing Supabase environment variables." },
      { status: 503 }
    );
  }

  try {
    const payload = registerSchema.parse(await request.json());
    const supabase = await getSupabaseServerClient();

    const signUpResult = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {}
    });

    if (signUpResult.error) {
      return NextResponse.json(
        { error: mapAuthError(signUpResult.error.message) },
        { status: 400 }
      );
    }

    const signInResult = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password
    });

    if (signInResult.error) {
      return NextResponse.json(
        { error: mapAuthError(signInResult.error.message) },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: formatAuthError(error, "注册失败") },
      { status: 400 }
    );
  }
}

function mapAuthError(message: string) {
  if (message.includes("already registered")) {
    return "该邮箱已被注册";
  }

  return "注册失败，请稍后重试";
}
