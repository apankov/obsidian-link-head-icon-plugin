import { Plugin } from 'obsidian';
import * as path from 'path';

export function getAssetsPathResolver(plugin: Plugin, assetsPath: string) {
	return (asset: string) => plugin.app.vault.adapter.getResourcePath(
		path.resolve(plugin.app.vault.configDir, 'plugins', plugin.manifest.id, assetsPath, asset)
	);
}
