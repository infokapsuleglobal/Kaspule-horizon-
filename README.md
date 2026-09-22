# Kapsule — built on Shopify Horizon

This theme is [Shopify Horizon](https://github.com/Shopify/horizon) with a Kapsule
brand layer on top: colours, typography, a recreated logo mark, and a set of
bespoke `kapsule-*` sections used to reproduce the Kapsule concept-store design
(hero banners, the meander pattern band, quote block, info grid, image mosaic,
list rows, and the media + contact-card panel). Everything else — header, footer,
product/collection pages, cart, search — is stock Horizon, only reskinned via
`config/settings_data.json` and `snippets/kapsule-overrides.liquid`.

## What's Kapsule-specific

- `config/settings_data.json` — `color_palette` set to the Kapsule palette
  (cream `#F7F4EE` / ink `#1A1714` / near-black `#141210` for the footer).
  Every other theme colour (buttons, badges, inputs) derives from this
  automatically via Horizon's smart-contrast system.
- `snippets/kapsule-overrides.liquid` — loads Spectral from Google Fonts for
  headings/accents, and holds all the bespoke component CSS. Rendered at the
  end of `<head>` in `layout/theme.liquid` so it wins the cascade.
- `assets/kapsule-monogram.svg`, `kapsule-wordmark.svg`, `kapsule-wordmark-footer.svg`
  — the interlocking ribbon "K" mark, recreated as SVG (no logo image is set
  in theme settings, so the header falls back to the shop name — styled with
  the monogram as a `::before` icon; upload a real logo image in
  **Theme settings → Logo** to replace it wholesale).
- `sections/kapsule-*.liquid` — nine new sections: `kapsule-rainbow-bar`,
  `kapsule-banner` (hero / CTA bar, flexible via blocks), `kapsule-media-card`
  (image + info-card panel, used for both the dark contact cards and the
  Notre Vision story rows), `kapsule-feature-cards`, `kapsule-meander-band`,
  `kapsule-quote`, `kapsule-info-grid`, `kapsule-image-grid`, `kapsule-list-rows`.
  Each is a normal Shopify section with its own schema — add, remove, or
  reorder them from the theme editor like any other section.
- `templates/index.json`, `templates/page.institut.json`,
  `templates/page.popup.json`, `templates/page.vision.json` — pages built
  from the sections above.

## Store setup needed after installing this theme

Theme code ships the layout and design; the following are store content and
have to be set up once in Shopify admin:

1. **Shop name** — set to "Kapsule" in **Settings → General** (used as the
   header logo text until a real logo image is uploaded).
2. **Languages** — add French under **Settings → Languages** so the header's
   built-in FR/EN switcher has something to switch to.
3. **Navigation menus** (**Content → Menus**), matching the handles already
   wired into the header/footer:
   - `main-menu` — Accueil (`/`), Boutique (→ a collection), Institut
     (→ the Institut page), Pop-up (→ the Pop-up page), Notre vision
     (→ the Notre vision page).
   - `footer` — heading "Services" (La Boutique à Paris, L'Institut à Paris,
     Réserver un soin).
   - `footer-info` — heading "Informations" (Notre vision, Nous contacter).
   - `footer-social` — heading "Suivez-nous" (Instagram, TikTok).
4. **Pages** (**Content → Pages**), each with **Theme template** set as noted:
   - "Institut" → template `institut`
   - "Pop-up" → template `popup`
   - "Notre vision" → template `vision`
5. **Products & collections** — the homepage bestsellers grid and the
   Boutique page pull from real store collections/products; add these in
   **Products** / **Collections** and point the `kap_bestsellers` section's
   collection setting at the right one.
6. Any `kapsule-media-card` / `kapsule-image-grid` section left without an
   uploaded image falls back to a brand-colour gradient placeholder, so the
   theme looks complete before real photography is added — swap in real
   images from the theme editor whenever they're ready.

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
