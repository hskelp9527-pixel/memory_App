const USERNAME_PATTERN = /^[a-z0-9._-]+$/;

export function normalizeUsername(input: string): string {
  const normalized = input.trim().toLowerCase();

  if (!normalized) {
    throw new Error("用户名不能为空");
  }

  if (!USERNAME_PATTERN.test(normalized)) {
    throw new Error("用户名只能包含字母、数字、点、下划线和短横线");
  }

  return normalized;
}

export function usernameToEmail(input: string): string {
  return `${normalizeUsername(input)}@example.com`;
}
