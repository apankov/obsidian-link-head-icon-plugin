# Rename the plugin to Link Logos

Status: done in 0.2.2 (2026-11-09), except the catalog entry, which still uses the old id.

## Goal

Rename the plugin from "Link Head Icon" to **Link Logos** everywhere: display
name, plugin id, npm package, CSS classes, GitHub repository, docs. Also fix
the README screenshot, which does not render on the catalog page
(https://community.obsidian.md/plugins/link-head-icon) because it uses
repo-relative paths inside a `<picture>` element.

The owner confirmed that nobody depends on the old id or CSS classes, so no
compatibility shims are needed.

## New names

| What | Old | New |
|---|---|---|
| Display name (`manifest.json` `name`) | Link Head Icon | Link Logos |
| Plugin id (`manifest.json` `id`) | `link-head-icon` | `link-logos` |
| npm package (`package.json` `name`) | `link-head-icon` | `link-logos` |
| Plugin class (`src/main.ts`) | `LinkHeadIconPlugin` | `LinkLogosPlugin` |
| Icon element class | `link-head-icon` | `link-logos-icon` |
| Monochrome icon class | `link-head-icon-mono` | `link-logos-mono` |
| Marker class on the `<a>` | `link-head-icon-link` | `link-logos-link` |
| GitHub repository | `apankov/obsidian-link-head-icon-plugin` | `apankov/obsidian-link-logos` |

The local working directory keeps its current path. Do not rename it.

## Steps

Follow the repo's commit rules: commit with `committer` (never `git add`),
Conventional Commits, one logical change per commit, end every message with
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Delete files with
`trash`, not `rm`. Commit straight to `master`.

1. **Code and CSS.** Rename the plugin class and the three CSS classes in
   `src/main.ts` and `styles.css`. Grep the whole repo (excluding
   `node_modules`) for `link-head-icon`, `LinkHeadIcon`, `Link Head Icon` and
   `head-icon` afterwards; nothing should remain except history notes in
   `docs/devel/plans/` and this file.
2. **Manifest and package.** Set `id`, `name` in `manifest.json` and `name` in
   `package.json` (run `npm install` so `package-lock.json` follows). Keep the
   description in `manifest.json` accurate and passing `npm run lint` (the
   obsidianmd rules validate it). `versions.json` stays as is.
3. **GitHub repository.** `gh repo rename obsidian-link-logos -R
   apankov/obsidian-link-head-icon-plugin --yes`, then point the local remote
   at the new URL: `git remote set-url origin
   git@github.com:apankov/obsidian-link-logos.git`. Update the repo
   description with `gh repo edit`. Check that `gh repo view
   apankov/obsidian-link-logos` works.
4. **README screenshot.** The catalog page does not render `<picture>` or
   repo-relative image paths. Replace the `<picture>` block with plain
   Markdown images using absolute URLs on `raw.githubusercontent.com` for the
   new repo name, e.g.
   `https://raw.githubusercontent.com/apankov/obsidian-link-logos/master/docs/assets/example-light.png`.
   Show the light screenshot, then the dark one, with short captions ("Light
   theme", "Dark theme") or a one-line note that icons follow the theme.
   Keep the alt text descriptive.
5. **Docs.** Update README (title, text, install instructions: search the
   catalog for "Link Logos", BRAT repo path `apankov/obsidian-link-logos`,
   issue links, manual install folder `<vault>/.obsidian/plugins/link-logos/`),
   `CLAUDE.md` (name, id, class names, plugin folder), and
   `docs/devel/plans/roadmap.md` (add a "Rename to Link Logos" section with
   the items checked off). Update the GitHub URL in `docs/` and anywhere else
   it appears.
6. **Test note in the owner's vault.** Rename
   `/Users/andrey/Library/Mobile Documents/iCloud~md~obsidian/Documents/Vault/Link Head Icon test.md`
   to `Link Logos test.md` (use `mv`; it is not in git) and replace the plugin
   name and the plugin repo URL inside it. Do not touch anything in the
   vault's `.obsidian/` folder.
7. **Checks.** `npm run lint`, `npm test`, `npm run build` must all pass.
   Inspect `main.js` for the new class names
   (`grep -c link-logos-icon main.js`).
8. **Push.** `git push origin master`, then wait for the CI workflow to
   succeed (`gh run watch`).
9. **Release.** `npm version patch` (tags without a `v` prefix via
   `.npmrc`), `git push --follow-tags`, wait for the Release workflow, check
   that the draft release has `main.js`, `manifest.json` and `styles.css` and
   that the released `manifest.json` has `"id": "link-logos"`, then publish
   it with `gh release edit <version> --draft=false`.
10. **Catalog: research only, do not submit anything.** The catalog lists the
    plugin under id `link-head-icon`. Find out how a plugin id, name and repo
    change reaches the catalog (community.obsidian.md and/or the
    `obsidianmd/obsidian-releases` repository and its `community-plugins.json`;
    read their contributing docs). Report the exact steps needed. Do **not**
    open pull requests, issues or comments in any repository other than
    `apankov/obsidian-link-logos`: that is the owner's call.

## How to verify

- `grep -rn "link-head-icon\|LinkHeadIcon\|Link Head Icon\|head-icon" --exclude-dir=node_modules --exclude-dir=.git .`
  finds only history mentions in `docs/devel/plans/`.
- `npm run lint && npm test && npm run build` pass.
- `main.js` contains `link-logos-icon`, `link-logos-link`, `link-logos-mono`
  and no `link-head-icon`.
- `gh repo view apankov/obsidian-link-logos` works; `git remote -v` points at
  it; the old URL redirects.
- CI on `master` is green; the new GitHub release is published, not a draft,
  and its `manifest.json` says `"id": "link-logos"`, `"name": "Link Logos"`.
- The README image URLs return HTTP 200:
  `curl -sI <url> | head -1`.
- The vault has `Link Logos test.md` and no `Link Head Icon test.md`.
- `git status` is clean apart from untracked files that were already there.
- A report on how to update the catalog entry, with sources.
