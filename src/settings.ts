import { type App, PluginSettingTab, Setting, type SettingDefinitionItem } from 'obsidian';
import type LinkLogosPlugin from './main';

export interface LinkLogosSettings {
	/** Show icons while editing in Live Preview, not only in reading view. */
	livePreview: boolean;
}

export const DEFAULT_SETTINGS: LinkLogosSettings = {
	livePreview: true,
};

const LIVE_PREVIEW = {
	name: 'Show icons in Live Preview',
	desc: 'Icons always show in reading view. Turn this off to keep the editor free of icons.',
};

export class LinkLogosSettingTab extends PluginSettingTab {
	constructor(app: App, private readonly plugin: LinkLogosPlugin) {
		super(app, plugin);
	}

	/** Obsidian 1.13+: declarative settings, also found by settings search. */
	getSettingDefinitions(): SettingDefinitionItem[] {
		return [{ ...LIVE_PREVIEW, control: { type: 'toggle', key: 'livePreview' } }];
	}

	async setControlValue(key: string, value: unknown): Promise<void> {
		if (key === 'livePreview' && typeof value === 'boolean') {
			this.plugin.settings.livePreview = value;
			await this.plugin.saveSettings();
		}
	}

	/** Obsidian before 1.13, which does not know getSettingDefinitions(). */
	display(): void {
		this.containerEl.empty();

		new Setting(this.containerEl)
			.setName(LIVE_PREVIEW.name)
			.setDesc(LIVE_PREVIEW.desc)
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.livePreview).onChange(async (value) => {
					this.plugin.settings.livePreview = value;
					await this.plugin.saveSettings();
				}),
			);
	}
}
