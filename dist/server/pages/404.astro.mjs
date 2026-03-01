import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BD3UESb9.mjs';
import 'piccolore';
import { $ as $$Base } from '../chunks/Base_Dcxoz-Oz.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  const meta = {
    description: "Oops! It looks like this page is lost in space!",
    title: "Oops! You found a missing page!"
  };
  return renderTemplate`${renderComponent($$result, "PageLayout", $$Base, { "meta": meta }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="title mb-6">404 | Oops something went wrong</h1> <p class="mb-8">Please use the navigation to find your way back</p> ` })}`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/404.astro", void 0);

const $$file = "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
//# sourceMappingURL=404.astro.mjs.map
