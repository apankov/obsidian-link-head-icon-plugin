import { Plugin, MarkdownRenderChild } from 'obsidian';
import { getAssetsPathResolver } from './util';
import { findIcon } from './websites';

class LinkIcon extends MarkdownRenderChild {
	website: string;
	resolver: (i: string) => string;

	constructor(containerEl: HTMLElement, resolver: (i: string) => string, website: string) {
		super(containerEl);

		this.website = website;
		this.resolver = resolver;
	}

	onload() {
		const icon = this.containerEl.createEl('div', { attr: {
			class: 'external-link-icon',
			style: 'background-image: url("'+this.resolver(this.website)+'");',
		}});

		this.containerEl.prepend(icon);
	}
}

export default class LinkHeadIconPlugin extends Plugin {
	async onload() {
		this.registerMarkdownPostProcessor((element, context) => {
			const links = element.querySelectorAll("a.external-link");

			const resolver = getAssetsPathResolver(this, 'assets');

			for (let index = 0; index < links.length; index++) {
				const link = links.item(index) as HTMLElement;
				const website = findIcon(link.innerText.trim());

				if (website) {
					context.addChild(new LinkIcon(link, resolver, website));
				}
			}
		});
	}
}
