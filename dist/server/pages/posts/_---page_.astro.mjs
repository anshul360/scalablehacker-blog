import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, F as Fragment, e as addAttribute } from '../../chunks/astro/server_BD3UESb9.mjs';
import 'piccolore';
import { $ as $$Paginator } from '../../chunks/Paginator_V0Ok0_kl.mjs';
import { $ as $$PostPreview } from '../../chunks/PostPreview_DfLWqfoM.mjs';
import { a as groupPostsByYear, g as getAllPosts, b as getUniqueTags } from '../../chunks/post_Amwrh5yK.mjs';
import { $ as $$Base, a as $$Icon } from '../../chunks/Base_Dcxoz-Oz.mjs';
import { c as collectionDateSort } from '../../chunks/date_DpoIRUIO.mjs';
import { $ as $$Badge } from '../../chunks/Badge_BjNMUSh4.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://www.scalablehacker.com/");
const getStaticPaths = async ({ paginate }) => {
  const MAX_POSTS_PER_PAGE = 5;
  const MAX_TAGS = 20;
  const allPosts = await getAllPosts();
  const uniqueTags = getUniqueTags(allPosts).slice(0, MAX_TAGS);
  return paginate(allPosts.sort(collectionDateSort), {
    pageSize: MAX_POSTS_PER_PAGE,
    props: { uniqueTags }
  });
};
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page, uniqueTags } = Astro2.props;
  const meta = {
    description: "Read my collection of posts and the things that interest me",
    title: "Posts"
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
  const groupedByYear = groupPostsByYear(page.data);
  const descYearKeys = Object.keys(groupedByYear).sort((a, b) => +b - +a);
  return renderTemplate`${renderComponent($$result, "PageLayout", $$Base, { "meta": meta }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="title mb-6 flex items-center gap-2">
Posts
<a class="text-accent-two" href="/rss.xml" target="_blank"> <span class="sr-only">RSS feed</span> ${renderComponent($$result2, "Icon", $$Icon, { "aria-hidden": "true", "class": "h-6 w-6", "focusable": "false", "name": "mdi:rss" })} </a> </h1> <div class="grid gap-y-8 sm:grid-cols-[1fr_auto] sm:gap-x-8"> <section aria-label="Blog post list" class="grow"> ${descYearKeys.map((yearKey) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <h4 class="title">${yearKey}</h4> <ul class="mb-8 mt-4 space-y-8 text-start"> ${groupedByYear[yearKey]?.map((p) => renderTemplate`<li class="grid gap-2 sm:grid-cols-[auto_1fr] sm:[&_q]:col-start-2"> ${renderComponent($$result3, "PostPreview", $$PostPreview, { "post": p, "withDesc": true })} </li>`)} </ul> ` })}`)} </section> ${!!uniqueTags.length && renderTemplate`<aside class="md:min-w-[14rem] md:max-w-[14rem] md:basis-[14rem]"> <h4 class="title mb-4 flex gap-2">
Tags
 </h4> <ul class="flex flex-wrap gap-2"> ${uniqueTags.map((tag) => renderTemplate`<li> <a${addAttribute(`View all posts with the tag: ${tag}`, "aria-label")}${addAttribute(`/tags/${tag}`, "href")}> ${renderComponent($$result2, "Badge", $$Badge, { "variant": "muted", "title": tag })} </a> </li>`)} <span class="text-base ms-auto inline-flex items-center h-6 sm:text-end"> <a aria-label="View all blog categories" class="font-medium text-accent sm:hover:text-accent-two" href="/tags/">
View all →
</a> </span> </ul>  </aside>`} </div> ${renderComponent($$result2, "Pagination", $$Paginator, { ...paginationProps })} ` })}`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/posts/[...page].astro", void 0);

const $$file = "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/posts/[...page].astro";
const $$url = "/posts/[...page]";

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
