import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BD3UESb9.mjs';
import 'piccolore';
import { g as getCollection } from '../chunks/_astro_content_B2HDxKAd.mjs';
import { $ as $$PostPreview } from '../chunks/PostPreview_DfLWqfoM.mjs';
import { $ as $$Note } from '../chunks/Note_Ujycvmyr.mjs';
import { g as getAllPosts } from '../chunks/post_Amwrh5yK.mjs';
import { $ as $$Base } from '../chunks/Base_Dcxoz-Oz.mjs';
import { c as collectionDateSort } from '../chunks/date_DpoIRUIO.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://www.scalablehacker.com/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const MAX_POSTS = 10;
  const allPosts = await getAllPosts();
  const allPostsByDate = allPosts.sort(collectionDateSort).slice(0, MAX_POSTS);
  const MAX_NOTES = 2;
  const allNotes = await getCollection("note");
  const latestNotes = allNotes.sort(collectionDateSort).slice(0, MAX_NOTES);
  return renderTemplate`${renderComponent($$result, "PageLayout", $$Base, { "meta": { title: "Home" } }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<div class="absolute top-0 left-1/2 md:top-[-15%] -ml-[50vw] min-h-screen w-screen pointer-events-none blur-3xl opacity-50 overflow-x-hidden"> <div class="absolute top-[10%] right-[-40%] w-[65%] h-full bg-gradient-to-b from-purple-300 via-blue-300 to-transparent rounded-full opacity-30 dark:opacity-10"></div> <div class="absolute top-[10%] left-[-40%] w-[65%] h-full bg-gradient-to-b from-blue-300 via-pink-300 to-transparent rounded-full opacity-30 dark:opacity-10"></div> <div class="absolute top-[-20%] left-[-50%] w-[85%] h-full bg-gradient-to-b from-indigo-300 via-orange-300 to-transparent rounded-full opacity-60 dark:opacity-10"></div> <div class="absolute top-[-20%] right-[-50%] w-[85%] h-full bg-gradient-to-b from-orange-300 via-indigo-300 to-transparent rounded-full opacity-60 dark:opacity-10"></div> </div>   <section aria-label="Blog post list" class="'mt-[-100vh] pt-[100vh]'"> <h2 class="title mb-6 text-xl text-accent-two"> <a href="/posts/">Posts</a> </h2> <ul class="space-y-4 md:space-y-2" role="list"> ${allPostsByDate.map((p) => renderTemplate`<li class="gap-2 sm:grid-cols-[auto_1fr]"> ${renderComponent($$result2, "PostPreview", $$PostPreview, { "post": p, "withDesc": true })} </li>`)} </ul> </section>  ${latestNotes.length > 0 && renderTemplate`<section class="mt-12"> <h2 class="title mb-6 text-accent-two"> <a href="/notes/">Notes</a> </h2> <div class="grid grid-cols-1 gap-8 sm:grid-cols-2"> ${latestNotes.map((note) => renderTemplate`<div> ${renderComponent($$result2, "Note", $$Note, { "note": note, "as": "h4", "isPreview": true })} </div>`)} </div> </section>`}  ` })}`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/index.astro", void 0);

const $$file = "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
//# sourceMappingURL=index.astro.mjs.map
