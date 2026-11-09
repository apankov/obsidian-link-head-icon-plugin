import type { IconId } from './icons';

interface Website {
	/** Domains that match, including any of their subdomains. */
	readonly domains: readonly string[];
	/** Optional path prefix the URL must start with. */
	readonly path?: string;
	readonly icon: IconId;
}

/**
 * Known websites. Rules are checked in order and the first match wins, so
 * list more specific rules (with a path) before broader ones.
 */
const WEBSITES: readonly Website[] = [
	{ domains: ['docs.google.com'], path: '/spreadsheets/', icon: 'google-sheets' },
	{ domains: ['docs.google.com'], path: '/document/', icon: 'google-docs' },
	{ domains: ['drive.google.com'], icon: 'google-drive' },
	{ domains: ['youtube.com', 'youtu.be'], icon: 'youtube' },
	{ domains: ['twitter.com'], icon: 'twitter' },
	{ domains: ['x.com'], icon: 'x' },
	{ domains: ['gitlab.com'], icon: 'gitlab' },
	{ domains: ['facebook.com'], icon: 'facebook' },
	{ domains: ['github.com'], icon: 'github' },
	{ domains: ['asana.com'], icon: 'asana' },
	{ domains: ['npmjs.com'], icon: 'npm' },
];

function matchesDomain(hostname: string, domain: string): boolean {
	return hostname === domain || hostname.endsWith(`.${domain}`);
}

/** Returns the icon for a link URL, or undefined if the site is unknown. */
export function findIcon(href: string): IconId | undefined {
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
