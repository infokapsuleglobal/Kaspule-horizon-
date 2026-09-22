# Kapsule — built on Shopify Horizon

This theme is [Shopify Horizon](https://github.com/Shopify/horizon) rebuilt to
match the Kapsule handoff spec (see the original `README.md` you supplied for
the full design reference) — real Shopify products, native cart/checkout,
filtering and product recommendations wherever Horizon already does the job,
plus a set of `kapsule-*` sections/blocks for what Horizon doesn't have out of
the box (the greek-key band, concern tiles, maisons panel, free-shipping bar,
house portraits, product info accordion, same-house bundle, sticky
add-to-cart). No part of the original HTML prototype's runtime was ported —
this is Liquid + Shopify's own data model throughout.

## Brand layer

- `config/settings_data.json` — `color_palette`: canvas `#F7F4EE` / ink
  `#1A1714`, plus `color1`/`color2`/`color3` for Surface / Surface alt /
  hairline. Every native Horizon colour (buttons, badges, inputs, footer)
  derives from these automatically via Horizon's smart-contrast system.
- `snippets/kapsule-overrides.liquid` — loads Spectral (Google Fonts) for
  headings, sets the body font to the Helvetica Neue stack, and holds all
  bespoke component CSS. Rendered at the end of `<head>` in
  `layout/theme.liquid`.
- `assets/kapsule-monogram.png`, `kapsule-wordmark.png`,
  `kapsule-wordmark-footer.png` — your real logo files. `blocks/_header-logo.liquid`
  is patched to use `kapsule-wordmark.png` automatically whenever no logo
  image is set in **Theme settings → Logo**; upload a logo there to override it.

## Kapsule sections & blocks

- `sections/kapsule-banner.liquid` — flexible hero/CTA (kicker, heading with
  `<em>` accent support, body, 1–2 buttons, solid/2- or 3-stop gradient
  background, optional 2×2 grid of **real products** pulled from a
  collection). Used for the homepage hero, the Institut teaser, page heroes,
  and the B2B CTA bar.
- `sections/kapsule-meander-band.liquid` — the greek-key pattern band.
- `sections/kapsule-concern-tiles.liquid`, `kapsule-maisons.liquid`,
  `kapsule-ugc-grid.liquid` — homepage-specific blocks from the spec.
- `sections/kapsule-media-card.liquid` — image (or colour-gradient
  placeholder) + info panel; used for the Institut/Pop-up contact cards and,
  with `button_style: link`, for the three alternating Notre Vision rows.
- `sections/kapsule-quote.liquid`, `kapsule-image-grid.liquid`,
  `kapsule-list-rows.liquid`, `kapsule-newsletter.liquid` (real Shopify
  customer-signup form, tagged `newsletter`).
- `blocks/kap-free-ship-bar.liquid` — the 49€ free-shipping progress bar
  (PDP block + `snippets/kap-free-ship-bar-inline.liquid` in the cart
  drawer/cart page); refreshes after add-to-cart via `assets/kap-free-ship-bar.js`.
- `blocks/kap-house-portrait.liquid` — the "LA MAISON" paragraph, keyed off
  `product.vendor` (see **Product data** below — this only works once vendor
  is correct).
- `blocks/kap-panels.liquid` — the Actifs/Texture/Livraison accordion; Actifs
  reads the real `product.metafields.custom.ingredients` INCI metafield.
- `blocks/kap-bundle.liquid` + `assets/kap-bundle.js` — same-house cross-sell:
  finds up to 2 other products with the same vendor, adds all 3 to the real
  Shopify cart in one request via `/cart/add.js`.
- `blocks/kap-sticky-atc.liquid` — the fixed bottom bar on PDP; its button
  just clicks the real native add-to-cart button, so it always reflects the
  selected variant.
- `templates/product.json` — rebuilt on Horizon's native
  `product-information` blocks (variant-picker, buy-buttons,
  `product-recommendations` for "À associer") with the blocks above added
  around them, in the spec's order.
- `templates/index.json`, `page.institut.json`, `page.popup.json`,
  `page.vision.json` — the five pages, in spec order, all copy in French
  (see **Translations** below).

## Product data — action needed

Your `products_export.csv` has `Vendor` set to "Kapsule" on every row, which
is why the prototype had to parse the real house out of the title. **The
theme instead reads `product.vendor` directly** (for the brand pill, the
Boutique "Marques" filter, the maisons panel links, the house portrait and
the same-house bundle) — so it needs that field fixed in your actual catalogue.

I generated `kapsule-products-corrected.csv` (sent alongside this repo) by
applying your own stated rules — keep `status: active` only, drop zero-price
rows and the test product, matched each of the resulting 33 products against
the prototype's authored data — and set:
- **Vendor** → the real house (Mixsoon, Urang, VT Cosmetics, ZISU'C, Tocobo,
  Glash, rom&nd, d'Alba).
- **Tags** → adds `category:<Serums|Toners|Creams|Cleansers|Masks|Makeup>`
  and `concern:<Radiance|Firmness|Dryness|Sensitive|Redness>` tags, which
  drive the homepage concern tiles' links and Boutique's native tag filter.

**Import it in Shopify Admin → Products → Import**, matching by handle, to
apply the fix. Until you do, brand pills/portraits/bundle fall back to the
literal (wrong) "Kapsule" vendor.

## Store setup needed in Shopify admin

1. **Shop name** → "Kapsule" (Settings → General).
2. **Re-import the corrected product CSV** (above) — do this first, everything
   else depends on vendor/tags being right.
3. **Languages** — add French (Settings → Languages) for the header's native
   FR/EN switcher (`show_language` is already on). All of Horizon's own UI
   strings (cart, search, checkout prompts, filters…) already ship translated
   — see **Translations**.
4. **Navigation menus** (Content → Menus):
   - `main-menu` — Accueil, Boutique (→ All collection), Institut, Pop-up,
     Notre vision.
   - `footer` — heading "Services" (La Boutique à Paris, L'Institut à Paris,
     Réserver un soin).
   - `footer-info` — heading "Informations" (Notre vision, Nous contacter).
   - `footer-social` — heading "Suivez-nous" (Instagram, TikTok).
5. **Pages**, each with **Theme template** set: "Institut" → `institut`,
   "Pop-up" → `popup`, "Notre vision" → `vision`. A "Contact" page on
   Horizon's stock `contact` template covers the booking/B2B request links.
6. **Discounts** — the same-house bundle shows a −10% price but only *adds*
   the 3 products at full price (theme code can't apply order-level
   discounts). Create an automatic discount in Shopify Admin → Discounts if
   you want that 10% to actually apply at checkout.

## Translations

Horizon ships full native French (`locales/fr.json`) for all of its own UI
already — nothing to do there. All Kapsule-specific **editorial copy**
(headings, body text, buttons) lives in section/block settings authored in
French, which makes it eligible for Shopify's built-in **Translate and
Adapt** app once French is a published language — that's the native way to
add the English versions, rather than a hand-rolled language switcher.
Two exceptions that are plain Liquid, not settings, so Translate & Adapt
can't reach them: the house portraits (`blocks/kap-house-portrait.liquid`)
and the bundle/panels default copy — flag these if you need them bilingual
and I'll move them into translatable settings.

## Explicitly not built

Per your instructions: **no reviews/star ratings** (removed on client
instruction, not reintroduced). Also out of scope for this pass, given time —
flag if you want them: the 3-question diagnostic quiz modal, the floating
"Commencer le diagnostic" bubble, and UGC/house-logo images (the UGC grid and
maisons row use placeholders/names exactly as the spec says to, pending real
assets).

---

# Horizon

[Getting started](#getting-started) |
[Staying up to date with Horizon changes](#staying-up-to-date-with-horizon-changes) |
[Developer tools](#developer-tools) |
[Contributing](#contributing) |
[License](#license)

Horizon is the flagship of a new generation of first party Shopify themes. It incorporates the latest Liquid Storefronts features, including [theme blocks](https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/quick-start?framework=liquid).

- **Web-native in its purest form:** Themes run on the [evergreen web](https://www.w3.org/2001/tag/doc/evergreen-web/). We leverage the latest web browsers to their fullest, while maintaining support for the older ones through progressive enhancement—not polyfills.
- **Lean, fast, and reliable:** Functionality and design defaults to "no" until it meets this requirement. Code ships on quality. Themes must be built with purpose. They shouldn't support each and every feature in Shopify.
- **Server-rendered:** HTML must be rendered by Shopify servers using Liquid. Business logic and platform primitives such as translations and money formatting don't belong on the client. Async and on-demand rendering of parts of the page is OK, but we do it sparingly as a progressive enhancement.
- **Functional, not pixel-perfect:** The Web doesn't require each page to be rendered pixel-perfect by each browser engine. Using semantic markup, progressive enhancement, and clever design, we ensure that themes remain functional regardless of the browser.

## Getting started

We recommend using the Skeleton Theme as a starting point for a theme development project. [Learn more on Shopify.dev](https://shopify.dev/themes/getting-started/create).

To create a new theme project based on Horizon:

```sh
git clone https://github.com/Shopify/horizon.git
```

Install the [Shopify CLI](https://shopify.dev/docs/storefronts/themes/tools/cli) to connect your local project to a Shopify store. Learn about the [theme developer tools](https://shopify.dev/docs/storefronts/themes/tools) available, and the suggested [developer tools](#developer-tools) below.

Please note that the `main` branch may include code for features not yet released. You may encounter Liquid API properties that are not publicly documented, but will be when the feature is officially rolled out.

### Shopify Theme Store development

If you're building a theme for the Shopify Theme Store, then do not use Horizon as a starting point. Themes based on, derived from, or incorporating Horizon are not eligible for submission to to the Shopify Theme Store. Use the [Skeleton Theme](https://github.com/Shopify/skeleton-theme) instead.

## Staying up to date with Horizon changes

Say you're building a new theme off Horizon but you still want to be able to pull in the latest changes, you can add a remote `upstream` pointing to this Horizon repository.

1. Navigate to your local theme folder.
2. Verify the list of remotes and validate that you have both an `origin` and `upstream`:

```sh
git remote -v
```

3. If you don't see an `upstream`, you can add one that points to Shopify's Horizon repository:

```sh
git remote add upstream https://github.com/Shopify/horizon.git
```

4. Pull in the latest Horizon changes into your repository:

```sh
git fetch upstream
git pull upstream main
```

## Developer tools

There are a number of really useful tools that the Shopify Themes team uses during development. Horizon is already set up to work with these tools.

### Shopify CLI

[Shopify CLI](https://shopify.dev/docs/storefronts/themes/tools/cli) helps you build Shopify themes faster and is used to automate and enhance your local development workflow. It comes bundled with a suite of commands for developing Shopify themes—everything from working with themes on a Shopify store (e.g. creating, publishing, deleting themes) or launching a development server for local theme development.

You can follow this [quick start guide for theme developers](https://shopify.dev/docs/themes/tools/cli) to get started.

### Theme Check

We recommend using [Theme Check](https://github.com/shopify/theme-check) as a way to validate and lint your Shopify themes.

We've added Theme Check to Horizon's [list of VS Code extensions](/.vscode/extensions.json) so if you're using Visual Studio Code as your code editor of choice, you'll be prompted to install the [Theme Check VS Code](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode) extension upon opening VS Code after you've forked and cloned Horizon.

You can also run it from a terminal with the following Shopify CLI command:

```bash
shopify theme check
```

You can follow the [theme check documentation](https://shopify.dev/docs/storefronts/themes/tools/theme-check) for more details.

#### Shopify/theme-check-action

Horizon runs [Theme Check](#Theme-Check) on every commit via [Shopify/theme-check-action](https://github.com/Shopify/theme-check-action).

## Contributing

We are not accepting contributions to Horizon at this time.

## License

Copyright (c) 2025-present Shopify Inc. See [LICENSE](/LICENSE.md) for further details.
