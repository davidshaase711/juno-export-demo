# Juno Export Demo Site — Build Instructions

A static demo website that mimics the Juno desktop app's tax preparation export flow. Purpose: show prospects how documents get mapped to tax return fields and exported to tax software (Intuit ProConnect, CCH Axcess).

## Stack

Plain HTML + vanilla JavaScript. No build step, no framework. **Each HTML file is fully self-contained** — all CSS lives in a `<style>` block in the `<head>` and all JavaScript lives in a `<script>` block before `</body>`. The only external resource is Google Fonts (Inter) via CDN.

This matters because iframe-sandboxed preview panels and some hosted environments don't reliably load sibling files like `styles.css` or `app.js`. Inlining everything means "drop a single HTML file anywhere and it just works."

## Pages

Two HTML pages that link to each other:

1. **`index.html`** — Tax Preparations list (landing page)
2. **`preparation.html`** — Daisy Duck's document mapping & export page

---

### Page 1: Tax Preparations list (`index.html`)

Replicates the "all clients" view of the Juno desktop app.

- **Top bar**: Juno logo (wordmark `JUNO.` with green ring around the "O") + user avatar (rounded square mint background with person icon)
- **Page header**:
  - Left: "Tax Preparations" heading
  - Right: "Help Center" link (question-mark icon) + toggle labeled "Show all preparations" (on by default)
- **Toolbar** (inside a card):
  - Search input with magnifying glass icon (pre-filled with `all`)
  - "Filter" button with filter icon
  - "Resync Clients" button (pill-shaped, right-aligned)
- **Table columns**: Client | Tax Year | Preparer | Tax Prep Status | (View)

**Sample rows** (each row is a link to `preparation.html`):

| Avatar (color) | Client | Tax Year | Preparer | Status (pill color) |
|---|---|---|---|---|
| DD (purple) | Daisy Duck | 2024 | Jack Flitcroft | Mapping In Progress (yellow) |
| AS (blue) | All SourceDocs | 2024 | Jack Flitcroft | Export Complete (purple) |
| DK (orange) | Donald Duck | 2024 | Jack Flitcroft | Awaiting Documents (gray) |
| MM (pink) | Minnie Mouse | 2024 | Jack Flitcroft | Ready to Export (green) |
| SM (teal) | Scrooge McDuck | 2023 | Jack Flitcroft | Export Complete (purple) |

---

### Page 2: Document mapping (`preparation.html`)

Replicates the per-client document detail view.

- **Top bar**: same Juno logo + user avatar
- **Page header**:
  - Left: "Back to Preparation List" link with left-arrow icon → returns to `index.html`
  - Right: "Need Help? View Export Tips" link with question-mark icon
- **Client card** (light gray rounded background):
  - Left: purple "DD" avatar circle + "Daisy Duck" / "daisy.duck@example.com"
  - Right: dark-green pill button "Preparation Checklist"
- **Documents table** with columns:
  - **Document Name**: file icon + filename, truncate with ellipsis
  - **Form**: e.g. "W-2", "1099-NEC"
  - **Issuer**: e.g. "Walt Disney Studios Inc."
  - **Last Exported**: dash (em-dash)
  - **Exported By**: dash
  - **Preview**: eye icon + "View" link → shows a toast on click
  - **Map To**: dropdown — options depend on form type (see below)
  - **Action**: dropdown — Add / Skip
  - **Status**: small green dot at the end of each row
- **Export section** at bottom (light gray rounded background):
  - Left: "12 documents ready to export" with pulsing green dot
  - Right: two buttons:
    - "Export to ProConnect" (white background, dark-green border)
    - "Export to CCH Axcess" (solid dark-green background)
  - Clicking either opens a modal with a Loom video embed

**Sample documents** (all belong to Daisy Duck):

| Filename | Form | Issuer | Defaults |
|---|---|---|---|
| W01-2024-W2_WaltDisney_DaisyDuck.pdf | W-2 | Walt Disney Studios Inc. | — |
| W02-2024-W2_PixarAnimation_DaisyDuck.pdf | W-2 | Pixar Animation Studios | — |
| C01-2024-ScheduleC_FloralBoutique_Daisy.pdf | Schedule C Source | Daisy's Floral Boutique LLC | — |
| C02-2024-ScheduleC_QuackBakery_Daisy.pdf | Schedule C Source | Quack Quack Bakery | — |
| N01-20241099-NEC_MickeysMarketing.pdf | 1099-NEC | Mickey's Marketing Agency - 4521 | Map To = "Mickey's Marketing Agency" |
| N02-20241099-NEC_DonaldsDesign.pdf | 1099-NEC | Donald's Design Co. - 9087 | Map To = "Donald's Design Co." |
| I01-20241099-INT_DuckburgFCU.pdf | 1099-INT | Duckburg Federal Credit Union | — |
| D01-20241099-DIV_ScroogeInvest.pdf | 1099-DIV | Scrooge McDuck Investments | — |
| B01-20241099-B_CharlesSchwab.pdf | 1099-B | Charles Schwab & Co. | — |
| M01-2024-1098_WellsFargoMortgage.pdf | 1098 | Wells Fargo Home Mortgage | — |
| SSA01-2024-1099-SSA_DaisyDuck.pdf | SSA 1099 | N/A | Action = "Add" |
| K01-2024K-1_DuckFamilyHoldings.pdf | K-1 1120S | Duck Family Holdings LLC | — |

---

## Map To dropdown options (by form type)

Each option is just the name of an existing entry on the tax return (employer, payer, business, etc.) — no tax-form line references, no descriptions. To create a new entry, use the Action column ("Add").

- **W-2**: Walt Disney Studios, Pixar Animation Studios
- **Schedule C Source**: Daisy's Floral Boutique, Quack Quack Bakery
- **1099-NEC**: Mickey's Marketing Agency, Donald's Design Co.
- **1099-INT**: Duckburg Federal Credit Union
- **1099-DIV**: Scrooge McDuck Investments
- **1099-B**: Charles Schwab & Co.
- **1098**: Wells Fargo Home Mortgage
- **SSA 1099**: Daisy Duck
- **K-1 1120S**: Duck Family Holdings LLC

## Action dropdown options (all forms)

Single-word labels, no descriptions:

- Add
- Skip

---

## Export modal videos (Loom embeds)

- **ProConnect**: `https://www.loom.com/embed/e411e678032d4d3fa53f24e82e937a37`
- **CCH Axcess**: `https://www.loom.com/embed/20cd6712246d446eb8c6ca14943c05eb`

Modal requirements:
- Dark backdrop with light blur
- Rounded white panel, max-width ~960px
- Title at top + X close button
- iframe with 16:9 aspect ratio (`padding-bottom: 56.25%` trick)
- Close on backdrop click, X button, or Escape key
- **Clear the iframe `src` when closing** so the video stops playing

---

## Design specs

**Colors**:
| Token | Hex |
|---|---|
| Juno dark green (primary) | `#0E3D2E` |
| Juno dark green hover | `#0A3225` |
| Juno mint (light accent) | `#D7F2DE` |
| Juno mint-soft | `#E8F7EC` |
| Status green dot | `#2BB35C` |
| Purple (DD avatar) | `#6B4FBB` |
| Text dark | `#1A1F1B` |
| Text muted | `#6B7280` |
| Text faint | `#9CA3AF` |
| Borders | `#E5E7EB` |
| Soft borders | `#EEF0F0` |
| Page background | `#FFFFFF` |
| Soft card background | `#F7F8F8` |

**Avatar circle colors** (list page):
| Initials | Hex |
|---|---|
| DD purple | `#6B4FBB` |
| AS blue | `#4F76C7` |
| DK orange | `#E08A3D` |
| MM pink | `#D45EA3` |
| SM teal | `#3C8C8C` |

**Status pill colors**:
| Status | Background | Text |
|---|---|---|
| Export Complete | `#EFE9FB` | `#6B4FBB` |
| Mapping In Progress | `#FEF1D6` | `#B45309` |
| Awaiting Documents | `#F1F2F4` | `#4B5563` |
| Ready to Export | `#DCF3E4` | `#1E7B47` |

**Typography**: Inter (Google Fonts), weights 400/500/600/700. System font fallback (`system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`).

**Layout**:
- Max content width: ~1300px, centered
- Page padding: 36px 48px (desktop), 24px 22px (mobile)
- Card border-radius: 14px
- Button border-radius: 999px (pills)
- Table row padding: 16-18px vertical, 22px horizontal

---

## Behavior

- **Dropdowns** are custom (not native `<select>`). Clicking the toggle opens a menu; clicking an item selects it and closes the menu. Clicking outside closes any open dropdown. Escape key also closes. Selected item shows a checkmark and highlighted mint background.
- **Preview links** (eye icon + "View") show a small dark-green toast at the bottom of the page with the filename. No real preview content.
- **Export buttons** open the corresponding Loom video in a modal iframe.
- **Back link** on the prep page navigates to the list page.
- **Row links** on the list page navigate to the prep page (all rows can link to the same prep page since only Daisy Duck has data).

---

## File structure

```
juno-export-demo/
├── index.html          # Tax Preparations list (landing) — self-contained
├── preparation.html    # Document mapping + export buttons — self-contained
└── INSTRUCTIONS.md     # This file
```

Both HTML files are independently deployable. Each contains its own inline CSS; `preparation.html` also contains the inline JavaScript for rendering the table, handling dropdowns, and opening the export-video modal. There are no shared external assets.

---

## Gotchas

1. **Force light mode**. Add `<meta name="color-scheme" content="light only">` AND `html { color-scheme: only light; }` in CSS. Without it, browsers with "Auto Dark Mode for Web Contents" enabled invert the white background to black and the dark text becomes invisible. Belt-and-suspenders fix: also put `style="background-color: #ffffff; color: #1a1f1b;"` inline on the `<body>` tag.
2. **Loom embed URL format**: use `/embed/{id}`, not `/share/{id}`. Query params `?hide_owner=true&hide_share=true` give a cleaner embed.
3. **Inline all CSS and JS — do not link external files.** Iframe-sandboxed preview panels and some hosted environments silently fail to load sibling files like `styles.css` or `app.js`. The symptom is a fully unstyled page (default serif font, blue underlined links, no layout). Put all CSS in a `<style>` block in `<head>` and all scripts in an inline `<script>` block before `</body>`. Larger HTML files, but works anywhere.
4. **Sample data is fictional** (Disney characters). Don't ship to production with these names — replace with anonymized realistic clients before any external demo.
5. **Single-page nature**: all "View" links on the list page go to the same `preparation.html`. If you want per-client data, you'd need a routing layer or query-string handling inline in `preparation.html`.

---

## Deployment

Two static HTML files — any static host works. Easiest paths:

- **GitHub Pages** (CLI, free, public repo required):
  ```bash
  cd juno-export-demo
  git init && git add . && git commit -m "Initial commit"
  gh repo create juno-export-demo --public --source=. --remote=origin --push
  gh api -X POST "repos/{owner}/juno-export-demo/pages" -f "source[branch]=main" -f "source[path]=/"
  ```
  URL pattern: `https://<github-username>.github.io/juno-export-demo/`
- **Netlify Drop** (no signup, instant): drag the project folder onto https://app.netlify.com/drop.
- **Vercel** (CLI): `npm i -g vercel && vercel` from the project directory.
- **Local preview**: `python3 -m http.server 8000` and visit `http://localhost:8000`.
