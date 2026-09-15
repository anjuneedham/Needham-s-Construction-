# Social Profile Setup — Needham's Construction

A practical guide to setting up Facebook, Instagram and TikTok so the three
profiles look like one brand and point back to the website.

Nothing in here invents follower counts, reviews, awards or business history.
It is a structure to fill in with real work as you photograph and film it.

---

## 1. Names and usernames

Use the same name everywhere so people searching find the right business, and
the same handle so it's easy to say out loud and print on a van or a card.

| | Value |
| --- | --- |
| **Display name** | Needham's Construction |
| **Username / handle** | `needhamsconstruction` |
| **Fallback if taken** | `needhamsconstructionja` → `needhams.construction` |
| **Facebook Page category** | Contractor (secondary: Home Improvement) |
| **Instagram category** | Contractor |
| **TikTok category** | Home Improvement / Local Business |

Check all three platforms before committing to a handle — take the same one
everywhere, even if you don't post on that platform yet.

Once the accounts exist, paste the URLs into `src/data/social.ts` and the icons
go live across the site automatically.

---

## 2. Profile images and covers

| Asset | Size | Notes |
| --- | --- | --- |
| Profile picture | 1000 × 1000 px | The logo, centred, on the dark brand background. It renders as a small circle — no small text, no phone number. |
| Facebook cover | 1640 × 856 px | Keep anything important in the middle third; the edges crop differently on phones. |
| TikTok profile | 400 × 400 px | Same logo file works. |

Use the same profile picture on all three. It's how people recognise you in a
feed before they read the name.

Until there's a photograph of completed work worth putting on the cover, use a
clean brand cover — logo, tagline, and the phone number. A cover with the wrong
photo on it is worse than a plain one.

**Brand values for whoever makes the artwork:**

| | |
| --- | --- |
| Dark background | `#08090b` |
| Brand amber | `#e29a2e` |
| Light background | `#fbfbf9` |
| Tagline | Quality Construction. Reliable Workmanship. |

---

## 3. Bios

### Instagram (150 characters)

```
Needham's Construction 🇯🇲
Tiling · Plumbing · Masonry · General Construction
Free quotes across Jamaica
📞 [PHONE]
```

Link in bio: `https://needhamsconstruction.com`
Set the Instagram action button to **Call** or **WhatsApp** once the number is
connected.

### TikTok (80 characters)

```
Construction & home services in Jamaica 🇯🇲
Tiling · Plumbing · Masonry · General Construction
```

Link: `https://needhamsconstruction.com`

### Facebook Page — short description (255 characters)

```
Needham's Construction provides professional construction and home-improvement
services across Jamaica — tiling, plumbing, masonry, electrical and general
construction. Request a free quote.
```

### Facebook Page — full "About"

```
Needham's Construction is a Jamaican construction and home-services company.
We take on tiling, plumbing, masonry and general construction work for
homeowners, businesses and property owners across the island.

Our approach is straightforward. We look at the job properly before we quote,
explain clearly what the work involves, and agree the scope before anything
starts. On site we work carefully, keep the area clean, and finish what we
start.

SERVICES
• Tiling — floor, wall, bathroom, kitchen and outdoor tiling, and repairs
• Plumbing — installation, repairs, fixtures and water systems
• Masonry — block work, concrete, walls, foundations and repairs
• General Construction — renovations, extensions, additions and finishing work

Request a quote: https://needhamsconstruction.com/contact
```

Keep this wording matched to `src/data/company.ts` on the website. If you
change one, change the other.

---

## 4. Contact details to add to each profile

Add these to every platform, and keep them identical to
`src/data/contact.ts` on the website:

- Phone number (enable the Call button where the platform offers one)
- WhatsApp (Facebook and Instagram both support a WhatsApp button)
- Website: `https://needhamsconstruction.com`
- Service area: Jamaica, or the specific parishes you cover
- Email, if you publish one
- Opening hours, once they're settled

Facebook only: fill in **Services** — add all four as separate entries with the
same descriptions used on the website. They show in Facebook search.

---

## 5. Brand voice

How the writing should sound, on every platform:

- **Plain and direct.** Say what the job was and where. No hype, no superlatives.
- **Specific over general.** "Re-tiled a main bathroom in Kingston, floor levelled
  and walls tiled full height" beats "Another beautiful transformation!".
- **Show the work, not adjectives.** Let the photo carry it.
- **Answer questions properly.** Comments and DMs asking about price get a real
  reply pointing to a quote, not "DM us 🔥".
- **No claims you can't back.** No "20 years experience", no "certified" and no
  "#1 in Jamaica" unless it's true and provable.
- **Emoji sparingly.** One or two, if any.

**Good:**
> Kitchen splashback and floor in Portmore. Porcelain tile, cuts set out so the
> pattern runs clean around the sockets. Two days on site.

**Avoid:**
> ✨🔥 ANOTHER STUNNING TRANSFORMATION 🔥✨ We are Jamaica's #1 contractors!!!

---

## 6. What to post

You don't need a big content library to start. These five formats cover it:

1. **Finished work** — three or four photos of one completed job. Say what was
   done, where, and what was involved.
2. **Before and after** — the single best-performing format for this trade.
   Take the "before" photo *before you start*, from the same spot.
3. **In progress** — setting out, levelling, block going up. Shows competence.
4. **Short walkthrough video** — 20–45 seconds, phone held steady, one room.
5. **Answering a common question** — "How long does a bathroom re-tile take?"

**Photograph every job**, even the small ones. It costs nothing at the time and
it's the only way to build a portfolio. A quick habit that works: one wide shot
before, one wide shot after, from the same position, plus two or three detail
shots of the finish.

Ask the customer before posting anything from their property.

---

## 7. Cross-posting to the website

The website is built to take social content without redesigning anything:

- A TikTok, Instagram or Facebook post can be added as a video anywhere on the
  site — see "Add a video" in the main `README.md`.
- The **Follow Our Work** section on the home page is already laid out to hold
  an embedded feed when you want one.
- Photos posted to social should also go into `public/media/projects/` and be
  added to `src/data/projects.ts`, so the work builds up on the website too.
  Social feeds disappear down the timeline; the website portfolio doesn't.

---

## 8. Launch checklist

- [ ] Handle `needhamsconstruction` claimed on Facebook, Instagram and TikTok
- [ ] Same profile picture on all three
- [ ] Bio and About filled in on each
- [ ] Phone number and WhatsApp added, Call/WhatsApp buttons enabled
- [ ] Website link added to all three
- [ ] Facebook Page category set to Contractor, Services section completed
- [ ] Instagram and TikTok switched to a Business account (unlocks insights)
- [ ] Service area / location set
- [ ] Profile URLs pasted into `src/data/social.ts` on the website
- [ ] Phone number added to `src/data/contact.ts` on the website
- [ ] Google Business Profile claimed (same name, number and website)
