import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderComponent, a as renderTemplate } from './astro/server_BD3UESb9.mjs';
import 'piccolore';
import { a as $$Icon } from './Base_Dcxoz-Oz.mjs';
import { g as getCollection } from './_astro_content_B2HDxKAd.mjs';

function injectChild(items, item) {
  const lastItem = items.at(-1);
  if (!lastItem || lastItem.depth >= item.depth) {
    items.push(item);
  } else {
    injectChild(lastItem.children, item);
    return;
  }
}
function generateToc(headings, { maxHeadingLevel = 6, minHeadingLevel = 1 } = {}) {
  const bodyHeadings = headings.filter(
    ({ depth }) => depth >= minHeadingLevel && depth <= maxHeadingLevel
  );
  const toc = [];
  for (const heading of bodyHeadings) injectChild(toc, { ...heading, children: [] });
  return toc;
}

const $$Astro$2 = createAstro("https://www.scalablehacker.com/");
const $$TOCHeading = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TOCHeading;
  const {
    heading: { children, depth, slug, text }
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li class=""> <a${addAttribute(`Scroll to section: ${text}`, "aria-label")} class="text-light mt-1 line-clamp-2 break-words [padding-left:1ch] [text-indent:-1ch] before:text-accent-two before:content-['#'] hover:text-accent-two"${addAttribute(`#${slug}`, "href")}>${text} </a> ${!!children.length && renderTemplate`<ul class="ms-2"> ${children.map((subheading) => renderTemplate`${renderComponent($$result, "Astro.self", Astro2.self, { "heading": subheading })}`)} </ul>`} </li>`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/components/blog/TOCHeading.astro", void 0);

const $$Astro$1 = createAstro("https://www.scalablehacker.com/");
const $$TOC = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TOC;
  const { headings } = Astro2.props;
  const toc = generateToc(headings);
  return renderTemplate`${maybeRenderHead()}<div class="sticky top-20 rounded-t-lg"> <div class="sticky top-20 bg-bgColor rounded-t-lg"> <div class="sticky top-20 flex pt-4 ps-8 pb-2 items-end title rounded-t-lg bg-color-75 pe-4 gap-x-1 border-t border-l border-r border-special-light"> <!--
			<Icon aria-hidden="true" class="flex-shrink-0 h-8 w-6 py-1" focusable="false" name="solar:clipboard-list-line-duotone" />
			--> <h4 class="title">Table of Contents</h4> <button id="close-toc" class="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-lg bg-accent-base/5 text-accent-base hover:bg-accent-base/10" aria-label="Close TOC"> ${renderComponent($$result, "Icon", $$Icon, { "aria-hidden": "true", "class": "h-6 w-6", "focusable": "false", "name": "hugeicons:cancel-01" })} </button> </div> </div> <div class="bg-bgColor rounded-b-lg"> <div class="rounded-b-lg pb-6 bg-color-75 border-b border-l border-r border-special-light"> <div class="max-h-[calc(100vh-11rem)] h-auto overflow-y-auto overflow-hidden px-8"> <ul class="text-sm font-medium text-textColor"> ${toc.map((heading) => renderTemplate`${renderComponent($$result, "TOCHeading", $$TOCHeading, { "heading": heading })}`)} </ul> </div> </div> </div> </div>`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/components/blog/TOC.astro", void 0);

const $$Astro = createAstro("https://www.scalablehacker.com/");
const $$SeriesPanel = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SeriesPanel;
  const { seriesId } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  const posts = await getCollection("post");
  const series = await getCollection("series");
  const postsSeries = series.find((s) => s.id === seriesId);
  if (!postsSeries) {
    throw new Error(`Post(s) with Series ID '${seriesId}' not found.`);
  }
  let seriesPosts = [];
  if (seriesId) {
    seriesPosts = posts.filter((p) => p.data.seriesId === seriesId).sort((a, b) => (a.data.orderInSeries || 0) - (b.data.orderInSeries || 0));
  }
  return renderTemplate`${maybeRenderHead()}<aside id="series-panel" class="hidden grid lg:block z-40 min-h-screen fixed lg:relative \`shadow-[5px_0px_10px_rgba(0,0,0,0.05)]\` transition-all duration-300 ease-in-out bg-bgColor"> <div class="fixed -z-10 top-0 w-screen md:w-72 md:min-w-72 md:max-w-72 h-screen bg-gradient-to-b from-orange-300 via-pink-300 to-purple-300 opacity-30 dark:opacity-0"></div> <div class="flex h-full flex-col px-8 pt-4 md:pt-8 w-screen md:w-72 md:min-w-72 md:max-w-72 bg-accent-base/5 border-r border-special-light"> <div class="flex gap-x-1"> <!--
			<Icon aria-hidden="true" class="flex-shrink-0 h-8 w-6 py-1" focusable="false" name="solar:notes-line-duotone" />
			--> <h4 class="flex items-center title mb-[4.5rem]">
Docs Series panel
</h4> </div> <button id="close-panel" class="absolute top-4 right-4 md:top-8 md:right-8 h-8 w-8 flex items-center justify-center rounded-lg bg-accent-base/5 text-accent-base hover:bg-accent-base/10" aria-label="Close Series Panel"> ${renderComponent($$result, "Icon", $$Icon, { "class": "h-6 w-6", "name": "hugeicons:cancel-01" })} </button> <div class="sticky top-8"> ${postsSeries.id ? renderTemplate`<a${addAttribute(`/series/${postsSeries.id}`, "href")}${addAttribute(`About ${postsSeries.data.title} series`, "aria-label")} class="sticky top-4 flex h-8 w-full items-center justify-center gap-x-1 rounded-lg shadow-lg bg-accent-base font-medium text-bgColor hover:brightness-110 transition-all duration-300"> ${renderComponent($$result, "Icon", $$Icon, { "class": "inline-block h-6 w-6 text-bgColor", "name": "solar:notes-bold" })} ${postsSeries.data.title} </a>

				<ul class="mt-[1.0625rem] text-sm font-medium text-light"> ${seriesPosts.map((p) => {
    const isActive = currentPath === `/posts/${p.id}/`;
    return renderTemplate`<li${addAttribute(`px-4 flex items-center line-clamp-2 pt-1 pb-1 ${isActive ? "rounded-lg bg-color-100" : ""}`, "class")}> <a${addAttribute(`/posts/${p.id}/`, "href")}${addAttribute(`hover:text-accent-two ${isActive ? "text-accent cursor-default pointer-events-none" : ""}`, "class")}> ${p.data.title} </a> </li>`;
  })} </ul>` : null} </div> </div> </aside>`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/components/SeriesPanel.astro", void 0);

export { $$SeriesPanel as $, $$TOC as a };
//# sourceMappingURL=SeriesPanel_Bzi8cJAG.mjs.map
