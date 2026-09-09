# Media

Real Needham's Construction photographs and videos go here.

```
projects/   project photos and clips  →  referenced from src/data/projects.ts
services/   service page photography  →  referenced from src/data/services.ts
company/    logo, team photo, hero    →  referenced from src/data/home.ts
                                          and src/data/company.ts
```

Reference a file by its path from `/public` — a file saved as
`public/media/projects/kitchen-01.jpg` is referenced as
`/media/projects/kitchen-01.jpg`.

**Before you add a photo**

- Resize it to about 1600px on the long edge. Straight off a phone it will be
  several megabytes and slow the page down for no visible benefit.
- Save as `.jpg` for photographs, `.png` only for logos and graphics.
- Give it a descriptive filename: `kingston-bathroom-after.jpg`, not `IMG_4821.jpg`.
- Write a real `alt` description when you reference it in the data file.

**Videos**

Keep self-hosted clips under about 20MB, or upload to YouTube and reference the
video ID instead — that's faster for visitors and costs nothing to host.
