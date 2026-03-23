import { describe, expect, it } from "vitest";

import { createMemorySchema, validateMediaFile } from "./schemas";

describe("createMemorySchema", () => {
  it("要求标题、日期、配文和正文必填", () => {
    const result = createMemorySchema.safeParse({
      title: "",
      memoryDate: "",
      caption: "",
      content: ""
    });

    expect(result.success).toBe(false);
  });
});

describe("validateMediaFile", () => {
  it("接受图片和视频", () => {
    expect(
      validateMediaFile({
        name: "test.jpg",
        size: 1024,
        type: "image/jpeg"
      })
    ).toEqual({ mediaType: "image" });

    expect(
      validateMediaFile({
        name: "clip.mp4",
        size: 1024,
        type: "video/mp4"
      })
    ).toEqual({ mediaType: "video" });
  });

  it("拒绝不支持的文件类型", () => {
    expect(() =>
      validateMediaFile({
        name: "doc.pdf",
        size: 1024,
        type: "application/pdf"
      })
    ).toThrow(/仅支持图片或视频/);
  });
});
