"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { VintageStamp } from "@/components/ui/vintage-stamp";
import type { MemoryRecord } from "@/types/memory";

type MemoryDetailProps = {
  memory: MemoryRecord;
};

export function MemoryDetail({ memory }: MemoryDetailProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const gestureRef = useRef<{
    lastCenterX: number;
    lastCenterY: number;
    lastDistance: number;
    startScale: number;
  } | null>(null);

  function openPreview() {
    if (memory.media_type !== "image") {
      return;
    }

    setIsPreviewOpen(true);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }

  function closePreview() {
    setIsPreviewOpen(false);
    setScale(1);
    setOffset({ x: 0, y: 0 });
    gestureRef.current = null;
  }

  function getDistance(touches: React.TouchList) {
    const first = touches[0];
    const second = touches[1];

    return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
  }

  function getCenter(touches: React.TouchList) {
    const first = touches[0];
    const second = touches[1];

    return {
      x: (first.clientX + second.clientX) / 2,
      y: (first.clientY + second.clientY) / 2
    };
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    if (event.touches.length === 2) {
      const center = getCenter(event.touches);
      gestureRef.current = {
        lastCenterX: center.x,
        lastCenterY: center.y,
        lastDistance: getDistance(event.touches),
        startScale: scale
      };
    }
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (event.touches.length === 2) {
      event.preventDefault();

      const center = getCenter(event.touches);
      const distance = getDistance(event.touches);
      const gesture = gestureRef.current;

      if (!gesture) {
        gestureRef.current = {
          lastCenterX: center.x,
          lastCenterY: center.y,
          lastDistance: distance,
          startScale: scale
        };
        return;
      }

      const nextScale = Math.min(Math.max((distance / gesture.lastDistance) * gesture.startScale, 1), 3.5);
      const deltaX = center.x - gesture.lastCenterX;
      const deltaY = center.y - gesture.lastCenterY;

      setScale(nextScale);
      setOffset((current) => ({
        x: current.x + deltaX,
        y: current.y + deltaY
      }));

      gestureRef.current = {
        ...gesture,
        lastCenterX: center.x,
        lastCenterY: center.y
      };
    } else if (event.touches.length === 1 && scale > 1) {
      event.preventDefault();

      const touch = event.touches[0];
      const gesture = gestureRef.current;

      if (!gesture) {
        gestureRef.current = {
          lastCenterX: touch.clientX,
          lastCenterY: touch.clientY,
          lastDistance: 0,
          startScale: scale
        };
        return;
      }

      const deltaX = touch.clientX - gesture.lastCenterX;
      const deltaY = touch.clientY - gesture.lastCenterY;

      setOffset((current) => ({
        x: current.x + deltaX,
        y: current.y + deltaY
      }));

      gestureRef.current = {
        ...gesture,
        lastCenterX: touch.clientX,
        lastCenterY: touch.clientY
      };
    }
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (event.touches.length === 0) {
      gestureRef.current = null;
    } else if (event.touches.length === 1) {
      const touch = event.touches[0];
      gestureRef.current = {
        lastCenterX: touch.clientX,
        lastCenterY: touch.clientY,
        lastDistance: 0,
        startScale: scale
      };
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  return (
    <>
      <div className="grid gap-5 p-4 sm:gap-8 sm:p-6 md:grid-cols-[1.34fr_1fr] md:p-10">
        <div className="relative rotate-[1deg] bg-surface p-3 pb-12 shadow-paper sm:p-4 sm:pb-16">
          <div className="absolute left-4 top-0 h-5 w-20 -translate-y-1/2 -rotate-12 bg-[#d2c4a7dd] sm:left-6 sm:h-6 sm:w-24" />
          <div className="absolute right-3 top-4 rounded-full border border-primary/8 px-2.5 py-1 font-label text-[8px] uppercase tracking-[0.14em] text-primary/45 sm:right-5 sm:top-6 sm:px-3 sm:text-[9px] sm:tracking-[0.16em]">
            Memory Print
          </div>
          <button
            className="group relative block aspect-[4/3] w-full overflow-hidden border border-primary/15 bg-primary-deep text-left shadow-[0_16px_30px_rgba(44,38,33,0.12)]"
            onClick={openPreview}
            type="button"
          >
            {memory.media_type === "image" ? (
              <Image
                alt={memory.title}
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                fill
                src={memory.media_url}
              />
            ) : (
              <video className="h-full w-full object-cover" controls src={memory.media_url} />
            )}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),transparent_35%,rgba(44,38,33,0.16))]" />
            {memory.media_type === "image" ? (
              <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-[rgba(34,28,24,0.45)] px-3 py-1 font-label text-[10px] uppercase tracking-[0.16em] text-white/90">
                点击放大
              </span>
            ) : null}
          </button>
          <p className="mt-4 text-center font-hand text-[2rem] leading-tight text-primary sm:mt-5 sm:text-4xl">
            {memory.caption}
          </p>
        </div>
        <div className="rotate-[-1deg] bg-[linear-gradient(180deg,#f8f1e6,#f3eadc)] px-4 py-5 shadow-paper sm:rotate-[-2deg] sm:px-6 sm:py-8">
          <VintageStamp
            date={memory.memory_date}
            location={memory.location}
            time={memory.specific_time}
          />
          <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
            {memory.location ? (
              <span className="rounded-full bg-white/70 px-2.5 py-1 font-label text-[9px] uppercase tracking-[0.12em] text-primary/60 sm:px-3 sm:text-[10px] sm:tracking-[0.14em]">
                {memory.location}
              </span>
            ) : null}
            {memory.specific_time ? (
              <span className="rounded-full bg-white/70 px-2.5 py-1 font-label text-[9px] uppercase tracking-[0.12em] text-primary/60 sm:px-3 sm:text-[10px] sm:tracking-[0.14em]">
                {memory.specific_time}
              </span>
            ) : null}
          </div>
          <div className="mt-5 h-px bg-[linear-gradient(90deg,rgba(74,59,50,0.16),transparent)] sm:mt-6" />
          <h2 className="mt-5 text-balance font-headline text-[1.55rem] leading-[1.18] text-primary sm:mt-7 sm:text-3xl">
            {memory.title}
          </h2>
          <div className="mt-3 inline-flex items-center gap-2 text-primary/38">
            <span className="h-1.5 w-1.5 rounded-full bg-tertiary/65" />
            <span className="font-label text-[9px] uppercase tracking-[0.18em] sm:text-[10px]">记忆正文</span>
          </div>
          <div className="mt-4 rounded-sm border border-primary/8 bg-white/28 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] sm:mt-6 sm:px-4 sm:py-4">
            <div className="space-y-3 text-[15px] leading-7 text-primary/85 sm:space-y-4 sm:text-lg sm:leading-8">
              {memory.content.split(/\n+/).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isPreviewOpen && isMounted
        ? createPortal(
            <div className="fixed inset-0 z-[100] bg-[rgba(24,20,17,0.56)] backdrop-blur-[10px]">
              <button
                aria-label="关闭预览"
                className="absolute inset-0"
                onClick={closePreview}
                type="button"
              />
              <div
                className="relative z-10 flex min-h-screen items-center justify-center px-2 py-4 sm:px-5 sm:py-8"
                onClick={closePreview}
              >
                <div
                  className="mv-preview-in relative h-[66vh] w-[74vw] touch-none overflow-hidden sm:h-[64vh] sm:w-[72vw]"
                  onClick={(event) => event.stopPropagation()}
                  onTouchEnd={handleTouchEnd}
                  onTouchMove={handleTouchMove}
                  onTouchStart={handleTouchStart}
                >
                  <Image
                    alt={memory.title}
                    className="object-contain transition-transform duration-150 ease-out drop-shadow-[0_22px_40px_rgba(0,0,0,0.32)]"
                    fill
                    src={memory.media_url}
                    style={{
                      transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`
                    }}
                  />
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
