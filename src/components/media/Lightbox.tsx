"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";

import { CloseIcon } from "@/components/ui/Icons";
import type { ImageAsset } from "@/types/content";

/**
 * Fullscreen photo viewer.
 *
 * Open it with the `useLightbox` hook below rather than rendering it directly —
 * the hook owns the open index and hands back the element to place in the tree.
 */
function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: ImageAsset[];
  index: number;
  onClose: () => void;
  onIndex: (next: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const count = images.length;

  const go = useCallback(
    (delta: number) => onIndex((index + delta + count) % count),
    [count, index, onIndex],
  );

  useEffect(() => {
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight" && count > 1) {
        go(1);
      } else if (event.key === "ArrowLeft" && count > 1) {
        go(-1);
      } else if (event.key === "Tab") {
        // Keep focus inside the dialog.
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled])",
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [count, go, onClose]);

  const image = images[index];
  if (!image) return null;

  /**
   * Portalled to <body> deliberately. Cards that open the viewer carry a
   * transform (hover lift), and a transformed ancestor becomes
   * the containing block for position:fixed — which would trap this inside
   * the card instead of covering the screen.
   */
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${count}`}
      className="fixed inset-0 z-[100] flex flex-col bg-iron-950/95 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (start == null || end == null || count < 2) return;
        const delta = end - start;
        if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
      }}
    >
      <div
        ref={panelRef}
        className="flex h-full flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        {/* ------------------------------------------------------- top bar */}
        <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <p className="text-sm font-semibold tracking-[0.14em] text-concrete-300 uppercase">
            {count > 1 ? `${index + 1} / ${count}` : "Photo"}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-concrete-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <CloseIcon className="h-6 w-6" />
            <span className="sr-only">Close photo viewer</span>
          </button>
        </div>

        {/* -------------------------------------------------------- image */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-2 sm:px-6">
          <div className="relative h-full w-full">
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute top-1/2 left-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-iron-950/70 text-white transition-colors hover:bg-amber-500 hover:text-iron-950 sm:left-4"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous photo</span>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute top-1/2 right-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-iron-950/70 text-white transition-colors hover:bg-amber-500 hover:text-iron-950 sm:right-4"
              >
                <ChevronLeft className="h-6 w-6 rotate-180" />
                <span className="sr-only">Next photo</span>
              </button>
            </>
          ) : null}
        </div>

        {/* ------------------------------------------------------- caption */}
        <div className="shrink-0 px-4 pt-2 pb-6 text-center sm:px-6">
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-concrete-300">
            {image.caption ?? image.alt}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable={false}
      className={className}
    >
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

/**
 * Owns the viewer state. `open(i)` shows the photo at that index; render
 * `element` anywhere in the component and it appears when open.
 */
export function useLightbox(images: ImageAsset[]) {
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((next: number) => setIndex(next), []);
  const close = useCallback(() => setIndex(null), []);

  const element =
    index === null ? null : (
      <Lightbox
        images={images}
        index={index}
        onClose={close}
        onIndex={setIndex}
      />
    );

  return { open, close, element, isOpen: index !== null };
}
