"use client";

import Link from "next/link";
import { useState } from "react";

import { PrimaryButton } from "@/components/ui/primary-button";
import { TextField } from "@/components/ui/text-field";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "登录失败");
      setIsPending(false);
      return;
    }

    window.location.assign("/book");
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <TextField
        autoComplete="email"
        label="邮箱"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        type="email"
        value={email}
      />
      <TextField
        autoComplete="current-password"
        label="密码"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="••••••••"
        type="password"
        value={password}
      />
      {error ? <p className="text-sm text-secondary">{error}</p> : null}
      <div className="flex flex-col items-center gap-6 pt-4">
        <PrimaryButton disabled={isPending} type="submit">
          {isPending ? "开启中..." : "开启回忆"}
        </PrimaryButton>
        <Link className="text-sm italic text-primary/70 underline-offset-4 hover:underline" href="/register">
          还没有档案？去注册
        </Link>
      </div>
    </form>
  );
}
