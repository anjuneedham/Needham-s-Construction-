import type { SVGProps } from "react";

import type { ServiceIcon, SocialPlatform } from "@/types/content";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
};

/* ------------------------------------------------------------- services */

export function TilingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8.5 8.5 3 21 15.5 15.5 21z" />
      <path d="M6.2 11.8 11.8 6.2M9.4 15l5.6-5.6M12.6 18.2l5.6-5.6" />
    </svg>
  );
}

export function PlumbingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5h4v5a4 4 0 0 0 4 4h3" />
      <rect x="2.5" y="3" width="3" height="4" rx="0.5" />
      <path d="M15 11.5h4.5v5H15z" />
      <path d="M17.25 16.5V21" />
      <path d="M15 21h4.5" />
    </svg>
  );
}

export function MasonryIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5" width="19" height="4.5" rx="0.5" />
      <rect x="2.5" y="9.5" width="19" height="4.5" rx="0.5" />
      <rect x="2.5" y="14" width="19" height="4.5" rx="0.5" />
      <path d="M9 5v4.5M15.5 5v4.5M6 14v4.5M12.5 14v4.5M19 14v4.5M12 9.5V14" />
    </svg>
  );
}

export function ElectricalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 2.5 5 13.5h5.5L9.5 21.5 19 10h-5.5z" />
    </svg>
  );
}

export function ConstructionIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V9.5l7-5 7 5V21" />
      <path d="M9.5 21v-5.5h5V21" />
      <path d="M9.5 11h5" />
    </svg>
  );
}

const serviceIcons: Record<ServiceIcon, (props: IconProps) => React.ReactElement> = {
  tiling: TilingIcon,
  plumbing: PlumbingIcon,
  masonry: MasonryIcon,
  electrical: ElectricalIcon,
  construction: ConstructionIcon,
};

export function ServiceGlyph({
  icon,
  ...props
}: IconProps & { icon: ServiceIcon }) {
  const Glyph = serviceIcons[icon] ?? ConstructionIcon;
  return <Glyph {...props} />;
}

/* --------------------------------------------------------------- social */

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.92 3.77-3.92 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.9h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.42.56.21.96.47 1.38.89.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.05-.41-2.22C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.89.42-.17 1.05-.37 2.22-.42C8.42 2.17 8.8 2.16 12 2.16Zm0 2.16c-3.15 0-3.52.01-4.75.07-1.15.05-1.77.24-2.18.4-.55.21-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.6-.07 4.8s.01 3.56.07 4.8c.05 1.15.24 1.77.4 2.18.22.55.47.94.88 1.35.41.41.8.66 1.35.88.41.16 1.03.35 2.18.4 1.23.06 1.6.07 4.75.07s3.52-.01 4.75-.07c1.15-.05 1.77-.24 2.18-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.6.07-4.8s-.01-3.56-.07-4.8c-.05-1.15-.24-1.77-.4-2.18a3.66 3.66 0 0 0-.88-1.35 3.66 3.66 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.23-.06-1.6-.07-4.75-.07Zm0 3.68a5.99 5.99 0 1 1 0 11.98 5.99 5.99 0 0 1 0-11.98Zm0 9.88a3.89 3.89 0 1 0 0-7.78 3.89 3.89 0 0 0 0 7.78Zm7.63-10.12a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0Z" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M16.6 2h-3.1v13.34a2.55 2.55 0 1 1-2.19-2.52V9.65a5.7 5.7 0 1 0 5.29 5.69V8.83a6.9 6.9 0 0 0 4.06 1.3V7.02a3.9 3.9 0 0 1-2.86-1.26A3.9 3.9 0 0 1 16.6 2Z" />
    </svg>
  );
}

const socialIcons: Record<SocialPlatform, (props: IconProps) => React.ReactElement> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
};

export function SocialGlyph({
  platform,
  ...props
}: IconProps & { platform: SocialPlatform }) {
  const Glyph = socialIcons[platform];
  return <Glyph {...props} />;
}

/* -------------------------------------------------------------- utility */

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2.1 22l5.36-1.4a9.8 9.8 0 0 0 4.58 1.16h.01c5.43 0 9.85-4.42 9.85-9.86A9.8 9.8 0 0 0 19 4.88 9.8 9.8 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.09.81.83-3.02-.2-.31a8.13 8.13 0 0 1-1.25-4.32c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.86 5.8 2.41a8.14 8.14 0 0 1 2.4 5.8c0 4.52-3.68 8.15-8.22 8.15Zm4.5-6.1c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.63 4.18 3.69.58.25 1.04.4 1.4.51.59.19 1.12.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.57.21-1.06.15-1.16-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
      <path d="m3 6 9 6.5L21 6" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11.14-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

export function ImageIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <circle cx="8.75" cy="9.75" r="1.6" />
      <path d="m3.5 17 4.9-4.6a1.6 1.6 0 0 1 2.2 0l3.3 3.1M13.4 14.2l2-1.9a1.6 1.6 0 0 1 2.2 0l2.9 2.7" />
    </svg>
  );
}

export function VideoIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5.5" width="13" height="13" rx="1.5" />
      <path d="m15.5 12 6-3.5v7z" />
    </svg>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" />
    </svg>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 5.5h18M6.5 12h11M10 18.5h4" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5M12 16h.01" />
    </svg>
  );
}

export function QuoteMarkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M9.4 5C6.2 6.6 4.4 9.3 4.4 12.9V19h6.4v-6.4H7.7c0-2.3.9-3.9 2.8-5.1L9.4 5Zm9.5 0c-3.2 1.6-5 4.3-5 7.9V19h6.4v-6.4h-3.1c0-2.3.9-3.9 2.8-5.1L18.9 5Z" />
    </svg>
  );
}
