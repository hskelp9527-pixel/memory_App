import { NextResponse } from "next/server";

import { formatAuthError } from "@/lib/auth/errors";
import { loginSchema } from "@/lib/auth/schemas";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const payload = loginSchema.parse(await request.json());
    const supabase = await getSupabaseServerClient();

    const result = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password
    });

    if (result.error) {
      return NextResponse.json({ error: "邮箱或密码错误" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: formatAuthError(error, "登录失败") },
      { status: 400 }
    );
  }
}
