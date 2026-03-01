import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_BD3UESb9.mjs';
import 'piccolore';
import { $ as $$Badge } from '../chunks/Badge_BjNMUSh4.mjs';
import { g as getAllPosts, c as getUniqueTagsWithCount } from '../chunks/post_Amwrh5yK.mjs';
import { $ as $$Base } from '../chunks/Base_Dcxoz-Oz.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getAllPosts();
  const allTags = getUniqueTagsWithCount(allPosts);
  const meta = {
    description: "A list of all the topics I've written about in my posts",
    title: "All Tags"
  };
  return renderTemplate`${renderComponent($$result, "PageLayout", $$Base, { "meta": meta }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="title mb-6">Tags</h1>  <div class="flex flex-wrap items-center gap-2"> ${allTags.map(([tag, val]) => renderTemplate`<div class="flex items-center gap-x-2"> <a${addAttribute(`View all posts with the tag: ${tag}`, "aria-label")}${addAttribute(`/tags/${tag}`, "href")}> ${renderComponent($$result2, "Badge", $$Badge, { "variant": "muted", "title": tag }, { "default": async ($$result3) => renderTemplate` <span class="text-xs font-normal">
&nbsp;${val} post${val > 1 && "s"} </span> ` })} </a> </div>`)} </div> ` })}`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/tags/index.astro", void 0);

const $$file = "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/tags/index.astro";
const $$url = "/tags";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
//# sourceMappingURL=tags.astro.mjs.map
