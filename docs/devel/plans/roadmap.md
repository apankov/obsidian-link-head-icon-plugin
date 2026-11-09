# Roadmap

Local issue list. Check items off in the commit that closes them.

## 0.2.0 — icons

- [x] Scope `styles.css` to links that get an icon (it currently changes word-break on every external link).
- [x] Switch from PNG to SVG brand icons from [simple-icons](https://simpleicons.org) (CC0), ~20 KB instead of ~84 KB.
- [x] Theme-aware icons: near-black brands (GitHub, X, Medium, Wikipedia, ...) use the theme text color so they stay visible in dark mode.
- [x] Separate icons for x.com (X logo) and twitter.com (bird).
- [x] Google Slides, Google Forms, and self-hosted GitLab (`gitlab.*` hosts).
- [x] Sites found in the author's vault: ClickUp, Habr, Slack, Claude, ChatGPT, Miro, Medium, Instagram, Telegram, LinkedIn, Wikipedia, Stack Overflow, Microsoft Teams.

## 0.2.1 — icons the vault scan turned up

- [x] Fathom: simple-icons' "Fathom" is Fathom Analytics, so the icon is made from fathom.video's logo.
- [x] Habr: the current simple-icons logo is an unreadable scribble at 16 px; use the compact one from simple-icons 3.
- [x] Yandex: traced from the ya.ru favicon.
- [x] Ignore `.serena/`.

Still without an icon (no source in any simple-icons release): Tactiq, Rutube.

## 0.3.0 — settings and editing mode

- [x] Settings tab: one toggle, declared for Obsidian 1.13+ settings search.
- [x] Icons in Live Preview (CodeMirror extension), toggle in settings, on by default. Skips code, front matter and math; hidden while the cursor is in the link.
- [x] Owner tested Live Preview comfort in daily use.

## Community catalog

- [x] Listed in the catalog: https://community.obsidian.md/plugins/link-head-icon
- [x] README: install from the catalog, new screenshot.

## Rename to Link Logos

Plan: [rename-to-link-logos](rename-to-link-logos.md).

- [x] Plugin id `link-logos`, display name "Link Logos", npm package and CSS classes renamed.
- [x] GitHub repository renamed to `apankov/obsidian-link-logos`.
- [x] README screenshots use absolute image URLs so they render on the catalog page.
- [ ] Catalog entry follows the new id and name.

## 0.4.0 — user-defined sites

- [ ] User-defined domain → icon rules in settings.
- [ ] Optional favicon fallback for unknown sites (off by default; network use must be disclosed).
