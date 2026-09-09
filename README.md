# Needham's Construction — Website

The company website for **Needham's Construction**, a Jamaican construction and
home-services company: tiling, plumbing, masonry, electrical and general
construction.

Built with **Next.js 15 (App Router)**, **TypeScript** and **Tailwind CSS 4**.
Every page is statically generated, so the site is fast and cheap to host.

---

## Before you publish

Two things to do. Both take a minute and neither needs a developer.

1. **Add your phone number** — `src/data/contact.ts`.
   Every "Call Now" button, `tel:` link, WhatsApp button, footer entry and the
   mobile contact bar switch on automatically the moment it's filled in. Until
   then the site simply doesn't show a number — it never shows a fake one.

2. **Switch on quote-form delivery** — set `QUOTE_WEBHOOK_URL` *or*
   `RESEND_API_KEY` + `QUOTE_TO_EMAIL` in your hosting environment
   (see `.env.example`). Until one is set, the form validates the request and
   then hands it off to WhatsApp or email instead of silently losing it.

Also worth doing early: set `NEXT_PUBLIC_SITE_URL` to the real domain, and
paste your social profile URLs into `src/data/social.ts`.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

---

## Where the content lives

Everything a visitor reads comes from `src/data/`. You should almost never need
to open a component to change the site.

| File | What it controls |
| --- | --- |
| `src/data/company.ts` | Company name, tagline, About copy, "why choose us" values, optional stats/credentials |
| `src/data/contact.ts` | Phone, WhatsApp, email, service areas, address, opening hours, map |
| `src/data/social.ts` | Facebook, Instagram and TikTok profile URLs |
| `src/data/services.ts` | The five service pages — copy, categories, process, SEO |
| `src/data/projects.ts` | The portfolio: photos, videos, before/after, locations |
| `src/data/testimonials.ts` | Customer reviews |
| `src/data/home.ts` | Home page hero image/video, About photo, "See Our Work" videos |
| `src/data/site.ts` | Domain, SEO defaults, analytics IDs |
| `src/data/navigation.ts` | Header and footer link structure |

Every field is typed (`src/types/content.ts`), so your editor tells you if
something's missing and the build fails rather than shipping a broken page.

---

## How to do the common jobs

### Add your phone number and WhatsApp

`src/data/contact.ts`:

```ts
phone: {
  display: "(876) 555 0123",   // how it appears on screen
  e164: "18765550123",         // digits only, with country code
},
whatsapp: {
  number: "18765550123",       // usually the same number
  defaultMessage: "Hi Needham's Construction, I'd like to ask about a project.",
},
```

That's it. The header, hero, footer, contact page, every closing call-to-action
and the mobile Call | WhatsApp | Quote bar all pick it up.

### Add a social profile

`src/data/social.ts` — paste the real URL over the empty string:

```ts
{ platform: "instagram", label: "Instagram",
  url: "https://www.instagram.com/needhamsconstruction",
  handle: "needhamsconstruction" },
```

A profile with no URL shows a quiet "coming soon" state rather than a dead link.

### Add a project (with photos and video)

1. Drop the photos into `public/media/projects/`.
2. Add an entry to `projects` in `src/data/projects.ts` — there's a fully
   commented example at the top of the file.

The project then appears on `/projects`, on its service page's gallery, and on
the home page if you set `featured: true`. Placeholders disappear on their own.

```ts
{
  slug: "kingston-bathroom-retile",
  title: "Bathroom re-tile and re-fit",
  category: "tiling",              // must match a service slug
  location: "Kingston",
  description: "Full strip-out and re-tile of a main bathroom…",
  images: [{ src: "/media/projects/kb-01.jpg", alt: "Fully tiled bathroom…" }],
  videos: [{ provider: "youtube", src: "VIDEO_ID", title: "Walkthrough" }],
  date: "2026-04-18",
  featured: true,
}
```

### Add a video

Videos work the same everywhere — home page, service pages, projects:

```ts
{ provider: "youtube",   src: "VIDEO_ID_OR_URL", title: "…" }
{ provider: "file",      src: "/media/projects/clip.mp4", title: "…" }
{ provider: "tiktok",    src: "https://www.tiktok.com/@you/video/123", title: "…" }
{ provider: "instagram", src: "https://www.instagram.com/p/abc/", title: "…" }
```

Nothing heavy loads on page view: local files use `preload="none"`, YouTube
shows a light poster until someone presses play, and TikTok/Instagram render as
a card that opens the post — no third-party tracking scripts are loaded.

### Add a hero image or video

`src/data/home.ts` — set `heroVideo` (takes priority) or `heroImage`.

### Add a testimonial

`src/data/testimonials.ts`. The section is hidden entirely while the list is
empty, so there's never a "no reviews yet" message on the site.

### Add a whole new service

Copy any block in `src/data/services.ts`, change the `slug`, `name` and copy.
It appears automatically in the header dropdown, the home page grid, the
services index, the footer, the sitemap and at `/services/<slug>`. No new files.

### Add a service area

`src/data/contact.ts` → `serviceAreas: ["Kingston", "St. Andrew"]`. With the
array empty the site says "Serving clients across Jamaica"; fill it in and the
areas are listed and added to the Google structured data.

---

## Media

Real photographs and videos go in `public/media/`:

```
public/media/projects/    project photos and clips
public/media/services/    service page photography
public/media/company/     logo, team photo, hero image
```

Until real media exists, every image and video area shows a **designed
placeholder frame** that reserves the exact space the final asset will occupy.
Nothing on this site uses stock photography of other people's work, and nothing
shifts around when you swap a placeholder for a real photo.

Always fill in `alt` — it's required by the types, it's read aloud to visitors
using a screen reader, and Google uses it.

---

## SEO

- Unique `<title>`, meta description, canonical URL and Open Graph tags on
  every page — built by `src/lib/seo.ts`.
- One `<h1>` per page with a logical `h2`/`h3` structure underneath.
- `sitemap.xml` and `robots.txt` are generated from the content files, so a new
  service is listed the moment you add it.
- A generated social-share card at `/opengraph-image`. To replace it with a
  photograph later, drop `opengraph-image.jpg` into `src/app/`.
- **Structured data** (`src/lib/schema.ts`) publishes a `GeneralContractor` /
  `LocalBusiness` record to Google. It only emits fields you've actually filled
  in — no invented address, hours, coordinates, founding date or reviews. The
  more of `src/data/contact.ts` you complete, the richer the search listing.

### Getting found locally

The site is ready for a Google Business Profile. When you have them, add to
`src/data/contact.ts`: the address, `geo` coordinates, and `hours`. Add
`foundedYear`, `registrationNumber` or `certifications` to
`src/data/company.ts` only if you actually hold them.

---

## Connecting a CMS or database later

The content types in `src/types/content.ts` are the contract. To move content
into Supabase, Sanity or a CMS, replace the exports in `src/data/*.ts` with
functions that fetch and return the same shapes — the components don't change.

Analytics and pixels (Google Analytics, Meta, TikTok, Search Console) are all
wired to environment variables and load only when those are set. See
`.env.example`.

---

## Project structure

```
src/
  app/                     routes, sitemap, robots, manifest, OG image
    api/quote/route.ts     quote form endpoint
    services/[slug]/       one page per entry in data/services.ts
  components/
    layout/                header, footer, mobile contact bar, social links
    ui/                    buttons, sections, headings, icons
    media/                 placeholder frames, images, video cards
    projects/              project cards, grid, empty state
    contact/               quote form, contact channels
    sections/              hero, services grid, CTAs, page hero
    seo/                   JSON-LD
  data/                    ← all editable content
  lib/                     contact links, SEO, schema, form validation
  types/                   the content model
public/media/              photos and videos
docs/                      social profile setup guide
```

---

## Deploying

The site builds to static output plus one API route, so it runs anywhere that
supports Next.js. Vercel is the simplest:

1. Push to GitHub and import the repository.
2. Add the environment variables from `.env.example`.
3. Point the domain at it.

Framework, build command and output directory are all detected automatically.
