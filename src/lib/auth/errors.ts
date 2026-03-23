import { ZodError } from "zod";

export function formatAuthError(error: unknown, fallback: string): string {
  if (error instanceof ZodError) {
    const messages = Array.from(
      new Set(
        error.issues
          .map((issue) => issue.message?.trim())
          .filter((message): message is string => Boolean(message))
      )
    );

    return messages.length > 0 ? messages.join("；") : fallback;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}
