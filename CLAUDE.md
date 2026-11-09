# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An Obsidian community plugin ("Link Head Icon", id `link-head-icon`). In reading mode it prepends a small site icon to external links that point at known websites (Google Docs/Sheets/Drive, YouTube, Twitter/X, GitHub, GitLab, Facebook, Asana, npm). Editing mode is not supported yet.

## Commands

Node.js 22.12+.

- `npm run build` — `tsc --noEmit` type check, then the production esbuild bundle `src/main.ts` → `./main.js`.
- `npm run dev` — esbuild watch build.
- `npm run lint` — ESLint with `eslint-plugin-obsidianmd` recommended rules. Run it from the repo root: it also validates `manifest.json` and `package.json`.
- `npm test` — Vitest. Run one test with `npx vitest run -t '<name>'`.
- The `rtk` hook rewrites `npx eslint` output and can garble it. Use `rtk proxy npx eslint .` to see the raw report.

To try a change in Obsidian, copy `main.js`, `manifest.json` and `styles.css` into `<vault>/.obsidian/plugins/link-head-icon/` and reload.

## Architecture

- `src/websites.ts` — pure `findIcon(href)`. It parses the URL and walks an ordered rule list (domains + optional path prefix). A domain also matches its subdomains, and the first matching rule wins. This file has no Obsidian imports so Vitest can load it.
- `src/icons.ts` — maps icon file names to imported PNGs. esbuild inlines them as data URLs (`loader: { ".png": "dataurl" }` in `esbuild.config.mjs`). They must stay bundled because Obsidian installs only `main.js`, `manifest.json` and `styles.css`, so nothing in `assets/` reaches users at runtime.
- `src/main.ts` — a Markdown post-processor finds `a.external-link`, calls `findIcon` on the `href`, and attaches a `MarkdownRenderChild` that prepends an `img.link-head-icon` and removes it on unload.
- Adding a site = PNG in `assets/` + import in `src/icons.ts` + rule in `src/websites.ts` + test case in `test/websites.test.ts`.

## Releasing

`npm version patch|minor|major` bumps `package.json`, then `version-bump.mjs` syncs `manifest.json` and `versions.json`, and npm tags the commit with no `v` prefix (`.npmrc`). Pushing the tag runs `.github/workflows/release.yml`. It checks that the tag equals the manifest version, runs lint, tests and the build, and creates a **draft** GitHub release with the three plugin files. `main.js` is build output and is not tracked in git.
