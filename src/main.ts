import { Plugin, MarkdownRenderChild } from 'obsidian';
import type { Extension } from '@codemirror/state';
import { type BrandIcon, ICONS } from './icons';
import { livePreviewIcons } from './live-preview';
import { createIcon } from './render';
import { DEFAULT_SETTINGS, type LinkLogosSettings, LinkLogosSettingTab } from './settings';
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
	settings: LinkLogosSettings = { ...DEFAULT_SETTINGS };

	// Registered once; its contents follow the Live Preview setting.
	private readonly editorExtensions: Extension[] = [];

	// Icons in rendered Markdown belong to the render's lifecycle, not the
	// plugin's, so the plugin removes them itself when it is disabled.
	private readonly renderedIcons = new Set<LinkIcon>();

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new LinkLogosSettingTab(this.app, this));

		this.registerEditorExtension(this.editorExtensions);
		this.applyEditorSetting();

		this.registerMarkdownPostProcessor((element, context) => {
			element.querySelectorAll<HTMLElement>('a.external-link').forEach((link) => {
				const icon = findIcon(link.getAttribute('href') ?? '');

				if (icon) {
					const child = new LinkIcon(link, ICONS[icon]);
					this.renderedIcons.add(child);
					child.register(() => this.renderedIcons.delete(child));
					context.addChild(child);
				}
			});
		});
	}

	onunload() {
		for (const child of [...this.renderedIcons]) {
			child.unload();
		}
	}

	async loadSettings() {
		const saved = (await this.loadData()) as Partial<LinkLogosSettings> | null;
		this.settings = { ...DEFAULT_SETTINGS, ...saved };
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.applyEditorSetting();
	}

	private applyEditorSetting() {
		this.editorExtensions.length = 0;
		if (this.settings.livePreview) {
			this.editorExtensions.push(livePreviewIcons);
		}
		this.app.workspace.updateOptions();
	}
}
