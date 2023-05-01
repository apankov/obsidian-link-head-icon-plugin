import { Plugin, normalizePath } from 'obsidian';

export function getAssetsPathResolver(plugin: Plugin, assetsPath: string) {
	return (asset: string) => plugin.app.vault.adapter.getResourcePath(
		normalizePath(
			`${plugin.app.vault.configDir}/plugins/${plugin.manifest.id}/${assetsPath}/${asset}`
		),
	);
}
