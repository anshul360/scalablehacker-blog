import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DIzNHMby.mjs';
import { manifest } from './manifest_B8EraII3.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/404.astro.mjs');
const _page1 = () => import('./pages/notes/rss.xml.astro.mjs');
const _page2 = () => import('./pages/notes/_---page_.astro.mjs');
const _page3 = () => import('./pages/notes/_---slug_.astro.mjs');
const _page4 = () => import('./pages/og-image/_---slug_._ext_.astro.mjs');
const _page5 = () => import('./pages/posts/_---page_.astro.mjs');
const _page6 = () => import('./pages/posts/_---slug_.astro.mjs');
const _page7 = () => import('./pages/rss.xml.astro.mjs');
const _page8 = () => import('./pages/series/_---slug_.astro.mjs');
const _page9 = () => import('./pages/tags/_tag_/_---page_.astro.mjs');
const _page10 = () => import('./pages/tags.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/404.astro", _page0],
    ["src/pages/notes/rss.xml.ts", _page1],
    ["src/pages/notes/[...page].astro", _page2],
    ["src/pages/notes/[...slug].astro", _page3],
    ["src/pages/og-image/[...slug].[ext].ts", _page4],
    ["src/pages/posts/[...page].astro", _page5],
    ["src/pages/posts/[...slug].astro", _page6],
    ["src/pages/rss.xml.ts", _page7],
    ["src/pages/series/[...slug].astro", _page8],
    ["src/pages/tags/[tag]/[...page].astro", _page9],
    ["src/pages/tags/index.astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///Users/anshul360/personal_site/scalablehacker-citrus/dist/client/",
    "server": "file:///Users/anshul360/personal_site/scalablehacker-citrus/dist/server/",
    "host": true,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
//# sourceMappingURL=entry.mjs.map
