import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BD3UESb9.mjs';
import 'piccolore';
import { g as getCollection } from '../../chunks/_astro_content_B2HDxKAd.mjs';
import { $ as $$Paginator } from '../../chunks/Paginator_V0Ok0_kl.mjs';
import { $ as $$Note } from '../../chunks/Note_Ujycvmyr.mjs';
import { $ as $$Base, a as $$Icon } from '../../chunks/Base_Dcxoz-Oz.mjs';
import { c as collectionDateSort } from '../../chunks/date_DpoIRUIO.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://www.scalablehacker.com/");
const getStaticPaths = async ({ paginate }) => {
  const MAX_NOTES_PER_PAGE = 5;
  const allNotes = await getCollection("note");
  return paginate(allNotes.sort(collectionDateSort), { pageSize: MAX_NOTES_PER_PAGE });
};
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  const meta = {
    description: "Read my collection of notes",
    title: "Notes"
  };
  const paginationProps = {
    ...page.url.prev && {
      prevUrl: {
        text: "\u2190 Previous Page",
        url: page.url.prev
      }
    },
    ...page.url.next && {
      nextUrl: {
        text: "Next Page \u2192",
        url: page.url.next
      }
    }
  };
  return renderTemplate`${renderComponent($$result, "PageLayout", $$Base, { "meta": meta }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section> <h1 class="title mb-6 flex items-center gap-2">
Notes
<a class="text-accent-two" href="/notes/rss.xml" target="_blank"> <span class="sr-only">RSS feed</span> ${renderComponent($$result2, "Icon", $$Icon, { "aria-hidden": "true", "class": "h-6 w-6", "focusable": "false", "name": "mdi:rss" })} </a> </h1> <div class="grid grid-cols-1 gap-8 md:grid-cols-2"> ${page.data.map((note) => renderTemplate`<div> ${renderComponent($$result2, "Note", $$Note, { "note": note, "as": "h4", "isPreview": true })} </div>`)} </div> ${renderComponent($$result2, "Pagination", $$Paginator, { ...paginationProps })} </section> ` })}`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/notes/[...page].astro", void 0);

const $$file = "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/notes/[...page].astro";
const $$url = "/notes/[...page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
//# sourceMappingURL=_---page_.astro.mjs.map
