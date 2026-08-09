# Yojana Sathi — hackathon-ready feature plan

## Goal
Strengthen the app for a hackathon pitch by adding civic-utility features that show the real-world problem, the solution, and measurable social impact — while keeping the existing lightweight, privacy-first, stateless architecture.

## What we will build

### 1. Landing-page problem/solution story
Add two new sections to the existing home page (`src/routes/index.tsx`) below the current hero and helper card:

- **The gap** — why citizens miss out: information is scattered across portals, eligibility language is confusing, and last-mile helpers (CSC operators, NGO staff, Anganwadi workers) have no quick screening tool.
- **The approach** — a short, scannable explanation of deterministic rule-based matching, assisted mode for field helpers, no-account privacy, and official-portal links.

Each section will reuse the warm Swiss civic-utility palette and include clear `data-testid` attributes on CTAs.

### 2. `/impact` route — deeper social-impact page
Create a new route at `/impact` (or `/about`) with:

- Problem statement + target users (citizens, field helpers, local governments).
- Impact thesis: faster screening, fewer missed schemes, dignity-preserving privacy.
- Trust signals: all scheme data is sourced from official portals, each card shows `last_verified`, and no personal data is stored.
- Roadmap / future scope: local-language expansion, CSC integration, offline/PWA support, scheme feedback loop.
- A printable one-pager button that produces a clean, letter/A4 PDF-friendly view.

### 3. `/pitch` route — judge-ready pitch deck
Create a full-page, print-friendly pitch route (`/pitch`) designed like a slide deck:

- Slides/sections: Hook, Problem, Solution, Demo CTA, Impact, Tech highlights, Roadmap, Team/Call to action.
- Large typography, warm palette, QR code placeholder linking back to the live app.
- Print styles (`@media print`) so judges can print or save as PDF directly.
- Optional keyboard navigation (arrow keys / space) between sections.

### 4. Scheme browser (`/schemes`)
Add a public route that lists all 17 schemes without requiring a questionnaire:

- Search/filter by category, occupation, income, and state.
- Reuses the existing `SchemeCard` component and official-source links.
- Helps judges and visitors verify coverage instantly.

### 5. Assisted-mode helper checklist
Enhance the existing assisted questionnaire flow with a non-intrusive helper checklist:

- A collapsible panel reminding the field worker what documents to confirm before finishing.
- Adds practical value for the stated target audience.

### 6. Shareable results card
Improve the results screen so a matched shortlist can be shared as a clean text/card:

- One-click copy already exists; add a "Share as image/text" preview and a WhatsApp-friendly formatted message.
- Keep it stateless: no server-side image generation, only formatted text/URL.

### 7. Language toggle (English / Hindi / Marathi)
Because scheme names already include `hi` and `mr` fields, add a UI language toggle:

- Start with scheme names and a few key UI labels; expand iteratively.
- Stores preference in `localStorage` only, no server state.

## Content rules

- Use real, verifiable framing: information gaps in welfare delivery, last-mile helper constraints, and official-portal verification.
- Do not invent testimonials, user counts, or impact numbers. Where a real metric is needed but unknown, insert a clearly marked placeholder such as `[insert field-test count]` and tell you which ones need replacement.
- All new copy will be written for a hackathon judge and a citizen audience.

## Technical details

- **Stack**: TanStack Start, React 19, Tailwind v4, existing server routes under `src/routes/api/`.
- **No backend changes required** for this plan; all features stay stateless and client-side.
- **Routing**: add `src/routes/impact.tsx`, `src/routes/pitch.tsx`, and `src/routes/schemes.tsx` (or folder equivalents). Each gets its own `head()` metadata.
- **Navigation**: update `SiteHeader` with links to `/impact` and `/schemes`; keep mobile menu in sync.
- **Print styles**: extend `src/styles.css` `@media print` rules for `/pitch` and `/impact` printable sections.
- **Components**: create small, focused components (`ProblemSolution`, `ImpactPage`, `PitchDeck`, `SchemeBrowser`, `AssistedChecklist`, `LanguageToggle`) rather than enlarging existing files.
- **Accessibility**: maintain `data-testid` attributes on every new interactive element and keep keyboard focus visible.

## Suggested implementation order

1. Landing problem/solution sections + `SiteHeader` nav updates.
2. `/impact` route with printable one-pager.
3. `/pitch` route for hackathon judges.
4. `/schemes` browser.
5. Assisted checklist and shareable results card.
6. Language toggle.

## Success criteria

- A visitor can land on the home page, understand the real-world problem, and start a check in under 30 seconds.
- A judge can open `/pitch`, navigate with a keyboard, and print a clean PDF.
- A helper can use assisted mode with the new checklist and share results via WhatsApp/copy.
- All new interactive elements have unique `data-testid` attributes and pass a quick browser walkthrough.
