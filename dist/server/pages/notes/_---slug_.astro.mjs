import { b as createAstro, c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BD3UESb9.mjs';
import 'piccolore';
import { g as getCollection } from '../../chunks/_astro_content_B2HDxKAd.mjs';
import { $ as $$Note } from '../../chunks/Note_Ujycvmyr.mjs';
import { $ as $$Base } from '../../chunks/Base_Dcxoz-Oz.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://www.scalablehacker.com/");
const getStaticPaths = async () => {
  const allNotes = await getCollection("note");
  return allNotes.map((note) => ({
    params: { slug: note.id },
    props: { note }
  }));
};
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { note } = Astro2.props;
  const meta = {
    description: note.data.description || `Read about my note posted on: ${note.data.publishDate.toLocaleDateString()}`,
    title: note.data.title
  };
  return renderTemplate`${renderComponent($$result, "PageLayout", $$Base, { "meta": meta }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="fixed left-0 top-0 z-10 flex h-16 md:h-20 w-full bg-bgColor overflow-hidden"> <!-- Background 
			TODO: This approach is not optimal and requires improvements. 
  			- Too many absolutely positioned elements can affect performance. 
  		--> <div class="absolute top-0 left-1/2 -ml-[50vw] w-screen min-h-screen pointer-events-none blur-2xl"> <!--
			<div class="fixed blur-xl top-0 left-0 w-full h-16 md:h-20 bg-gradient-to-b from-indigo-300 via-purple-300 to-transparent opacity-10 dark:opacity-5"></div>
			--> <div class="absolute top-[-90%] right-[25%] w-[75%] h-full bg-gradient-to-b from-blue-300 via-pink-300 to-transparent rounded-full opacity-40 dark:opacity-5"></div> <div class="absolute top-[-90%] left-[25%] w-[75%] h-full bg-gradient-to-b from-blue-300 via-pink-300 to-transparent rounded-full opacity-40 dark:opacity-5"></div> <div class="absolute top-[-85%] right-[25%] w-[55%] h-full bg-gradient-to-b from-purple-300 via-blue-300 to-transparent rounded-full opacity-40 dark:opacity-5"></div> <div class="absolute top-[-85%] left-[25%] w-[55%] h-full bg-gradient-to-b from-indigo-300 via-orange-300 to-transparent rounded-full opacity-40 dark:opacity-5"></div> <div class="absolute top-[-75%] left-[-25%] w-[65%] h-full bg-gradient-to-b from-blue-300 via-pink-300 to-transparent rounded-full opacity-30 dark:opacity-5"></div> <div class="absolute top-[-75%] right-[-25%] w-[65%] h-full bg-gradient-to-b from-purple-300 via-blue-300 to-transparent rounded-full opacity-30 dark:opacity-5"></div> <div class="absolute top-[-85%] left-[-30%] w-[85%] h-full bg-gradient-to-b from-indigo-300 via-orange-300 to-transparent rounded-full opacity-60 dark:opacity-5"></div> <div class="absolute top-[-85%] right-[-30%] w-[85%] h-full bg-gradient-to-b from-orange-300 via-indigo-300 to-transparent rounded-full opacity-60 dark:opacity-5"></div> </div> </div> ${renderComponent($$result2, "Note", $$Note, { "as": "h1", "note": note })} ` })} ${renderScript($$result, "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/notes/[...slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/notes/[...slug].astro", void 0);

const $$file = "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/notes/[...slug].astro";
const $$url = "/notes/[...slug]";

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
