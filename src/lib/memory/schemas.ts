import { z } from "zod";

export const createMemorySchema = z.object({
  title: z.string().trim().min(1, "请输入标题"),
  memoryDate: z.string().trim().min(1, "请选择日期"),
  specificTime: z.string().trim().optional().default(""),
  location: z.string().trim().optional().default(""),
  caption: z.string().trim().min(1, "请输入一句话配文"),
  content: z.string().trim().min(1, "请输入详细正文")
});

type UploadLike = {
  name: string;
  size: number;
  type: string;
};

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export function validateMediaFile(file: UploadLike) {
  if (!file.name || file.size <= 0) {
    throw new Error("请上传媒体文件");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("媒体文件不能超过 50MB");
  }

  if (file.type.startsWith("image/")) {
    return { mediaType: "image" as const };
  }

  if (file.type.startsWith("video/")) {
    return { mediaType: "video" as const };
  }

  throw new Error("仅支持图片或视频文件");
}
