import {
	siAsana,
	siFacebook,
	siGithub,
	siGitlab,
	siGoogledocs,
	siGoogledrive,
	siGooglesheets,
	siNpm,
	siX,
	siYoutube,
} from 'simple-icons';
// Icons removed from current simple-icons releases.
import { siTwitter } from 'simple-icons-legacy';

/** The parts of a simple-icons entry the plugin uses. */
export interface BrandIcon {
	/** SVG path data for a 24×24 viewBox. */
	readonly path: string;
	/** Brand color as six hex digits, without '#'. */
	readonly hex: string;
}

/**
 * Brand icons from simple-icons (CC0): one 24×24 SVG path and a brand color
 * each. esbuild tree-shakes the package, so only these end up in main.js.
 */
export const ICONS = {
	'asana': siAsana,
	'facebook': siFacebook,
	'github': siGithub,
	'gitlab': siGitlab,
	'google-docs': siGoogledocs,
	'google-drive': siGoogledrive,
	'google-sheets': siGooglesheets,
	'npm': siNpm,
	'twitter': siTwitter,
	'x': siX,
	'youtube': siYoutube,
} satisfies Record<string, BrandIcon>;

export type IconId = keyof typeof ICONS;

/**
 * True for near-black brand colors (GitHub, X, ...). Those icons are drawn in
 * the theme's text color instead so they stay visible in dark mode.
 */
export function isMonochrome(hex: string): boolean {
	const channel = (offset: number) => {
		const c = parseInt(hex.slice(offset, offset + 2), 16) / 255;
		return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	};
	const luminance = 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
	return luminance < 0.05;
}
