import { redirect } from "next/navigation";

import { BookCover } from "@/components/book/book-cover";
import { requireUser } from "@/lib/auth/session";
import { hasPublicEnv } from "@/lib/env";

export default async function BookPage() {
  if (!hasPublicEnv()) {
    redirect("/");
  }

  const user = await requireUser();
  const username = user.email?.split("@")[0] ?? "archive";

  return <BookCover username={username} />;
}
