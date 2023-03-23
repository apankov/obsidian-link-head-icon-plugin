/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');
var path = require('path');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespace(path);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function getAssetsPathResolver(plugin, assetsPath) {
    return (asset) => plugin.app.vault.adapter.getResourcePath(path__namespace.resolve(plugin.app.vault.configDir, 'plugins', plugin.manifest.id, assetsPath, asset));
}

const WEBSITES = {
    '//docs.google.com/spreadsheets/': 'google-drive.png',
    '//docs.google.com/document/': 'google-drive.png',
    '//drive.google.com/drive/': 'google-drive.png',
    'youtube.com/watch': 'youtube.png',
    '//twitter.com/': 'twitter.png',
};
class LinkIcon extends obsidian.MarkdownRenderChild {
    constructor(containerEl, resolver, website) {
        super(containerEl);
        this.website = website;
        this.resolver = resolver;
    }
    onload() {
        const icon = this.containerEl.createEl('div', { attr: {
                class: 'external-link-wrapper',
                style: 'background-image: url("' + this.resolver(this.website) + '");',
            } });
        this.containerEl.prepend(icon);
    }
}
class LinkHeadIconPlugin extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.registerMarkdownPostProcessor((element, context) => {
                const links = element.querySelectorAll("a.external-link");
                const resolver = getAssetsPathResolver(this, 'assets');
                for (let index = 0; index < links.length; index++) {
                    const link = links.item(index);
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
        });
    }
}

module.exports = LinkHeadIconPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy91dGlsLnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbInBhdGgiLCJNYXJrZG93blJlbmRlckNoaWxkIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBb0dBO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFD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