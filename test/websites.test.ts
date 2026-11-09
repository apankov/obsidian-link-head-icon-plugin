import { describe, expect, it } from 'vitest';
import { findIcon } from '../src/websites';

describe('findIcon', () => {
	it.each([
		['https://docs.google.com/spreadsheets/d/abc/edit', 'google-sheets'],
		['https://docs.google.com/document/d/abc/edit', 'google-docs'],
		['https://docs.google.com/presentation/d/abc/edit', 'google-slides'],
		['https://docs.google.com/forms/d/abc/viewform', 'google-forms'],
		['https://drive.google.com/drive/folders/abc', 'google-drive'],
		['https://drive.google.com/file/d/abc/view', 'google-drive'],
		['https://www.youtube.com/watch?v=abc', 'youtube'],
		['https://m.youtube.com/watch?v=abc', 'youtube'],
		['https://youtu.be/abc', 'youtube'],
		['https://twitter.com/someone', 'twitter'],
		['https://x.com/someone', 'x'],
		['https://gitlab.com/group/project', 'gitlab'],
		['https://gitlab.example.com/group/project', 'gitlab'],
		['https://www.facebook.com/someone', 'facebook'],
		['https://github.com/owner/repo', 'github'],
		['https://app.asana.com/0/123/456', 'asana'],
		['https://www.npmjs.com/package/obsidian', 'npm'],
		['https://app.clickup.com/t/abc', 'clickup'],
		['https://team.slack.com/archives/C123', 'slack'],
		['https://teams.microsoft.com/l/meetup-join/abc', 'microsoft-teams'],
		['https://miro.com/app/board/abc', 'miro'],
		['https://claude.ai/chat/abc', 'claude'],
		['https://chatgpt.com/c/abc', 'chatgpt'],
		['https://chat.openai.com/c/abc', 'chatgpt'],
		['https://habr.com/ru/articles/123/', 'habr'],
		['https://fathom.video/calls/123', 'fathom'],
		['https://fathom.video/share/abc', 'fathom'],
		['https://medium.com/@someone/post', 'medium'],
		['https://someone.medium.com/post', 'medium'],
		['https://stackoverflow.com/questions/123', 'stackoverflow'],
		['https://en.wikipedia.org/wiki/Obsidian', 'wikipedia'],
		['https://ru.wikipedia.org/wiki/Obsidian', 'wikipedia'],
		['https://www.linkedin.com/in/someone', 'linkedin'],
		['https://www.instagram.com/someone', 'instagram'],
		['https://t.me/someone', 'telegram'],
		['http://github.com/owner/repo', 'github'],
		['https://GitHub.com/owner/repo', 'github'],
	])('maps %s to %s', (url, icon) => {
		expect(findIcon(url)).toBe(icon);
	});

	it.each([
		['unknown site', 'https://example.com/'],
		['lookalike host', 'https://github.com.evil.example/owner/repo'],
		['domain suffix without a dot', 'https://notgithub.com/owner/repo'],
		['other microsoft.com hosts', 'https://www.microsoft.com/'],
		['known domain in the path only', 'https://example.com/github.com/'],
		['docs.google.com outside known paths', 'https://docs.google.com/drawings/d/abc'],
		['gitlab in the middle of a host', 'https://my-gitlab.example.com/'],
		['non-http scheme', 'mailto:someone@github.com'],
		['invalid URL', 'not a url'],
		['empty string', ''],
	])('returns undefined for %s', (_case, url) => {
		expect(findIcon(url)).toBeUndefined();
	});
});
