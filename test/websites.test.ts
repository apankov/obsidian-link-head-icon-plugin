import { describe, expect, it } from 'vitest';
import { findIcon } from '../src/websites';

describe('findIcon', () => {
	it.each([
		['https://docs.google.com/spreadsheets/d/abc/edit', 'spreadsheets.png'],
		['https://docs.google.com/document/d/abc/edit', 'google-docs.png'],
		['https://drive.google.com/drive/folders/abc', 'google-drive.png'],
		['https://drive.google.com/file/d/abc/view', 'google-drive.png'],
		['https://www.youtube.com/watch?v=abc', 'youtube.png'],
		['https://m.youtube.com/watch?v=abc', 'youtube.png'],
		['https://youtu.be/abc', 'youtube.png'],
		['https://twitter.com/someone', 'twitter.png'],
		['https://x.com/someone', 'twitter.png'],
		['https://gitlab.com/group/project', 'gitlab.png'],
		['https://www.facebook.com/someone', 'facebook.png'],
		['https://github.com/owner/repo', 'github-light.png'],
		['https://app.asana.com/0/123/456', 'asana.png'],
		['https://www.npmjs.com/package/obsidian', 'npmjs.png'],
		['http://github.com/owner/repo', 'github-light.png'],
		['https://GitHub.com/owner/repo', 'github-light.png'],
	])('maps %s to %s', (url, icon) => {
		expect(findIcon(url)).toBe(icon);
	});

	it.each([
		['unknown site', 'https://example.com/'],
		['lookalike host', 'https://github.com.evil.example/owner/repo'],
		['domain suffix without a dot', 'https://notgithub.com/owner/repo'],
		['known domain in the path only', 'https://example.com/github.com/'],
		['docs.google.com outside known paths', 'https://docs.google.com/forms/d/abc'],
		['non-http scheme', 'mailto:someone@github.com'],
		['invalid URL', 'not a url'],
		['empty string', ''],
	])('returns undefined for %s', (_case, url) => {
		expect(findIcon(url)).toBeUndefined();
	});
});
