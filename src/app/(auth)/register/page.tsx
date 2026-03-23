import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthShell subtitle="Create your Archive" title="开启记忆之书">
      <RegisterForm />
    </AuthShell>
  );
}
