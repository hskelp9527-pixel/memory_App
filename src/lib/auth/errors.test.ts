import { ZodError } from "zod";
import { describe, expect, it } from "vitest";

import { formatAuthError } from "./errors";

describe("formatAuthError", () => {
  it("把 Zod 校验错误格式化成用户可读提示", () => {
    const error = new ZodError([
      {
        code: "too_small",
        minimum: 1,
        type: "string",
        inclusive: true,
        exact: false,
        message: "请输入用户名",
        path: ["username"]
      },
      {
        code: "too_small",
        minimum: 6,
        type: "string",
        inclusive: true,
        exact: false,
        message: "密码至少 6 位",
        path: ["password"]
      }
    ]);

    expect(formatAuthError(error, "登录失败")).toBe("请输入用户名；密码至少 6 位");
  });

  it("普通 Error 直接返回 message", () => {
    expect(formatAuthError(new Error("用户名或密码错误"), "登录失败")).toBe(
      "用户名或密码错误"
    );
  });

  it("未知错误使用兜底文案", () => {
    expect(formatAuthError("bad", "注册失败")).toBe("注册失败");
  });
});
