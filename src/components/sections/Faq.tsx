"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { PlusIcon } from "@/components/ui/Icons";
import { faqs } from "@/data/faq";

/**
 * Accordion of common questions. Uses buttons and aria-expanded rather than
 * <details> so the open/close animation and single-open behaviour are
 * consistent across browsers.
 */
export function Faq({ className }: { className?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <div className={cn("divide-y divide-concrete-300 border-y border-concrete-300", className)}>
      {faqs.map((item, index) => {
        const isOpen = open === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-amber-700"
              >
                <span className="font-display text-base font-bold text-iron-900 sm:text-lg">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200",
                    isOpen
                      ? "rotate-45 bg-amber-500 text-iron-950"
                      : "bg-concrete-200 text-iron-700",
                  )}
                >
                  <PlusIcon className="h-4 w-4" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6"
            >
              <p className="max-w-2xl text-sm leading-relaxed text-iron-600 sm:text-base">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
