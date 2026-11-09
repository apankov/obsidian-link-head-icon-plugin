/** An external link found in Markdown source. */
export interface SourceLink {
	/** Start offset of the whole link: the `[` of `[text](url)`, or the URL itself. */
	readonly from: number;
	/** End offset of the whole link. */
	readonly to: number;
	readonly href: string;
}

// [text](url) or [text](<url>), with an optional "title".
const MARKDOWN_LINK = /\[(?:[^\]\n\\]|\\.)*\]\(\s*<?(https?:\/\/[^\s<>)]+)>?(?:\s+"[^"\n]*")?\s*\)/g;
// Bare URL, also inside <...>. Characters that end a bare URL in Obsidian.
const BARE_URL = /https?:\/\/[^\s<>()[\]"'`]+/g;
// Trailing punctuation is part of the sentence, not the URL.
const TRAILING_PUNCTUATION = /[.,;:!?*_~]+$/;

/** Finds external links in Markdown text, in document order. */
export function findLinks(text: string): SourceLink[] {
	const links: SourceLink[] = [];

	// Images ![alt](url) are skipped, but their URL must not count as bare either.
	const taken: SourceLink[] = [];
	for (const match of text.matchAll(MARKDOWN_LINK)) {
		const from = match.index;
		const href = match[1];
		if (href === undefined) {
			continue;
		}
		const link = { from, to: from + match[0].length, href };
		taken.push(link);
		if (text[from - 1] !== '!') {
			links.push(link);
		}
	}

	const insideMarkdownLink = (pos: number) => taken.some((link) => pos >= link.from && pos < link.to);
	const bare: SourceLink[] = [];
	for (const match of text.matchAll(BARE_URL)) {
		const from = match.index;
		if (insideMarkdownLink(from)) {
			continue;
		}
		const href = match[0].replace(TRAILING_PUNCTUATION, '');
		bare.push({ from, to: from + href.length, href });
	}

	return [...links, ...bare].sort((a, b) => a.from - b.from);
}
