/**
 * Known websites: a substring pattern and the icon file shown for it.
 * Patterns are checked in order and the first match wins, so list more
 * specific patterns before broader ones.
 */
const WEBSITES: ReadonlyArray<readonly [pattern: string, icon: string]> = [
	['//docs.google.com/spreadsheets/', 'spreadsheets.png'],
	['//docs.google.com/document/', 'google-docs.png'],
	['//drive.google.com/drive/', 'google-drive.png'],
	['youtube.com/watch', 'youtube.png'],
	['//www.youtube.com/', 'youtube.png'],
	['//youtu.be/', 'youtube.png'],
	['//twitter.com/', 'twitter.png'],
	['//gitlab.com/', 'gitlab.png'],
	['//www.facebook.com/', 'facebook.png'],
	['//github.com/', 'github-light.png'],
	['asana.com/', 'asana.png'],
	['//www.npmjs.com/', 'npmjs.png'],
];

/** Returns the icon file for a link, or undefined if the site is unknown. */
export function findIcon(text: string): string | undefined {
	for (const [pattern, icon] of WEBSITES) {
		if (text.includes(pattern)) {
			return icon;
		}
	}
	return undefined;
}
