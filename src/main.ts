import { Plugin, MarkdownRenderChild } from 'obsidian';
import { ICONS } from './icons';
import { findIcon } from './websites';

class LinkIcon extends MarkdownRenderChild {
	constructor(containerEl: HTMLElement, private readonly src: string) {
		super(containerEl);
	}

	onload() {
		const icon = createEl('img', {
			cls: 'link-head-icon',
			attr: { src: this.src, alt: '' },
		});
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
				const src = icon && ICONS[icon];

				if (src) {
					context.addChild(new LinkIcon(link, src));
				}
			});
		});
	}
}
