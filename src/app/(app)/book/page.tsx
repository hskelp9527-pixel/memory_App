import { BookCover } from "@/components/book/book-cover";
import { requireUser } from "@/lib/auth/session";

export default async function BookPage() {
  const user = await requireUser();
  const username = user.email?.split("@")[0] ?? "archive";

  return <BookCover username={username} />;
}
