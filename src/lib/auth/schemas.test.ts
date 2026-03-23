import { describe, expect, it } from "vitest";

import { loginSchema, registerSchema } from "./schemas";

describe("loginSchema", () => {
  it("要求合法邮箱和至少 6 位密码", () => {
    const invalid = loginSchema.safeParse({
      email: "bad",
      password: "123"
    });

    expect(invalid.success).toBe(false);
  });

  it("接受合法邮箱和密码", () => {
    const valid = loginSchema.safeParse({
      email: "admin@example.com",
      password: "admin01"
    });

    expect(valid.success).toBe(true);
  });
});

describe("registerSchema", () => {
  it("要求两次输入的密码一致", () => {
    const invalid = registerSchema.safeParse({
      email: "admin@example.com",
      password: "admin01",
      confirmPassword: "admin02"
    });

    expect(invalid.success).toBe(false);
  });
});
