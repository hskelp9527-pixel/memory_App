"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { PrimaryButton } from "@/components/ui/primary-button";
import { TextField } from "@/components/ui/text-field";

type NewMemoryFormProps = {
  onCreated: () => Promise<void>;
  onClose: () => void;
};

export function NewMemoryForm({ onCreated, onClose }: NewMemoryFormProps) {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewType, setPreviewType] = useState<"image" | "video" | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function openPicker() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setPreviewUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }

      return URL.createObjectURL(file);
    });
    setPreviewType(file.type.startsWith("video/") ? "video" : "image");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/memories", {
      method: "POST",
      body: formData
    });

    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(payload.error ?? "保存失败");
      setIsPending(false);
      return;
    }

    form.reset();
    await onCreated();
    onClose();
  }

  return (
    <form className="grid gap-3 md:grid-cols-[0.92fr_1.08fr] md:gap-8" onSubmit={handleSubmit}>
      <div className="flex items-start justify-center md:border-r md:border-dashed md:border-primary/15 md:pr-8">
        <input
          accept="image/*,video/*"
          className="hidden"
          name="media"
          onChange={handleFileChange}
          ref={fileInputRef}
          required
          type="file"
        />
        <button
          className="group relative mt-0.5 flex aspect-[4/5] w-[34%] max-w-[5.6rem] items-center justify-center overflow-hidden border border-[#dccbb4] bg-[linear-gradient(180deg,#fffdf9,#f2e4d0)] shadow-[0_7px_15px_rgba(44,38,33,0.10)] transition duration-500 hover:-translate-y-1 hover:rotate-[1deg] hover:shadow-[8px_12px_0_rgba(44,38,33,0.12)] sm:w-[42%] sm:max-w-[8.4rem] md:mt-2 md:w-full md:max-w-[18rem]"
          onClick={openPicker}
          type="button"
        >
          <div className="absolute left-1/2 top-0 h-4 w-12 -translate-x-1/2 -translate-y-1/2 rotate-[-5deg] border-x border-black/5 bg-[#d2c4a7cc] sm:h-6 sm:w-20 md:h-7 md:w-24" />
          <div className="pointer-events-none absolute inset-[5px] border border-primary/8 sm:inset-[8px] md:inset-[10px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),_transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.22),transparent_42%)]" />
          <div className="pointer-events-none absolute -left-1 top-5 h-8 w-8 rounded-full border border-primary/8 opacity-60 sm:top-6 sm:h-12 sm:w-12" />
          {previewUrl && previewType === "image" ? (
            <Image
              alt="记忆预览图"
              className="object-cover sepia-[0.12] saturate-[0.92]"
              fill
              src={previewUrl}
              unoptimized
            />
          ) : null}
          {previewUrl && previewType === "video" ? (
            <video className="h-full w-full object-cover" muted playsInline src={previewUrl} />
          ) : null}
          {!previewUrl ? (
            <>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.5),_transparent_45%)] opacity-70 transition group-hover:opacity-100" />
              <div className="pointer-events-none absolute bottom-1 right-1 rounded-full border border-primary/10 bg-white/55 px-1.5 py-0.5 font-label text-[6px] uppercase tracking-[0.08em] text-primary/40 transition group-hover:text-primary/60 sm:bottom-2 sm:right-2 sm:px-2.5 sm:py-1 sm:text-[8px] md:bottom-3 md:right-3 md:px-3 md:text-[10px]">
                添加照片
              </div>
            </>
          ) : null}
        </button>
      </div>
      <div className="space-y-2 rounded-sm bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] sm:space-y-4 md:space-y-5">
        <TextField label="标题" name="title" placeholder="这一页的名字" required />
        <div className="grid gap-2.5 md:grid-cols-2 md:gap-4">
          <TextField label="日期" name="memoryDate" required type="date" />
          <TextField label="具体时间" name="specificTime" type="time" />
        </div>
        <TextField label="地点" name="location" placeholder="京都 / 杭州 / 家中" />
        <TextField label="一句话配文" name="caption" placeholder="写在拍立得底部的话" required />
        <label className="block">
          <span className="font-hand text-[1.65rem] leading-none text-primary/80 sm:text-3xl">详细正文</span>
          <textarea
            className="mt-1.5 min-h-28 w-full rounded-sm border border-primary/15 bg-[linear-gradient(180deg,#fcfaf7,#f7efe4)] px-3 py-3 text-[0.95rem] text-primary outline-none sm:mt-2 sm:min-h-40 sm:px-4 sm:py-4 sm:text-base"
            name="content"
            placeholder="把这一刻完整写下来……"
            required
          />
        </label>
        {error ? <p className="rounded-full bg-secondary/8 px-3 py-2 text-sm text-secondary">{error}</p> : null}
        <div className="flex items-center justify-end gap-2 pt-1 sm:gap-3 sm:pt-2">
          <button className="px-3 py-1.5 text-xs text-primary/70 sm:px-4 sm:py-2 sm:text-sm" onClick={onClose} type="button">
            取消
          </button>
          <PrimaryButton disabled={isPending} type="submit">
            {isPending ? "存档中..." : "存入回忆"}
          </PrimaryButton>
        </div>
      </div>
    </form>
  );
}
