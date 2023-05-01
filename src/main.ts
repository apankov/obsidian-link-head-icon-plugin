import { Plugin, MarkdownRenderChild } from 'obsidian';
import { getAssetsPathResolver } from './util';

const WEBSITES: Record<string, string> = {
	'//docs.google.com/spreadsheets/': 'spreadsheets.png',
	'//docs.google.com/document/': 'google-docs.png',
	'//drive.google.com/drive/': 'google-drive.png',
	'youtube.com/watch': 'youtube.png',
	'//www.youtube.com/': 'youtube.png',
	'//youtu.be/': 'youtube.png',
	'//twitter.com/': 'twitter.png',
	'//gitlab.com/': 'gitlab.png',
	'//www.facebook.com/': 'facebook.png',
	'//github.com/': 'github-light.png',
	'asana.com/': 'asana.png',
	'//www.npmjs.com/': 'npmjs.png',
};

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
				const text = link.innerText.trim();

				for (const pattern in WEBSITES) {
					if (text.includes(pattern)) {
						const website = WEBSITES[pattern];
						context.addChild(new LinkIcon(link, resolver, website));
						break;
					}
				}
			}
		});
	}
}
