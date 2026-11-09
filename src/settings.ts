import { type App, PluginSettingTab, Setting } from 'obsidian';
import type LinkLogosPlugin from './main';

export interface LinkLogosSettings {
	/** Show icons while editing in Live Preview, not only in reading view. */
	livePreview: boolean;
}

export const DEFAULT_SETTINGS: LinkLogosSettings = {
	livePreview: true,
};

// The declarative getSettingDefinitions() API needs Obsidian 1.13; minAppVersion
// is 1.1.0. Revisit when minAppVersion moves past 1.13.
// eslint-disable-next-line obsidianmd/settings-tab/prefer-setting-definitions
export class LinkLogosSettingTab extends PluginSettingTab {
	constructor(app: App, private readonly plugin: LinkLogosPlugin) {
		super(app, plugin);
	}

	display(): void {
		this.containerEl.empty();

		new Setting(this.containerEl)
			.setName('Show icons in Live Preview')
			.setDesc('Icons always show in reading view. Turn this off to keep the editor free of icons.')
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.livePreview).onChange(async (value) => {
					this.plugin.settings.livePreview = value;
					await this.plugin.saveSettings();
				}),
			);
	}
}
