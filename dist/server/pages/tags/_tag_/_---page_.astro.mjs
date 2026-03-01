import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_BD3UESb9.mjs';
import 'piccolore';
import { $ as $$Paginator } from '../../../chunks/Paginator_V0Ok0_kl.mjs';
import { $ as $$PostPreview } from '../../../chunks/PostPreview_DfLWqfoM.mjs';
import { g as getAllPosts, b as getUniqueTags } from '../../../chunks/post_Amwrh5yK.mjs';
import { $ as $$Base } from '../../../chunks/Base_Dcxoz-Oz.mjs';
import { c as collectionDateSort } from '../../../chunks/date_DpoIRUIO.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://www.scalablehacker.com/");
const getStaticPaths = async ({ paginate }) => {
  const allPosts = await getAllPosts();
  const sortedPosts = allPosts.sort(collectionDateSort);
  const uniqueTags = getUniqueTags(sortedPosts);
  return uniqueTags.flatMap((tag) => {
    const filterPosts = sortedPosts.filter((post) => post.data.tags.includes(tag));
    return paginate(filterPosts, {
      pageSize: 10,
      params: { tag }
    });
  });
};
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  const { tag } = Astro2.params;
  const meta = {
    description: `View all posts with the tag - ${tag}`,
    title: `Tag: ${tag}`
  };
  const paginationProps = {
    ...page.url.prev && {
      prevUrl: {
        text: "\u2190 Previous Tags",
        url: page.url.prev
      }
    },
    ...page.url.next && {
      nextUrl: {
        text: "Next Tags \u2192",
        url: page.url.next
      }
    }
  };
  return renderTemplate`${renderComponent($$result, "PageLayout", $$Base, { "meta": meta }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="title mb-6 flex items-center"> <a class="text-accent-two sm:hover:underline" href="/tags/">Tags</a> <span class="me-3 ms-2">→</span> <span class="text-2xl">#${tag}</span> </h1> <section aria-label="Blog post list"> <ul class="space-y-4"> ${page.data.map((p) => renderTemplate`<li class="grid-cols-[auto_1fr]"> ${renderComponent($$result2, "PostPreview", $$PostPreview, { "post": p })} </li>`)} </ul> ${renderComponent($$result2, "Pagination", $$Paginator, { ...paginationProps })} </section> ` })}`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/tags/[tag]/[...page].astro", void 0);

const $$file = "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/tags/[tag]/[...page].astro";
const $$url = "/tags/[tag]/[...page]";

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
