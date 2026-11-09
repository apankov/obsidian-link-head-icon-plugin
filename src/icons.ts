import { ICONS } from './icons.generated';

export { ICONS };

/** The parts of a simple-icons entry the plugin uses. */
export interface BrandIcon {
	/** SVG path data for a 24×24 viewBox. */
	readonly path: string;
	/** Brand color as six hex digits, without '#'. */
	readonly hex: string;
}

// Fails to compile if the generated data stops matching BrandIcon.
ICONS satisfies Record<string, BrandIcon>;

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
