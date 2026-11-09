import { Plugin, MarkdownRenderChild } from 'obsidian';
import { type BrandIcon, ICONS, isMonochrome } from './icons';
import { findIcon } from './websites';

class LinkIcon extends MarkdownRenderChild {
	constructor(containerEl: HTMLElement, private readonly brand: BrandIcon) {
		super(containerEl);
	}

	onload() {
		const icon = createSvg('svg', {
			cls: isMonochrome(this.brand.hex) ? ['link-head-icon', 'link-head-icon-mono'] : 'link-head-icon',
			attr: { viewBox: '0 0 24 24', fill: `#${this.brand.hex}`, 'aria-hidden': 'true' },
		});
		icon.createSvg('path', { attr: { d: this.brand.path } });

		this.containerEl.prepend(icon);
		this.containerEl.addClass('link-head-icon-link');
		this.register(() => {
			icon.remove();
			this.containerEl.removeClass('link-head-icon-link');
		});
	}
}

export default class LinkHeadIconPlugin extends Plugin {
	onload() {
		this.registerMarkdownPostProcessor((element, context) => {
			element.querySelectorAll<HTMLElement>('a.external-link').forEach((link) => {
				const icon = findIcon(link.getAttribute('href') ?? '');

				if (icon) {
					context.addChild(new LinkIcon(link, ICONS[icon]));
				}
			});
		});
	}
}
