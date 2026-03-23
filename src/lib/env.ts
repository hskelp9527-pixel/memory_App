function requireEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`缺少必要环境变量：${name}`);
  }

  return value;
}

export function getPublicEnv() {
  return {
    supabaseUrl: requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    supabasePublishableKey: requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")
  };
}

export function getServerEnv() {
  return {
    ...getPublicEnv(),
    supabaseSecretKey: requireEnv("SUPABASE_SECRET_KEY")
  };
}
