import type { IconId } from './icons';

interface Website {
	/** Domains that match, including any of their subdomains. */
	readonly domains?: readonly string[];
	/** Host prefix that matches any domain, e.g. 'gitlab.' for self-hosted GitLab. */
	readonly hostPrefix?: string;
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
	{ domains: ['docs.google.com'], path: '/presentation/', icon: 'google-slides' },
	{ domains: ['docs.google.com'], path: '/forms/', icon: 'google-forms' },
	{ domains: ['drive.google.com'], icon: 'google-drive' },
	{ domains: ['youtube.com', 'youtu.be'], icon: 'youtube' },
	{ domains: ['twitter.com'], icon: 'twitter' },
	{ domains: ['x.com'], icon: 'x' },
	{ domains: ['gitlab.com'], icon: 'gitlab' },
	{ hostPrefix: 'gitlab.', icon: 'gitlab' },
	{ domains: ['facebook.com'], icon: 'facebook' },
	{ domains: ['github.com'], icon: 'github' },
	{ domains: ['asana.com'], icon: 'asana' },
	{ domains: ['npmjs.com'], icon: 'npm' },
	{ domains: ['clickup.com'], icon: 'clickup' },
	{ domains: ['slack.com'], icon: 'slack' },
	{ domains: ['teams.microsoft.com'], icon: 'microsoft-teams' },
	{ domains: ['miro.com'], icon: 'miro' },
	{ domains: ['claude.ai'], icon: 'claude' },
	{ domains: ['chatgpt.com', 'chat.openai.com'], icon: 'chatgpt' },
	{ domains: ['habr.com'], icon: 'habr' },
	{ domains: ['medium.com'], icon: 'medium' },
	{ domains: ['stackoverflow.com'], icon: 'stackoverflow' },
	{ domains: ['wikipedia.org'], icon: 'wikipedia' },
	{ domains: ['linkedin.com'], icon: 'linkedin' },
	{ domains: ['instagram.com'], icon: 'instagram' },
	{ domains: ['t.me', 'telegram.me', 'telegram.org'], icon: 'telegram' },
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
	const website = WEBSITES.find(({ domains, hostPrefix, path }) =>
		(domains?.some((domain) => matchesDomain(hostname, domain)) ||
			(hostPrefix !== undefined && hostname.startsWith(hostPrefix))) &&
		(path === undefined || url.pathname.startsWith(path)),
	);
	return website?.icon;
}
