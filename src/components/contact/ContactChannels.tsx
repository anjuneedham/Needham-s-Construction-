import { cn } from "@/lib/utils";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { contact } from "@/data/contact";
import {
  hasEmail,
  hasPhone,
  hasWhatsApp,
  mailtoHref,
  phoneDisplay,
  serviceAreaLabel,
  telHref,
  whatsappHref,
} from "@/lib/contact";
import { SocialLinks } from "@/components/layout/SocialLinks";

interface Channel {
  key: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  pending?: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

/**
 * The contact routes, driven entirely by src/data/contact.ts.
 * A channel becomes a live link the moment its detail is filled in.
 */
export function ContactChannels() {
  const channels: Channel[] = [
    {
      key: "phone",
      label: "Phone",
      value: hasPhone ? phoneDisplay : "",
      href: hasPhone ? telHref() : undefined,
      pending: "Our direct line is being set up.",
      Icon: PhoneIcon,
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      value: hasWhatsApp ? "Message us on WhatsApp" : "",
      href: hasWhatsApp ? whatsappHref() : undefined,
      external: true,
      pending: "WhatsApp will be available shortly.",
      Icon: WhatsAppIcon,
    },
    {
      key: "email",
      label: "Email",
      value: hasEmail ? contact.email : "",
      href: hasEmail ? mailtoHref() : undefined,
      pending: "Use the quote form and we'll reply to you.",
      Icon: MailIcon,
    },
  ];

  return (
    <div className="space-y-8">
      <ul className="space-y-3">
        {channels.map(({ key, label, value, href, external, pending, Icon }) => {
          const live = Boolean(href);

          return (
            <li key={key}>
              <div
                className={cn(
                  "flex items-start gap-4 border p-5",
                  live
                    ? "border-concrete-300 bg-white"
                    : "border-concrete-200 bg-concrete-100",
                )}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-sm",
                    live
                      ? "bg-iron-900 text-amber-400"
                      : "bg-concrete-200 text-concrete-600",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <div className="min-w-0">
                  <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-iron-500 uppercase">
                    {label}
                  </p>
                  {live ? (
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="mt-1 block font-display text-lg font-bold break-all text-iron-900 transition-colors hover:text-amber-700"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm leading-relaxed text-iron-500">
                      {pending}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* ------------------------------------------------- service areas */}
      <div className="border border-concrete-300 bg-white p-5">
        <p className="flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.16em] text-iron-500 uppercase">
          <MapPinIcon className="h-4 w-4 text-amber-600" />
          Where we work
        </p>
        <p className="mt-2 text-iron-800">{serviceAreaLabel()}</p>
        {contact.serviceAreas.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {contact.serviceAreas.map((area) => (
              <li
                key={area}
                className="rounded-sm bg-concrete-100 px-2.5 py-1 text-xs font-medium text-iron-700"
              >
                {area}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* -------------------------------------------------------- hours */}
      {contact.hours.length > 0 ? (
        <div className="border border-concrete-300 bg-white p-5">
          <p className="flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.16em] text-iron-500 uppercase">
            <ClockIcon className="h-4 w-4 text-amber-600" />
            Opening hours
          </p>
          <dl className="mt-3 space-y-1.5 text-sm">
            {contact.hours.map((entry) => (
              <div key={entry.day} className="flex justify-between gap-4">
                <dt className="text-iron-600">{entry.day}</dt>
                <dd className="font-medium text-iron-900">
                  {entry.opens && entry.closes
                    ? `${entry.opens} – ${entry.closes}`
                    : "Closed"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      {/* ------------------------------------------------------- social */}
      <div className="border border-concrete-300 bg-white p-5">
        <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-iron-500 uppercase">
          Social
        </p>
        <SocialLinks tone="light" className="mt-3" />
      </div>
    </div>
  );
}
