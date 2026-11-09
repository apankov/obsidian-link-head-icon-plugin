import { Plugin, MarkdownRenderChild } from 'obsidian';
import { type BrandIcon, ICONS } from './icons';
import { livePreviewIcons } from './live-preview';
import { createIcon } from './render';
import { findIcon } from './websites';

class LinkIcon extends MarkdownRenderChild {
	constructor(containerEl: HTMLElement, private readonly brand: BrandIcon) {
		super(containerEl);
	}

	onload() {
		const icon = createIcon(this.brand);
		this.containerEl.prepend(icon);
		this.containerEl.addClass('link-logos-link');
		this.register(() => {
			icon.remove();
			this.containerEl.removeClass('link-logos-link');
		});
	}
}

export default class LinkLogosPlugin extends Plugin {
	onload() {
		this.registerEditorExtension(livePreviewIcons);

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
