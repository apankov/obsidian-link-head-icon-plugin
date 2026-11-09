import { syntaxTree } from '@codemirror/language';
import { RangeSetBuilder, type EditorState } from '@codemirror/state';
import {
	Decoration,
	type DecorationSet,
	type EditorView,
	ViewPlugin,
	type ViewUpdate,
	WidgetType,
} from '@codemirror/view';
import { editorLivePreviewField } from 'obsidian';
import { ICONS, type IconId } from './icons';
import { findLinks } from './links';
import { createIcon } from './render';
import { findIcon } from './websites';

class IconWidget extends WidgetType {
	constructor(private readonly icon: IconId) {
		super();
	}

	eq(other: IconWidget): boolean {
		return other.icon === this.icon;
	}

	toDOM(): HTMLElement {
		const wrapper = createSpan({ cls: 'link-logos-widget' });
		wrapper.appendChild(createIcon(ICONS[this.icon]));
		return wrapper;
	}
}

// Obsidian's Markdown syntax nodes where a URL is text, not a link.
const NOT_A_LINK = /code|frontmatter|math|comment/;

function isInsideNonLink(state: EditorState, pos: number): boolean {
	for (let node: { name: string; parent: unknown } | null = syntaxTree(state).resolveInner(pos, 1); node; ) {
		if (NOT_A_LINK.test(node.name)) {
			return true;
		}
		node = node.parent as typeof node;
	}
	return false;
}

function isLivePreview(state: EditorState): boolean {
	return state.field(editorLivePreviewField, false) ?? false;
}

function buildDecorations(view: EditorView): DecorationSet {
	const { state } = view;
	if (!isLivePreview(state)) {
		return Decoration.none;
	}

	const builder = new RangeSetBuilder<Decoration>();
	for (const range of view.visibleRanges) {
		for (const link of findLinks(state.doc.sliceString(range.from, range.to))) {
			const from = range.from + link.from;
			const to = range.from + link.to;
			const icon = findIcon(link.href);
			// While the cursor is in a link, Obsidian shows its Markdown source: no icon then.
			const editing = state.selection.ranges.some((sel) => sel.from <= to && sel.to >= from);
			if (icon && !editing && !isInsideNonLink(state, from)) {
				// side: 1 puts the icon after the link start. Obsidian measures the
				// list/quote prefix up to that position to set the hanging indent;
				// with side: -1 the icon would count as prefix and shift the line.
				builder.add(from, from, Decoration.widget({ widget: new IconWidget(icon), side: 1 }));
			}
		}
	}
	return builder.finish();
}

/** Shows site icons in front of external links in Live Preview. */
export const livePreviewIcons = ViewPlugin.fromClass(
	class {
		decorations: DecorationSet;

		constructor(view: EditorView) {
			this.decorations = buildDecorations(view);
		}

		update(update: ViewUpdate) {
			if (
				update.docChanged ||
				update.viewportChanged ||
				update.selectionSet ||
				syntaxTree(update.startState) !== syntaxTree(update.state) ||
				isLivePreview(update.startState) !== isLivePreview(update.state)
			) {
				this.decorations = buildDecorations(update.view);
			}
		}
	},
	{ decorations: (plugin) => plugin.decorations },
);
