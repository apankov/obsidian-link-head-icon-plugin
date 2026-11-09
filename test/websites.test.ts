import { describe, expect, it } from 'vitest';
import { findIcon } from '../src/websites';

describe('findIcon', () => {
	it.each([
		['https://docs.google.com/spreadsheets/d/abc/edit', 'google-sheets'],
		['https://docs.google.com/document/d/abc/edit', 'google-docs'],
		['https://drive.google.com/drive/folders/abc', 'google-drive'],
		['https://drive.google.com/file/d/abc/view', 'google-drive'],
		['https://www.youtube.com/watch?v=abc', 'youtube'],
		['https://m.youtube.com/watch?v=abc', 'youtube'],
		['https://youtu.be/abc', 'youtube'],
		['https://twitter.com/someone', 'twitter'],
		['https://x.com/someone', 'x'],
		['https://gitlab.com/group/project', 'gitlab'],
		['https://www.facebook.com/someone', 'facebook'],
		['https://github.com/owner/repo', 'github'],
		['https://app.asana.com/0/123/456', 'asana'],
		['https://www.npmjs.com/package/obsidian', 'npm'],
		['http://github.com/owner/repo', 'github'],
		['https://GitHub.com/owner/repo', 'github'],
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
