# Arix Team Portfolio — Project State & Handoff

**Read this file first.** It exists so any AI assistant (or human) picking up
this project — in a fresh session, after context loss, or after a break —
can understand what this project is, what's been built, what's live, and
exactly what to do next. Keep it updated as work progresses; it is the
single source of truth for "where things stand."

---

## 1. What this project is

A Next.js 16 App Router marketing site for **Arix Team**, a small
freelancer/agency team (Web & Shopify, App Development, Digital Marketing,
Graphic Design). Originally a static marketing site; it has since grown a
full **member-editable CMS** on top, backed by Supabase.

- **Local dev**: `npm run dev` → http://localhost:3000
- **Production**: https://arix-team-portfolio.vercel.app
- **Deploy method**: `vercel --prod` run directly from this local directory.
  **Important**: this project's git repo only has the initial
  `create-next-app` scaffold commit — almost the entire codebase (CMS,
  admin panel, all pages, cursor effects, everything) is **uncommitted in
  git** but **is live in production**, because Vercel deploys were done by
  uploading the local working directory directly, not via git push. Do not
  assume `git log` reflects what's live — it doesn't. Check `git status`
  before any destructive git operation; there is a lot of uncommitted work.
- **Database**: Supabase (Postgres). Project ref: `slxbawzdccsmicfmpelu`.
  Credentials live in `.env.local` (gitignored). The user pasted the
  Supabase **secret key** in chat once despite being asked not to — it has
  **not been rotated**. Recommend rotation if you're auditing security.

---

## 2. The CMS system (core feature, built this session)

### Concept
Each team member gets a PIN. Logging in at `/admin/login` with their PIN
opens their own `/about/[slug]` page in an **editable state** — not a
separate dashboard. A super-admin PIN (`8185`) exists only to add new team
members via `/admin`.

### Critical design rule: draft/publish, never live-on-save
Every editable field (bio, skills, stats, projects, project category) has a
**draft** and a **published** version. Saving writes to draft only. Clicking
**Publish (Go Live)** copies draft → published. Public/anonymous visitors
only ever see published data. The member previewing their own page sees
their draft with a red banner.

**This rule was violated once and had to be fixed** (see §5, "Known bugs
fixed") — when adding project categories, a single `category` column was
added without a draft/published split, so changing it went live instantly.
Fixed by splitting into `draft_category` / `published_category`. **If you
add any new editable field to `projects` or `team_members`, it MUST follow
the draft_X / published_X column pattern** — no exceptions, or you'll
reintroduce this exact class of bug.

### Auth model
- NOT Supabase Auth. Custom PIN-based auth: PINs are bcrypt-hashed
  (`src/lib/auth/pin.ts`), verified against `pgcrypto`'s `crypt()`.
- Opaque session tokens, SHA-256 hashed, stored in `member_sessions` /
  `admin_sessions` tables, httpOnly cookies (`member_session`,
  `admin_session`).
- **Single unified login** at `/admin/login` — one PIN field, tries admin
  PIN first, then loops all members. Each member/admin has **independent**
  rate limiting (5 fails → 15 min lockout) even though there's one shared
  input field (`pin_attempts`, `admin_attempts` tables).
- **No public "edit this page" button or PIN box exists anywhere on public
  pages.** This was an explicit, emphatic user requirement — the only login
  entry point is `/admin/login`. `MemberEditGate.tsx` only ever renders
  anything if the visitor already has a valid session matching that exact
  page's slug; it never shows a login prompt itself.

### Real PINs (already seeded in Supabase, live)
| Person | Role | PIN |
|---|---|---|
| Admin (super-admin) | — | `8185` |
| Vikash Choudhary | Web & Shopify Developer | `5311` |
| Yunus Ali | Digital Marketing & WordPress Developer | `0716` |
| Chandra Prakash | Graphic Designer | `2540` |

### Data model (Supabase tables)
- `team_members` — slug, pin_hash, is_active, `published_data` (jsonb:
  name/role/bio/longBio/highlights/skills/stats/gradient/avatar/
  categorySlug/focus/initials), `draft_data` (same shape, null = no
  pending changes), `published_at`, `draft_updated_at`.
- `projects` — member_id, slug, status ('draft'|'published'),
  `draft_title/description/image_path/link_url/category`,
  `published_title/description/image_path/link_url/category`,
  `published_at`, `deleted_at` (soft delete).
  - `category` is a text enum, see `src/lib/project-categories.ts` for the
    canonical list — **do not hardcode category strings elsewhere**.
- `pin_attempts`, `admin_attempts` — per-account rate limiting.
- `member_sessions`, `admin_sessions` — session tokens.
- `admins` — the single super-admin row.

Migrations live in `supabase/migrations/`, numbered `0001` through `0006`.
**They must be run manually by the user in the Supabase SQL editor** — there
is no CLI/automated migration runner wired up. When you write a new
migration, give the user the raw SQL to paste; don't assume it's been run
until they confirm.

### Project categories (design/marketing disciplines)
Categories exist so each member's "Work by [Name]" section renders in a
way that fits their actual discipline, not one generic grid. Defined in
`src/lib/project-categories.ts` (this file has **no** `"server-only"` — it's
safe to import from client components; `src/lib/project-data.ts` re-exports
the same constants but IS server-only, so client components must import
from `project-categories.ts` directly, not `project-data.ts`).

Current categories: `general`, `logo`, `branding`, `social`, `packaging`,
`print`, `uiux`, `seo`, `paidads`, `content`, `wordpress`.

Rendering per category (`src/components/CategoryProjectGrid.tsx`):
- `branding` / `uiux` / `wordpress` → full case-study feature panel
  (image + copy side by side)
- `social` → Instagram-post-style tiles
- `seo` / `paidads` / `content` → metrics-forward card (image + red accent
  bar + copy)
- everything else (`logo`, `packaging`, `general`) → dense square thumbnail
  grid

Each category section on `/about/[slug]` gets its own dark (`#0e0e0e`)
intro slide with a lime-green (`#c6e11a`) heading and eyebrow label — see
`src/components/CategorizedWorkSection.tsx`. This only renders if the
member has at least one project with a category other than `general`;
otherwise the page falls back to the old static `PortfolioGrid`.

**Real content status**: Chandra Prakash and Yunus Ali have had their old
placeholder/seed projects deleted and replaced with real
category-appropriate projects (published). Vikash Choudhary still has his
original real projects (Creative Agency Website, etc.) which are `general`
category — nobody has gone back to categorize Vikash's projects yet. That's
optional/pending, not broken.

### Key files for the CMS
- `src/lib/team-data.ts` — Founder type + `getFounders()`,
  `getFounderForViewer()` (draft-aware).
- `src/lib/project-data.ts` — MemberProject type + CRUD-adjacent reads,
  **`"server-only"`**, imports category constants from
  `project-categories.ts` and re-exports them (server components can import
  either file; client components must import `project-categories.ts`).
- `src/app/api/member/draft/route.ts` — GET/PATCH member's own draft.
- `src/app/api/member/publish/route.ts` — publish member profile. Returns
  `{ok:true, unchanged:true}` (not an error) if draft == published — this
  was a bug fix, see §5.
- `src/app/api/member/projects/route.ts` — GET list / POST create project.
- `src/app/api/member/projects/[id]/route.ts` — PATCH update / DELETE
  (soft) a project.
- `src/app/api/member/projects/[id]/publish/route.ts` — publish one
  project.
- `src/app/api/member/projects/publish-all/route.ts` — used by the
  top-level "Publish (Go Live)" button so one click publishes the profile
  AND all pending projects together (see §5 bug fix).
- `src/app/api/admin/login/route.ts` — unified login, admin + all members.
- `src/components/MemberEditPanel.tsx` — the tabbed editor (About / Skills
  & tools / Work by you / By the numbers) shown at the bottom of a
  member's own page.
- `src/components/MemberEditGate.tsx` — auth gate that conditionally
  renders `MemberEditPanel`; never shows a public login UI.
- `src/components/MemberProjectEditGate.tsx` — per-project editor shown on
  `/about/[slug]/work/[project]` for the owning member.
- `src/app/about/[slug]/work/[project]/page.tsx` — individual project
  detail page, member-owned, draft/publish aware.

---

## 3. Visual/interactive polish (this session, later half)

### Homepage ambient background
`src/components/AmbientBackground.tsx` — 3 slow-drifting blurred red/black
blobs, fixed behind homepage content, respects `prefers-reduced-motion`.
Mounted once in `src/app/page.tsx`.

### Scroll-linked curvy line (Lusion.co-inspired)
`src/components/ScrollCurveLine.tsx` — a sky-blue gradient SVG path, fixed
near the top of the viewport, whose **shape morphs** through 5 keyframe
curves as `scrollYProgress` (whole-page scroll, via framer-motion's
`useScroll()`) advances. Uses `mix-blend-plus-lighter` so it reads well on
both dark (hero) and light (rest of page) backgrounds. Mounted once in
`src/app/page.tsx`, NOT per-section.

**Bug that was fixed**: an earlier version tried to make the line
physically travel down the page by combining `position: fixed` with a
manual `y` transform driven by scroll progress — this is wrong, because a
fixed element's `y` transform moves it relative to the viewport, so as
scroll progress grew toward 1, the translate grew toward
`docHeight - 700px`, pushing the whole element thousands of pixels below
the viewport (invisible). Current version is `position: fixed` with NO
vertical translate at all — only the SVG path's shape and opacity change
with scroll. Do not reintroduce a scroll-driven `y`/`top` offset on this
component; if you need "the line travels down the document," that requires
`position: absolute` in normal document flow instead, which is a bigger
change (was attempted, reverted — see git history of this file if it's
ever committed).

### Cursor liquid trail
`src/components/CursorLiquidTrail.tsx` — Canvas 2D (not WebGL) soft
blurred-circle trail following the mouse, layered to approximate a liquid
melt look, `mix-blend-screen`. Scoped to a target element via
`targetRef` — currently only mounted inside `VideoHero.tsx` (the hero
section), not site-wide. Respects reduced-motion and coarse pointers
(mobile/touch — disabled there).

### Vanta.js clouds background — REMOVED, do not re-add without asking
A WebGL clouds background (via `three` + `vanta` npm packages) was built
for the Testimonials section, then explicitly removed by the user for
being too heavy/slow ("lag ho rahi h"). Packages were uninstalled. If asked
for a "cloud" or heavy WebGL background again, warn about performance
first.

### Custom cursor + sound + ARIX label + long-press blast
This is the most recently built feature. Files:
- `src/lib/cursor-sound.ts` — Web Audio API synthesized sounds (no audio
  files, no CSP issues). Exports: `playHoverTick()`, `playClickTick()`,
  `startChargeSound(durationMs)` (returns `{stop()}`, rising-pitch tone
  while charging), `playBlast()` (white-noise burst + low thump).
- `src/components/CursorBlast.tsx` — imperative particle-burst component
  (`ref.current.burst(x, y)`), spawns 14 DOM `<span>` shards that fly
  outward and fade, self-removing after 650ms.
- `src/components/CustomCursor.tsx` — the whole orchestration. Renders a
  dot + trailing ring (existing design) + a cursor-following "ARIX" text
  label + the blast component. Behavior:
  - **Hover**: entering a link/button/`[data-cursor-hover]` element plays
    `playHoverTick()` once (guarded against `mouseover` re-firing on
    nested children).
  - **Click**: `mousedown` plays `playClickTick()`.
  - **Move**: moving the mouse >6px shows the "ARIX" label, which
    auto-hides 2 seconds after the last qualifying move (or after
    release, see below). **There is intentionally NO sound tied to plain
    mouse movement** — this was explicitly removed per user request
    ("mouse move sound off kar do"); only hover and click make sound.
  - **Long-press (hold mousedown)**: the "ARIX" label's `font-size` grows
    continuously in real pixels from a 13px base, at
    `GROWTH_PX_PER_MS` px/ms (currently `0.075`, i.e. ~2.5s to reach
    threshold), while a rising-pitch charge sound plays. When font-size
    crosses `BLAST_FONT_SIZE` (currently `200`px), it "blasts": the label
    is hidden, `playBlast()` fires, `CursorBlast.burst(x,y)` spawns
    particles at the cursor position, and press state resets. Releasing
    the mouse before reaching threshold just fades the label back down
    normally (no blast).
  - `TIME_TO_BLAST_MS` is derived from the other two constants — the
    charge sound's ramp duration is passed this value so the sound's pitch
    ramp and the visual growth reach their climax at the same instant.
    **If you change `BLAST_FONT_SIZE` or `GROWTH_PX_PER_MS`, this stays in
    sync automatically — don't hardcode a duration for the charge sound.**
  - Sound only plays after the user's first `pointerdown`/`keydown`
    anywhere on the page (`soundEnabled` flag) — this is required by
    browser autoplay policy, not a bug; cannot be bypassed.
  - The whole thing is disabled on coarse pointers (`(pointer: coarse)`
    media query) — i.e. touch devices don't get any of this.
- CSS for all of this lives in `src/app/globals.css` under "Custom cursor"
  and the "Cursor-following ARIX label" block.

**Tuning history**: threshold was originally 80px reached in ~0.6s — user
said it felt too fast/easy, so it was changed to 200px / ~2.5s. If asked to
tune again, both constants are at the top of `CustomCursor.tsx`.

**Verification method used**: this project has no test suite. Visual/
interactive features were verified using Playwright, installed
temporarily via `npm install --no-save @playwright/test` +
`npx playwright install chromium`, screenshotting at controlled intervals,
then **uninstalled again after verification** (`npm uninstall --no-save
@playwright/test`) — it is NOT a permanent dependency. If you need to
visually verify something similar, follow the same install-verify-uninstall
pattern rather than leaving it in `package.json`. Preloader takes 6 seconds
on load — always wait that out (~7s) before screenshotting/interacting in
any automated test of the homepage.

---

## 4. Non-CMS features already in place (don't rebuild these)

- Custom PIN-based team login, admin panel to add members
  (`/admin`, `src/components/admin/AdminDashboard.tsx`).
- Preloader (`src/components/Preloader.tsx`) — fixed 6-second animated
  loading screen with a Lottie animation, per explicit user request.
- Lottie player (`src/components/LottiePlayer.tsx`) — loads
  `dotlottie-wc` (WASM-backed, `@lottiefiles/dotlottie-web` under the
  hood) imperatively via `customElements.whenDefined`, not Next's
  `<Script>` — this was deliberate after debugging timing issues.
- Smooth scroll via Lenis (`SmoothScroll.tsx`), scroll restoration via
  sessionStorage (`ScrollRestoration.tsx`).
- Background music toggle (`BackgroundAudioContext.tsx`) — hidden YouTube
  iframe player, toggled via a button in the hero.
- DevTools guard (`src/components/DevToolsGuard.tsx`) — blocks F12 and
  Ctrl+U only (right-click, copy/paste, text selection were explicitly
  UN-blocked after being tried and rejected by the user — do not
  re-block these without being asked).
- Content-Security-Policy configured in `next.config.ts` — has explicit
  allowlists for `unpkg.com` (Lottie/WASM), YouTube, several image CDNs.
  If you add any new external script/API, you likely need to update this.
- A completely separate, unrelated sub-project at `synapsex/` (Vite +
  React + TS, a different landing page). It is deliberately excluded from
  the main project's `tsconfig.json` and `eslint.config.mjs` — do not let
  it bleed into typecheck/lint of the main app, and don't touch it unless
  specifically asked.

---

## 5. Bugs found and fixed this session (for context, not to redo)

1. **Publish button did nothing when nothing had changed** — the publish
   API treated "draft matches published" as an error ("No unpublished
   changes"). Fixed: it's now a successful no-op
   (`{ok:true, unchanged:true}`), and the UI shows a friendly message
   instead of an error.
2. **Top-level Publish button didn't publish projects** — it only
   published the member's profile (`team_members` row), leaving all
   "Work by you" projects stuck as unpublished drafts forever unless
   published individually. Fixed by adding `publish-all` and calling it
   from the same button.
3. **Category change went live instantly, bypassing draft/publish** — see
   §2 above. This is the most important bug to remember the shape of.
4. **Stale DB constraint blocked new categories** — when marketing
   categories (`seo`, `paidads`, etc.) were added, the check constraint
   from an earlier migration kept its original name
   (`projects_category_check`) even after the column was renamed to
   `draft_category`, so it was never actually dropped by a later migration
   that guessed a different constraint name. Lesson: when renaming a
   column with a `check` constraint, explicitly find and drop the
   constraint by its actual name (query `information_schema` or just try
   dropping the guessed name AND the original pre-rename name).
5. **URL validation was too strict** — pasting `www.example.com` (no
   `https://`) failed validation with an unhelpful "Validation failed."
   Fixed via `src/lib/url-field.ts` — a shared Zod schema that
   auto-prepends `https://` if no protocol is present, used by all project
   create/update routes. Error messages were also made specific instead of
   generic.
6. **Cursor paste/copy accidentally blocked everywhere** — an early
   security pass blocked `paste` globally, including inside the member's
   own edit-panel form fields. Fixed by scoping copy/paste blocking to
   exclude `input`/`textarea`/`[contenteditable]`. Then the user asked to
   remove ALL of that blocking except F12/Ctrl+U — done, see §4.
7. **`ScrollCurveLine` disappearing on scroll** — see §3, the
   fixed+manual-y-transform bug.
8. **Music toggle crashed with `playerRef.current.playVideo is not a
   function`** (`src/components/BackgroundAudioContext.tsx`) — clicking
   the hero to toggle background music could throw this runtime error.
   Root cause: `toggle()` only checked whether `playerRef.current` was
   non-null before calling `.playVideo()`/`.pauseVideo()` on it, but the
   YouTube IFrame API's `new YT.Player(...)` returns an object
   synchronously whose methods aren't actually attached until the
   `onReady` callback fires (async). If the user clicked before
   `onReady`, or clicked again while the previous instance was still
   initializing, the ref held an object without those methods yet. Fixed
   by also checking the existing `ready` state (which was already tracked
   for other purposes but not consulted here) before calling player
   methods — `if (!ready || !playerRef.current)` falls back to the
   pending-play queue path instead of calling a not-yet-ready player.
   Verified with a Playwright stress test firing 5 rapid clicks
   immediately on page load (the exact race window) — zero errors after
   the fix, reproduced-then-fixed before that returned the reported error.

---

## 6. What was being worked on right before this file was written

Most recent user request (the one that led to creating this file):
1. Change the cursor "ARIX" long-press blast threshold from 80px to a
   higher value, and slow down the growth rate (user said it was
   happening "jyada fast" — too fast). **Done and verified**: threshold →
   200px, growth rate → 0.075px/ms, charge sound duration auto-synced via
   `TIME_TO_BLAST_MS`. Verified via `npx tsc --noEmit`, eslint,
   `npm run build`, AND a Playwright screenshot/DOM-poll pass confirming
   actual blast now fires at ~2000ms of holding (vs. ~440ms before the
   change) — a clearly slower, higher-threshold feel. **Not yet deployed
   to production** — the user has not said "push" since this change.
2. Created this handoff file (`PROJECT_STATE.md`) — done.

## 7. Immediate next steps for whoever picks this up

1. If the user asks to deploy ("push kar do" / "deploy karo"), the flow
   is: `npm run build` (sanity check) → `vercel --prod` → verify with
   `curl -s -o /dev/null -w "%{http_code}" https://arix-team-portfolio.vercel.app/`
   returns 200 → tell the user it's live. Do NOT deploy without an
   explicit go-ahead in the current turn — this has been the pattern all
   session (the auto-mode classifier blocks unprompted prod deploys).
2. If asked to further tune the cursor blast, the constants are at the
   top of `src/components/CustomCursor.tsx`
   (`BLAST_FONT_SIZE`, `GROWTH_PX_PER_MS`). Re-verify visually with the
   Playwright install→screenshot→uninstall pattern from §3 if the change
   is non-trivial.
3. Vikash Choudhary's projects are still uncategorized (`general`). If the
   user asks to "do the same" for Vikash as was done for Chandra/Yunus,
   that means: log in as Vikash (PIN `5311`), review his real projects,
   assign appropriate categories (probably mostly `general`/web-specific —
   there's no dedicated "web dev" category yet, might need one), and
   publish.
4. Never paste or ask the user to paste Supabase secret keys in chat again
   — and if you see one in scrollback, remind the user to rotate it (this
   has been flagged multiple times and still hasn't been done).
5. Keep this file updated: when you finish a chunk of work, especially
   anything that changes data model, auth, or a previously-documented
   behavior, come back and edit the relevant section above so the next
   session doesn't have to rediscover it.
