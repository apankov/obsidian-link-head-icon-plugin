interface Website {
	/** Domains that match, including any of their subdomains. */
	readonly domains: readonly string[];
	/** Optional path prefix the URL must start with. */
	readonly path?: string;
	readonly icon: string;
}

/**
 * Known websites. Rules are checked in order and the first match wins, so
 * list more specific rules (with a path) before broader ones.
 */
const WEBSITES: readonly Website[] = [
	{ domains: ['docs.google.com'], path: '/spreadsheets/', icon: 'spreadsheets.png' },
	{ domains: ['docs.google.com'], path: '/document/', icon: 'google-docs.png' },
	{ domains: ['drive.google.com'], icon: 'google-drive.png' },
	{ domains: ['youtube.com', 'youtu.be'], icon: 'youtube.png' },
	{ domains: ['twitter.com', 'x.com'], icon: 'twitter.png' },
	{ domains: ['gitlab.com'], icon: 'gitlab.png' },
	{ domains: ['facebook.com'], icon: 'facebook.png' },
	{ domains: ['github.com'], icon: 'github-light.png' },
	{ domains: ['asana.com'], icon: 'asana.png' },
	{ domains: ['npmjs.com'], icon: 'npmjs.png' },
];

function matchesDomain(hostname: string, domain: string): boolean {
	return hostname === domain || hostname.endsWith(`.${domain}`);
}

/** Returns the icon file for a link URL, or undefined if the site is unknown. */
export function findIcon(href: string): string | undefined {
	let url: URL;
	try {
		url = new URL(href);
	} catch {
		return undefined;
	}
	if (url.protocol !== 'https:' && url.protocol !== 'http:') {
		return undefined;
	}

	const hostname = url.hostname.toLowerCase();
	const website = WEBSITES.find(({ domains, path }) =>
		domains.some((domain) => matchesDomain(hostname, domain)) &&
		(path === undefined || url.pathname.startsWith(path)),
	);
	return website?.icon;
}
