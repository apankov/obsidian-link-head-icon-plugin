import { MarkdownView, Plugin } from 'obsidian';
import type { Extension } from '@codemirror/state';
import { ICONS } from './icons';
import { livePreviewIcons } from './live-preview';
import { createIcon } from './render';
import { DEFAULT_SETTINGS, type LinkLogosSettings, LinkLogosSettingTab } from './settings';
import { findIcon } from './websites';

const LINK_CLASS = 'link-logos-link';
const ICON_CLASS = 'link-logos-icon';

export default class LinkLogosPlugin extends Plugin {
	settings: LinkLogosSettings = { ...DEFAULT_SETTINGS };

	// Registered once; its contents follow the Live Preview setting.
	private readonly editorExtensions: Extension[] = [];

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new LinkLogosSettingTab(this.app, this));

		this.registerEditorExtension(this.editorExtensions);
		this.applyEditorSetting();

		// Icons stay in the rendered HTML for as long as it exists: Obsidian
		// caches rendered blocks (callouts, tables in Live Preview) and reuses
		// them without running post-processors again.
		this.registerMarkdownPostProcessor((element) => {
			element.querySelectorAll<HTMLElement>('a.external-link').forEach((link) => {
				const icon = findIcon(link.getAttribute('href') ?? '');
				if (icon && !link.hasClass(LINK_CLASS)) {
					link.prepend(createIcon(ICONS[icon]));
					link.addClass(LINK_CLASS);
				}
			});
		});

		// Views rendered before the plugin loaded get icons too.
		this.app.workspace.onLayoutReady(() => this.rerenderReadingViews());
	}

	onunload() {
		// Live Preview widgets go away with the editor extension; rendered
		// Markdown keeps its HTML, so strip the icons from it here.
		for (const doc of this.openDocuments()) {
			doc.querySelectorAll<HTMLElement>(`a.${LINK_CLASS}`).forEach((link) => {
				link.querySelectorAll(`:scope > .${ICON_CLASS}`).forEach((icon) => icon.remove());
				link.removeClass(LINK_CLASS);
			});
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

	/** The main window plus any pop-out windows with open leaves. */
	private openDocuments(): Set<Document> {
		const docs = new Set<Document>([activeDocument]);
		this.app.workspace.iterateAllLeaves((leaf) => {
			docs.add(leaf.view.containerEl.doc);
		});
		return docs;
	}

	private rerenderReadingViews() {
		this.app.workspace.iterateAllLeaves((leaf) => {
			if (leaf.view instanceof MarkdownView) {
				leaf.view.previewMode.rerender(true);
			}
		});
	}
}
