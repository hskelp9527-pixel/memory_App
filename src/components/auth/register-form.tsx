"use client";

import Link from "next/link";
import { useState } from "react";

import { PrimaryButton } from "@/components/ui/primary-button";
import { TextField } from "@/components/ui/text-field";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, confirmPassword })
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "注册失败");
      setIsPending(false);
      return;
    }

    window.location.assign("/book");
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <TextField
        autoComplete="email"
        label="邮箱 / Email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        type="email"
        value={email}
      />
      <TextField
        autoComplete="new-password"
        label="密码 / Cypher"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="档案锁钥"
        type="password"
        value={password}
      />
      <TextField
        autoComplete="new-password"
        label="确认密码 / Re-verify"
        onChange={(event) => setConfirmPassword(event.target.value)}
        placeholder="再次确认钥扣"
        type="password"
        value={confirmPassword}
      />
      {error ? <p className="text-sm text-secondary">{error}</p> : null}
      <div className="flex flex-col items-center gap-6 pt-4">
        <PrimaryButton disabled={isPending} type="submit">
          {isPending ? "创建中..." : "创建档案"}
        </PrimaryButton>
        <Link className="text-sm italic text-primary/70 underline-offset-4 hover:underline" href="/login">
          已有档案？返回登录
        </Link>
      </div>
    </form>
  );
}
