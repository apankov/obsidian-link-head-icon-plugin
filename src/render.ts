import { type BrandIcon, isMonochrome } from './icons';

/** Builds the inline SVG icon shown in front of a link. */
export function createIcon(brand: BrandIcon): SVGSVGElement {
	const icon = createSvg('svg', {
		cls: isMonochrome(brand.hex) ? ['link-logos-icon', 'link-logos-mono'] : 'link-logos-icon',
		// width/height keep the icon small even when styles.css is not loaded.
		attr: { viewBox: '0 0 24 24', width: 16, height: 16, fill: `#${brand.hex}`, 'aria-hidden': 'true' },
	});
	icon.createSvg('path', { attr: { d: brand.path } });
	return icon;
}
