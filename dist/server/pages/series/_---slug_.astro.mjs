import { b as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, f as renderSlot } from '../../chunks/astro/server_BD3UESb9.mjs';
import 'piccolore';
import { r as renderEntry, g as getCollection } from '../../chunks/_astro_content_B2HDxKAd.mjs';
import { $ as $$SeriesPanel, a as $$TOC } from '../../chunks/SeriesPanel_Bzi8cJAG.mjs';
import { $ as $$Base, a as $$Icon } from '../../chunks/Base_Dcxoz-Oz.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://www.scalablehacker.com/");
const $$Series = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Series;
  const { series } = Astro2.props;
  const { title, description } = series.data;
  const { headings } = await renderEntry(series);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Base, { "meta": { description, title } }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="fixed left-0 top-0 z-10 flex h-16 md:h-20 w-full bg-bgColor overflow-hidden"> <!-- Background 
			TODO: This approach is not optimal and requires improvements. 
  			- Too many absolutely positioned elements can affect performance. 
  		--> <div class="absolute top-0 left-1/2 -ml-[50vw] w-screen min-h-screen pointer-events-none blur-2xl"> <div class="absolute top-[-90%] right-[25%] w-[75%] h-full bg-gradient-to-b from-blue-300 via-pink-300 to-transparent rounded-full opacity-40 dark:opacity-5"></div> <div class="absolute top-[-90%] left-[25%] w-[75%] h-full bg-gradient-to-b from-blue-300 via-pink-300 to-transparent rounded-full opacity-40 dark:opacity-5"></div> <div class="absolute top-[-85%] right-[25%] w-[55%] h-full bg-gradient-to-b from-purple-300 via-blue-300 to-transparent rounded-full opacity-40 dark:opacity-5"></div> <div class="absolute top-[-85%] left-[25%] w-[55%] h-full bg-gradient-to-b from-indigo-300 via-orange-300 to-transparent rounded-full opacity-40 dark:opacity-5"></div> <div class="absolute top-[-75%] left-[-25%] w-[65%] h-full bg-gradient-to-b from-blue-300 via-pink-300 to-transparent rounded-full opacity-30 dark:opacity-5"></div> <div class="absolute top-[-75%] right-[-25%] w-[65%] h-full bg-gradient-to-b from-purple-300 via-blue-300 to-transparent rounded-full opacity-30 dark:opacity-5"></div> <div class="absolute top-[-85%] left-[-30%] w-[85%] h-full bg-gradient-to-b from-indigo-300 via-orange-300 to-transparent rounded-full opacity-60 dark:opacity-5"></div> <div class="absolute top-[-85%] right-[-30%] w-[85%] h-full bg-gradient-to-b from-orange-300 via-indigo-300 to-transparent rounded-full opacity-60 dark:opacity-5"></div> </div> </div>  <div class="md:sticky md:top-8 md:z-20 flex items-end"> <button id="toggle-panel" class="hidden md:flex z-30 mr-2 h-8 w-8 items-center bg-accent-base/10 flex-shrink-0 justify-center rounded-lg text-accent-base hover:text-accent-base/90" aria-label="Toggle Series Panel" aria-controls="series-panel">  ${renderComponent($$result2, "Icon", $$Icon, { "aria-hidden": "true", "class": "flex-shrink-0 h-6 w-6", "focusable": "false", "name": "solar:notes-bold" })} </button> <button id="toggle-toc" class="hidden md:flex z-30 mr-2 h-8 w-8 items-center flex-shrink-0 bg-accent-base/10 justify-center rounded-lg text-accent-base hover:text-accent-base/90" aria-label="Table of Contents"> ${renderComponent($$result2, "Icon", $$Icon, { "aria-hidden": "true", "class": "h-6 w-6", "focusable": "false", "name": "solar:clipboard-list-bold" })} </button> <h1 class="title md:sticky md:top-4 md:z-20 line-clamp-none md:line-clamp-1 md:max-w-lg lg:max-w-xl"> ${title} </h1> </div> <p class="prose prose-citrus max-w-none mt-[1.125rem]"> ${description} </p> <div class="mt-6 flex sm:grid-cols-[auto_1fr] md:items-start gap-x-8"> <article class="grid flex-grow grid-cols-1 break-words pt-4" data-pagefind-body> <div class="prose prose-citrus max-w-none flex-grow prose-headings:font-semibold prose-headings:text-accent-base prose-headings:before:text-accent-two sm:prose-headings:before:content-['#'] sm:prose-th:before:content-none"> ${renderSlot($$result2, $$slots["default"])} </div> </article> ${!!headings.length && renderTemplate`<aside id="toc-panel" class="sticky md:top-20 z-10 hidden md:w-[16rem] md:min-w-[16rem] rounded-lg md:block"> ${renderComponent($$result2, "TOC", $$TOC, { "headings": headings })} </aside>`} </div> <div class="left-0 right-12 z-50 ml-auto w-fit md:absolute"> <button id="to-top-button" class="fixed bottom-14 flex h-12 w-12 text-light translate-y-28 items-center justify-center rounded-full border-2 border-special-lighter bg-bgColor text-3xl drop-shadow-xl transition-all duration-300 hover:text-accent-two data-[show=true]:translate-y-0 data-[show=true]:opacity-100" aria-label="Back to Top" data-show="false"> <span class="absolute inset-0 rounded-full bg-special-light flex items-center justify-center" aria-hidden="true"> <svg class="h-6 w-6" fill="none" focusable="false" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M4.5 15.75l7.5-7.5 7.5 7.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </span> </button> </div>  ${renderComponent($$result2, "mobile-button", "mobile-button", { "id": "toggle-panel-mobile", "class": "size-12 flex items-center justify-center block sm:hidden fixed bottom-4 shadow-[0px_10px_25px_rgba(0,0,0,0.15)] border border-special-lighter right-4 z-50 rounded-lg bg-bgColor text-accent-base hover:text-bg-accent-base/90", "aria-label": "Toggle Series Panel" }, { "default": () => renderTemplate` <span class="absolute inset-0 rounded-lg flex items-center justify-center bg-special-light hover:text-accent-base/90"> ${renderComponent($$result2, "Icon", $$Icon, { "class": "size-8", "name": "solar:notes-bold" })} </span> ` })}   `, "sidebar": async ($$result2) => renderTemplate`${series.id && renderTemplate`${renderComponent($$result2, "SeriesPanel", $$SeriesPanel, { "slot": "sidebar", "seriesId": series.id })}`}` })} ${renderScript($$result, "/Users/anshul360/personal_site/scalablehacker-citrus/src/layouts/Series.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "/Users/anshul360/personal_site/scalablehacker-citrus/src/layouts/Series.astro?astro&type=script&index=1&lang.ts")} ${renderScript($$result, "/Users/anshul360/personal_site/scalablehacker-citrus/src/layouts/Series.astro?astro&type=script&index=2&lang.ts")} ${renderScript($$result, "/Users/anshul360/personal_site/scalablehacker-citrus/src/layouts/Series.astro?astro&type=script&index=3&lang.ts")}`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/layouts/Series.astro", void 0);

const $$Astro = createAstro("https://www.scalablehacker.com/");
const getStaticPaths = async () => {
  const allSeries = await getCollection("series");
  return allSeries.map((series) => ({
    params: { slug: series.id },
    props: { series }
  }));
};
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { series } = Astro2.props;
  const { Content } = await renderEntry(series);
  return renderTemplate`${renderComponent($$result, "SeriesLayout", $$Series, { "series": series }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/series/[...slug].astro", void 0);

const $$file = "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/series/[...slug].astro";
const $$url = "/series/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
//# sourceMappingURL=_---slug_.astro.mjs.map
