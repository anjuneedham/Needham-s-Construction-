/**
 * Structured data (JSON-LD) for Google.
 *
 * Only fields that are actually filled in are emitted — no invented address,
 * hours, coordinates, ratings or founding date ever reaches the markup. As
 * you complete `src/data/contact.ts` and `src/data/company.ts`, the
 * LocalBusiness record fills itself out and the listing gets richer.
 */

import { company } from "@/data/company";
import { contact } from "@/data/contact";
import { services } from "@/data/services";
import { socials } from "@/data/social";
import { siteUrl } from "@/data/site";

const dayName: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

type Json = Record<string, unknown>;

function compact(input: Json): Json {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => {
      if (value === null || value === undefined || value === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;
      if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.keys(value as Json).length === 0
      ) {
        return false;
      }
      return true;
    }),
  );
}

export function localBusinessSchema(): Json {
  const { address, geo, hours, phone, email, serviceAreas } = contact;

  const postalAddress = compact({
    "@type": "PostalAddress",
    streetAddress: address.street,
    addressLocality: address.city,
    addressRegion: address.parish,
    postalCode: address.postalCode,
    addressCountry: address.countryCode,
  });

  const geoCoordinates =
    geo.latitude !== null && geo.longitude !== null
      ? {
          "@type": "GeoCoordinates",
          latitude: geo.latitude,
          longitude: geo.longitude,
        }
      : undefined;

  const openingHours = hours
    .filter((entry) => entry.opens && entry.closes)
    .map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayName[entry.day.toLowerCase()] ?? entry.day,
      opens: entry.opens,
      closes: entry.closes,
    }));

  return compact({
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": `${siteUrl}/#business`,
    name: company.name,
    legalName: company.legalName,
    description: company.positioning,
    url: siteUrl,
    // Only present once the address has been filled in.
    address: Object.keys(postalAddress).length > 1 ? postalAddress : undefined,
    geo: geoCoordinates,
    telephone: phone.e164 ? `+${phone.e164.replace(/\D/g, "")}` : undefined,
    email: email || undefined,
    foundingDate: company.foundedYear || undefined,
    logo: company.logo ? `${siteUrl}${company.logo}` : undefined,
    sameAs: socials.filter((s) => s.url).map((s) => s.url),
    openingHoursSpecification: openingHours,
    areaServed:
      serviceAreas.length > 0
        ? serviceAreas.map((area) => ({
            "@type": "AdministrativeArea",
            name: area,
          }))
        : [{ "@type": "Country", name: "Jamaica" }],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction and home services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.summary,
          url: `${siteUrl}/services/${service.slug}`,
        },
      })),
    },
  });
}

export function serviceSchema(slug: string): Json | null {
  const service = services.find((entry) => entry.slug === slug);
  if (!service) return null;

  return compact({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    url: `${siteUrl}/services/${service.slug}`,
    serviceType: service.name,
    areaServed:
      contact.serviceAreas.length > 0
        ? contact.serviceAreas.join(", ")
        : "Jamaica",
    provider: { "@id": `${siteUrl}/#business` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} services`,
      itemListElement: service.categories.map((category) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: category.title,
          description: category.description,
        },
      })),
    },
  });
}

export function breadcrumbSchema(
  trail: Array<{ name: string; path: string }>,
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: company.name,
    description: company.positioning,
    publisher: { "@id": `${siteUrl}/#business` },
    inLanguage: "en-JM",
  };
}
