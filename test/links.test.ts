import { describe, expect, it } from 'vitest';
import { findLinks } from '../src/links';

const hrefs = (text: string) => findLinks(text).map((link) => link.href);

describe('findLinks', () => {
	it('finds a titled link and covers the whole [text](url)', () => {
		const text = 'See [the repo](https://github.com/a/b) now';
		expect(findLinks(text)).toEqual([
			{ from: 4, to: 38, href: 'https://github.com/a/b' },
		]);
		expect(text.slice(4, 38)).toBe('[the repo](https://github.com/a/b)');
	});

	it('finds a bare URL', () => {
		const text = 'Go to https://github.com/a/b today';
		expect(findLinks(text)).toEqual([{ from: 6, to: 28, href: 'https://github.com/a/b' }]);
	});

	it('does not report the URL inside a titled link twice', () => {
		expect(hrefs('[x](https://github.com/a)')).toEqual(['https://github.com/a']);
	});

	it('handles angle brackets and titles in titled links', () => {
		expect(hrefs('[x](<https://github.com/a>)')).toEqual(['https://github.com/a']);
		expect(hrefs('[x](https://github.com/a "Title")')).toEqual(['https://github.com/a']);
	});

	it('handles a bare URL in angle brackets', () => {
		expect(hrefs('<https://github.com/a>')).toEqual(['https://github.com/a']);
	});

	it('drops trailing sentence punctuation from bare URLs', () => {
		expect(hrefs('Look at https://github.com/a/b.')).toEqual(['https://github.com/a/b']);
		expect(hrefs('(see https://github.com/a/b)')).toEqual(['https://github.com/a/b']);
		expect(hrefs('**https://github.com/a**')).toEqual(['https://github.com/a']);
	});

	it('keeps query strings and fragments', () => {
		expect(hrefs('https://www.youtube.com/watch?v=abc&t=1#x')).toEqual(['https://www.youtube.com/watch?v=abc&t=1#x']);
	});

	it('returns links in document order', () => {
		expect(hrefs('https://a.example [b](https://b.example) https://c.example')).toEqual([
			'https://a.example',
			'https://b.example',
			'https://c.example',
		]);
	});

	it('skips embedded images, including their URL', () => {
		expect(hrefs('![logo](https://github.com/logo.png) [x](https://github.com/a)')).toEqual(['https://github.com/a']);
	});

	it('ignores wikilinks, images of local files and non-http schemes', () => {
		expect(hrefs('[[Note]] ![[pic.png]] [mail](mailto:a@b.c) obsidian://open')).toEqual([]);
	});
});
