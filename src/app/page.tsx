import Link from "next/link";
import { redirect } from "next/navigation";

import { hasPublicEnv } from "@/lib/env";
import { getOptionalUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  if (!hasPublicEnv()) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#f5efe6,#efe1cd)] px-6 py-16 text-primary">
        <div className="mx-auto max-w-3xl rounded-sm border border-primary/10 bg-white/70 p-8 shadow-paper">
          <p className="font-label text-xs uppercase tracking-[0.36em] text-primary/50">
            Memory Vine Deployment
          </p>
          <h1 className="mt-4 font-headline text-4xl">站点已部署，但环境变量还没完成</h1>
          <p className="mt-4 text-base leading-7 text-primary/75">
            这个项目现在是 Next.js 应用，不再是纯静态页面。Vercel 上至少需要配置
            `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`，
            首页才能继续完成登录和数据读取。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="rounded-full border border-primary/15 bg-primary px-5 py-2 text-sm text-white"
              href="/login"
            >
              打开登录页
            </Link>
            <Link
              className="rounded-full border border-primary/15 bg-white/70 px-5 py-2 text-sm text-primary"
              href="https://vercel.com/dashboard"
            >
              前往 Vercel 配置
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const user = await getOptionalUser();

  if (user) {
    redirect("/book");
  }

  redirect("/login");
}
