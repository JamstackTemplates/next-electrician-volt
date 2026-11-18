# Bright Spark Electrical (`next-electrician-volt`)

A static Next.js website for **Bright Spark Electrical**, a fictitious licensed electrical contractor in Abbotsford, Melbourne, built with the Jamstacks Next.js starter, Tailwind CSS v4, and self-hosted Fontsource fonts (`Saira Stencil One`, `Barlow Condensed`, and `Barlow`).

> **Sample template content:** The business name, phone number `(03) 5550 4127`, email `hello@brightspark.example`, base note, and licence numbers (`REC 23417 (sample)`, `A 58820 (sample)`, `S 9041273 (sample)`, `PL-204-118 (sample)`) are placeholder values for the Jamstacks gallery. Replace them with real business details before publishing a live site.

## Requirements

- Node.js 24 or later and npm.

## Quick start

```sh
npm ci
npm run check
npm start -- --port 3000
```

`npm run check` runs the Node test suite (`npm test`), Next.js route type generation + TypeScript check (`npm run typecheck`), and the static export (`npm run build` → `out/`).

## Pages

| Route | Purpose | Owning file |
| --- | --- | --- |
| `/` | Hero (`LiveBoard`), sector strip, interactive Switchboard of 6 featured services, licence rating plates, 3 recent job dockets, 12-point safety teaser, schematic service-area circuit map, rates/phone hours, CTA, and `Electrician` JSON-LD | [`app/page.tsx`](app/page.tsx) |
| `/services/` | Interactive sector breaker toggles (`All`, `Residential`, `Commercial`, `Solar` with `#hash` sync), circuit schedule tables with indicative AUD inc. GST pricing, waitlist callout, 4-step job process, labour rates, and CTA | [`app/services/page.tsx`](app/services/page.tsx) |
| `/safety/` | Printable 10-minute look-only home safety checklist with interactive progress gauge (saved in browser `localStorage`), stop-and-call danger panel, paid inspection panel, and full licence rating plates | [`app/safety/page.tsx`](app/safety/page.tsx) |
| `/contact/` | Request-a-quote page with the hosted Jamstacks support form (or visible email fallback when unconfigured), emergency 000 notice, message checklist, phone hours badge, and copy-email control | [`app/contact/page.tsx`](app/contact/page.tsx) |
| `/404.html` | Static "Circuit open" error page with tripped breaker art and links back to Home, Services, and Contact | [`app/not-found.tsx`](app/not-found.tsx) |

## Editing content (owner guide)

Page headings, prose, and calls to action live directly in each route's `app/**/page.tsx` file as JSX children of named section components. Structured data and typed collections live in `content/`:

- **`content/business.ts`** — Business `name`, `tagline`, `introduction`, `email`, `phone`, `phoneHref`, `base` (suburb, landmark label, no-walk-in note), `suburbs` (service area grouped by `north` / `inner` / `east`), `rates` (`callOut`, `callOutCoversMinutes`, `hourly`, `incrementMinutes`), `hours` (7 same-day `OpeningHours` entries), `emergency` (`number`, `outages`), and `enquiries` (`title`, `introduction`, `usefulToInclude`).
- **`content/services.ts`** — `services` array. Key fields: `id` (URL-safe, unique), `sector` (`residential` | `commercial` | `solar`), `name`, `summary`, `includes` (2–4 lines), `price` (`{ type: 'fixed' | 'from', amount, unit? }` in AUD inc. GST between `$1` and `$50,000`, or `{ type: 'quote', note? }`), `breakerLabel` (1–12 chars), `amps` (`10 | 16 | 20 | 32 | 40 | 63`), `featured` (exactly 6 must be `true` for the Home Switchboard), `available`, `availabilityNote` (required when `available` is `false`), and `icon`.
- **`content/licences.ts`** — `licences` array (`id`, `title`, `short`, `issuer`, `number`, `validTo` as `YYYY-MM-DD`). Update every `(sample)` number when replacing with real licences.
- **`content/jobs.ts`** — `jobs` array (`id`, unique `docket`, `serviceId` matching `content/services.ts`, `suburb` matching `content/business.ts`, `title`, `scope`, `days` 1–30).
- **`content/safety.ts`** — `SAFETY_AREAS` and `safetyChecks` (`id`, `area`, `check`, `why`, `stopAndCall`).

### Common owner edits

- **Update a service price or waitlist status:** Edit `price`, `available`, and `availabilityNote` in [`content/services.ts`](content/services.ts), then run `npm run check`. Both `/services/` and the Home Switchboard update automatically, and the Waitlist stamp disappears when `available` is set to `true`.
- **Update call-out/hourly rates or suburbs:** Edit `rates` or `suburbs` in [`content/business.ts`](content/business.ts). Suburbs automatically update the Home schematic circuit map, terminal-strip legend, Contact rail, footer, and `Electrician` JSON-LD.
- **Rename the business:** Update `business.name` in [`content/business.ts`](content/business.ts) and `name` in [`site.config.json`](site.config.json).

## Public configuration and Contact form

[`site.config.json`](site.config.json) holds only the public site metadata (`name`, `description`, `domain`, `timeZone`, and `jamstacks.siteId` / `jamstacks.cdnUrl`). Business data never goes there.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config `timeZone` (`Australia/Melbourne`) |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

When a Jamstacks site ID is configured, `/contact/` renders `<jamstacks-support-form>` and loads `{cdn}/sites/{siteId}/embed.js`. Without a site ID, it renders the visible `mailto:` fallback with no embed request. Navigation to and from `/contact/` always uses full document loads via `SiteLink`.

## Checks and preview

```sh
# Standard checks and build
npm run check

# Project-path build + configured Contact verification
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview JAMSTACKS_SITE=volt-demo npm run build
npm start -- --base /preview --port 3000
```

## Publishing and gallery assets

- `jamstacks/` is gallery-only metadata and is not imported by customer builds, tests, or GitHub Pages.
- After a normal root `npm run build`, capture light/dark screenshots and validate with `node --test jamstacks/config.test.mjs`.
- Before publishing a customer site, delete `plan/` and `.claude/skills/` if present.
