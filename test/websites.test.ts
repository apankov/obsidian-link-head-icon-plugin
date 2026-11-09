import { describe, expect, it } from 'vitest';
import { findIcon } from '../src/websites';

describe('findIcon', () => {
	it.each([
		['https://docs.google.com/spreadsheets/d/abc/edit', 'spreadsheets.png'],
		['https://docs.google.com/document/d/abc/edit', 'google-docs.png'],
		['https://drive.google.com/drive/folders/abc', 'google-drive.png'],
		['https://www.youtube.com/watch?v=abc', 'youtube.png'],
		['https://youtu.be/abc', 'youtube.png'],
		['https://twitter.com/someone', 'twitter.png'],
		['https://gitlab.com/group/project', 'gitlab.png'],
		['https://www.facebook.com/someone', 'facebook.png'],
		['https://github.com/owner/repo', 'github-light.png'],
		['https://app.asana.com/0/123/456', 'asana.png'],
		['https://www.npmjs.com/package/obsidian', 'npmjs.png'],
	])('maps %s to %s', (url, icon) => {
		expect(findIcon(url)).toBe(icon);
	});

	it('returns undefined for unknown sites', () => {
		expect(findIcon('https://example.com/')).toBeUndefined();
	});
});
