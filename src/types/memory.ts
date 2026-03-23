export type MemoryMediaType = "image" | "video";

export type MemoryRecord = {
  id: string;
  user_id: string;
  title: string;
  memory_date: string;
  specific_time: string | null;
  location: string | null;
  media_url: string;
  media_path: string;
  media_type: MemoryMediaType;
  caption: string;
  content: string;
  created_at: string;
};
