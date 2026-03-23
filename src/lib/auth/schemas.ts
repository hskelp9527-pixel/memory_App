import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "请输入邮箱").email("请输入有效的邮箱地址"),
  password: z.string().min(6, "密码至少 6 位")
});

export const registerSchema = loginSchema.extend({
  confirmPassword: z.string().min(6, "请再次输入密码")
}).superRefine((value, ctx) => {
  if (value.password !== value.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "两次输入的密码不一致",
      path: ["confirmPassword"]
    });
  }
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
