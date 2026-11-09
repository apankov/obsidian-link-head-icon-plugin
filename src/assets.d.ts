// esbuild inlines PNG imports as data URLs (see esbuild.config.mjs).
declare module '*.png' {
	const dataUrl: string;
	export default dataUrl;
}
