# Link Head Icon

An [Obsidian](https://obsidian.md) plugin that puts a small site icon in front of external links, so you can tell a Google Sheet from a GitHub repo or a Slack thread at a glance. The idea comes from how Asana shows links to external documents.

![Light theme: a note in reading view with site icons in front of links to Fathom, Google Docs, Sheets and Slides, GitHub, ClickUp, Asana, Miro, Slack, Teams, YouTube and X](https://raw.githubusercontent.com/apankov/obsidian-link-logos/master/docs/assets/example-light.png)

*Light theme*

![Dark theme: the same note in dark mode, where dark logos such as GitHub and X switch to the text color](https://raw.githubusercontent.com/apankov/obsidian-link-logos/master/docs/assets/example-dark.png)

*Dark theme*

- Works for bare URLs and for titled links like `[budget](https://docs.google.com/spreadsheets/...)`.
- Follows the theme: dark logos such as GitHub and X switch to the text color in dark mode.
- Desktop and mobile.
- No network requests: the icons are bundled into the plugin.
- Reading view only for now. Live Preview support is planned.

## Supported sites

| Category | Sites |
|---|---|
| Google | Docs, Sheets, Slides, Forms, Drive |
| Code | GitHub, GitLab (including self-hosted `gitlab.*`), npm, Stack Overflow |
| Work | Asana, ClickUp, Miro, Slack, Microsoft Teams, Fathom |
| AI | Claude, ChatGPT |
| Video and social | YouTube, X, Twitter, Facebook, Instagram, LinkedIn, Telegram |
| Reading | Wikipedia, Medium, Habr, Yandex |

Missing a site you use? [Open an issue](https://github.com/apankov/obsidian-link-head-icon-plugin/issues).

## Install

From Obsidian: **Settings → Community plugins → Browse**, search for **Link Head Icon**, then **Install** and **Enable**. Or open the [plugin page](https://community.obsidian.md/plugins/link-head-icon).

To try unreleased versions, add `apankov/obsidian-link-head-icon-plugin` in the [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin.

## Credits

Icons come from [Simple Icons](https://simpleicons.org) (CC0), except Fathom and Yandex, which are made from the sites' own logos. Brand names and logos belong to their owners.

## Development

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev    # rebuild main.js on change
npm run build  # type-check and production build
npm run lint
npm test
```

To try it in a vault, copy `main.js`, `manifest.json` and `styles.css` into `<vault>/.obsidian/plugins/link-head-icon/` and reload Obsidian.

To add a site, add its icon to `scripts/generate-icons.mjs`, run `npm run icons`, and add a rule to `src/websites.ts`.

Plans and open work: [roadmap](docs/devel/plans/roadmap.md).

### Releasing

```sh
npm version patch   # bumps package.json, manifest.json and versions.json, then tags
git push --follow-tags
```

The tag triggers a workflow that builds the plugin and creates a draft GitHub release. Publish the draft to make it available in Obsidian.
