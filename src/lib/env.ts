function getEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

function requireEnv(name: string): string {
  const value = getEnv(name);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function hasPublicEnv() {
  return Boolean(
    getEnv("NEXT_PUBLIC_SUPABASE_URL") &&
    getEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")
  );
}

export function getPublicEnvOrNull() {
  if (!hasPublicEnv()) {
    return null;
  }

  return {
    supabaseUrl: getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    supabasePublishableKey: getEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")
  };
}

export function getPublicEnv() {
  const env = getPublicEnvOrNull();

  if (env) {
    return env;
  }

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
