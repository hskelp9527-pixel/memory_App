import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthShell subtitle="青藤记忆" title="Memory Vine">
      <LoginForm />
    </AuthShell>
  );
}
