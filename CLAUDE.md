# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An Obsidian community plugin ("Link Head Icon", id `link-head-icon`). In reading mode it prepends a small site icon to external links that point at known websites (the list lives in `src/websites.ts`). Editing mode is not supported yet. Planned work and the local issue list: `docs/devel/plans/roadmap.md`.

## Commands

Node.js 22.12+.

- `npm run build` — `tsc --noEmit` type check, then the production esbuild bundle `src/main.ts` → `./main.js`.
- `npm run dev` — esbuild watch build.
- `npm run lint` — ESLint with `eslint-plugin-obsidianmd` recommended rules. Run it from the repo root: it also validates `manifest.json` and `package.json`.
- `npm test` — Vitest. Run one test with `npx vitest run -t '<name>'`.
- `npm run icons` — regenerate `src/icons.generated.ts` from `scripts/generate-icons.mjs`.
- The `rtk` hook rewrites `npx eslint` output and can garble it. Use `rtk proxy npx eslint .` to see the raw report.

To try a change in Obsidian, copy `main.js`, `manifest.json` and `styles.css` into `<vault>/.obsidian/plugins/link-head-icon/` and reload.

## Architecture

- `src/websites.ts` — pure `findIcon(href)`. It parses the URL and walks an ordered rule list (domains + optional path prefix). A domain also matches its subdomains, and the first matching rule wins. This file has no Obsidian imports so Vitest can load it.
- Icons are SVG paths from simple-icons (CC0). `scripts/generate-icons.mjs` holds the icon list, pulls each entry from `simple-icons` or, for icons removed upstream (Twitter bird, Slack, LinkedIn, OpenAI, Teams), from `simple-icons-legacy` (an npm alias for simple-icons 9). Icons with no usable simple-icons version (Fathom, Habr, Yandex) live as single-path 24×24 SVGs in `scripts/icons/`. The generator needs exactly one `<path>` per icon, and holes must have the opposite winding direction because the renderer uses the default nonzero fill rule. It simplifies paths with svgo and writes `src/icons.generated.ts` (committed). Bundling simple-icons entries directly would ship their full SVG and metadata and double `main.js`.
- `src/icons.ts` — `IconId`, and `isMonochrome`: near-black brand colors get the `link-head-icon-mono` class, which draws them in `--text-normal` so they stay visible in dark mode.
- `src/main.ts` — a Markdown post-processor finds `a.external-link`, calls `findIcon` on the `href`, and attaches a `MarkdownRenderChild` that prepends an inline `svg.link-head-icon` (built with `createSvg`, hence `minAppVersion` 1.1.0) and marks the link with `link-head-icon-link`. Both are removed on unload, and `styles.css` targets only marked links.
- Adding a site = entry in `scripts/generate-icons.mjs` + `npm run icons` + rule in `src/websites.ts` + test case in `test/websites.test.ts`.

## Releasing

`npm version patch|minor|major` bumps `package.json`, then `version-bump.mjs` syncs `manifest.json` and `versions.json`, and npm tags the commit with no `v` prefix (`.npmrc`). Pushing the tag runs `.github/workflows/release.yml`. It checks that the tag equals the manifest version, runs lint, tests and the build, and creates a **draft** GitHub release with the three plugin files. `main.js` is build output and is not tracked in git.
