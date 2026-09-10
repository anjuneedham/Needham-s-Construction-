import Link from "next/link";

import { cn } from "@/lib/utils";
import { ArrowRightIcon, ServiceGlyph } from "@/components/ui/Icons";
import { MediaFrame } from "@/components/media/MediaFrame";
import { SmartImage } from "@/components/media/SmartImage";
import type { Service } from "@/types/content";

/**
 * The service cards used on the home page and the services index.
 * Each card carries an image slot that fills in from `service.images[0]`.
 */
export function ServiceCard({ service }: { service: Service }) {
  const cover = service.images[0];

  return (
    <article className="reveal group flex flex-col bg-white ring-1 ring-concrete-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        {cover ? (
          <SmartImage
            image={cover}
            fallbackLabel={service.name}
            ratio="3/2"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <MediaFrame
            label={`${service.name} work`}
            ratio="3/2"
            note="Photography to be added"
          />
        )}
        <span
          aria-hidden
          className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center bg-amber-500 text-iron-950 shadow-md"
        >
          <ServiceGlyph icon={service.icon} className="h-6 w-6" />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 pt-10 pb-6">
        <h3 className="text-xl font-bold text-iron-900">{service.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-iron-600">
          {service.summary}
        </p>
        <Link
          href={`/services/${service.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-iron-900 transition-colors hover:text-amber-700"
        >
          View Service
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          <span className="sr-only">— {service.name}</span>
        </Link>
      </div>
    </article>
  );
}

export function ServicesGrid({
  services,
  className,
}: {
  services: Service[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}
