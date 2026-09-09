import Link from "next/link";

import { cn } from "@/lib/utils";
import { PhoneIcon, WhatsAppIcon, MailIcon } from "@/components/ui/Icons";
import {
  hasPhone,
  hasWhatsApp,
  phoneDisplay,
  telHref,
  whatsappHref,
} from "@/lib/contact";

/**
 * Persistent contact bar pinned to the bottom of the screen on phones.
 *
 * It shows only the channels that are actually configured: with no phone or
 * WhatsApp number set it becomes a single full-width "Request a Quote" bar,
 * and it grows to Call | WhatsApp | Quote the moment those numbers are added
 * in src/data/contact.ts.
 */
export function MobileContactBar() {
  const items = [
    hasPhone && {
      key: "call",
      href: telHref(),
      label: "Call",
      srLabel: `Call ${phoneDisplay}`,
      Icon: PhoneIcon,
      external: false,
    },
    hasWhatsApp && {
      key: "whatsapp",
      href: whatsappHref(),
      label: "WhatsApp",
      srLabel: "Message us on WhatsApp",
      Icon: WhatsAppIcon,
      external: true,
    },
  ].filter(Boolean) as Array<{
    key: string;
    href: string;
    label: string;
    srLabel: string;
    Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
    external: boolean;
  }>;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-iron-950/95 backdrop-blur-sm lg:hidden">
      <div
        className={cn(
          "mx-auto grid max-w-lg",
          items.length === 0 ? "grid-cols-1" : "grid-cols-3",
        )}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {items.map(({ key, href, label, srLabel, Icon, external }) => (
          <a
            key={key}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="flex h-16 flex-col items-center justify-center gap-1 text-concrete-200 transition-colors active:bg-white/5"
          >
            <Icon className="h-5 w-5" />
            <span className="text-[0.7rem] font-semibold tracking-wide">
              {label}
            </span>
            <span className="sr-only">{srLabel}</span>
          </a>
        ))}

        <Link
          href="/contact#quote"
          className={cn(
            "flex h-16 flex-col items-center justify-center gap-1 bg-amber-500 font-semibold text-iron-950 transition-colors active:bg-amber-600",
            items.length === 0 && "flex-row gap-2",
          )}
        >
          <MailIcon className="h-5 w-5" />
          <span className={items.length === 0 ? "text-sm" : "text-[0.7rem] tracking-wide"}>
            {items.length === 0 ? "Request a Quote" : "Quote"}
          </span>
        </Link>
      </div>
    </div>
  );
}
