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
		this.register(() => icon.remove());
	}
}

export default class LinkHeadIconPlugin extends Plugin {
	onload() {
		this.registerMarkdownPostProcessor((element, context) => {
			element.querySelectorAll<HTMLElement>('a.external-link').forEach((link) => {
				const icon = findIcon(link.innerText.trim());
				const src = icon && ICONS[icon];

				if (src) {
					context.addChild(new LinkIcon(link, src));
				}
			});
		});
	}
}
