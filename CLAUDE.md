# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An Obsidian community plugin ("Link Head Icon", id `link-head-icon`). In reading mode it prepends a small site icon to external links that point at known websites (Google Docs/Sheets/Drive, YouTube, GitHub, GitLab, Twitter, Facebook, Asana, npm). Editing mode and mobile are not supported yet (see README TODO).

## Commands

- `npm install` — install dev dependencies (Rollup 2, TypeScript 4.2, `obsidian` 0.12 typings).
- `npm run build` — production bundle via Rollup: `src/main.ts` → `./main.js` (CJS, `obsidian` external, inline sourcemap).
- `npm run dev` — watch build via esbuild. `esbuild` is **not** in `devDependencies`; it must be installed globally or added first.

There are no tests and no linter. To verify a change, build and load the plugin into a vault: copy `main.js`, `manifest.json`, `styles.css` and the `assets/` folder into `<vault>/.obsidian/plugins/link-head-icon/`, then reload Obsidian.

## Architecture

- `src/main.ts` — the whole plugin. `LinkHeadIconPlugin.onload` registers a Markdown post-processor that scans rendered `a.external-link` elements. For each link it checks the `WEBSITES` map (substring pattern → icon filename) in insertion order; the first match wins, so put more specific patterns before broader ones. A `LinkIcon` (`MarkdownRenderChild`) then prepends a `div.external-link-icon` with the icon as an inline `background-image`.
- Matching runs against the link's **visible text** (`innerText`), not its `href`. Links with custom titles (`[title](url)`) therefore get no icon.
- `src/util.ts` — `getAssetsPathResolver` builds a vault resource URL for `<configDir>/plugins/<manifest.id>/assets/<file>`. Icons are loaded from the installed plugin folder at runtime, so they are not bundled into `main.js`.
- `assets/*.png` — the icons. Adding a site = drop a PNG here and add an entry to `WEBSITES`.
- `styles.css` — sizing/alignment for `.external-link-icon`.

## Releasing

- Bump `version` in both `manifest.json` and `package.json`, and add the version to `versions.json` (plugin version → minimum Obsidian version).
- Pushing any git tag triggers `.github/workflows/release.yml`, which builds and attaches `main.js`, `manifest.json`, `styles.css` and a zip to a GitHub release. The workflow does **not** ship `assets/`, even though the plugin loads icons from there at runtime.
- `main.js` is listed in `.gitignore` but is still tracked in git, so rebuilt output shows up as a modification.
