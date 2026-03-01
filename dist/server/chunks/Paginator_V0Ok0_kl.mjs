import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate } from './astro/server_BD3UESb9.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://www.scalablehacker.com/");
const $$Paginator = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Paginator;
  const { nextUrl, prevUrl } = Astro2.props;
  return renderTemplate`${(prevUrl || nextUrl) && renderTemplate`${maybeRenderHead()}<nav class="flex items-center gap-x-4 font-medium text-accent">${prevUrl && renderTemplate`<a class="me-auto py-2 sm:hover:text-accent-two" data-astro-prefetch${addAttribute(prevUrl.url, "href")}>${prevUrl.srLabel && renderTemplate`<span class="sr-only">${prevUrl.srLabel}</span>`}${prevUrl.text ? prevUrl.text : "Previous"}</a>`}${nextUrl && renderTemplate`<a class="ms-auto py-2 sm:hover:text-accent-two" data-astro-prefetch${addAttribute(nextUrl.url, "href")}>${nextUrl.srLabel && renderTemplate`<span class="sr-only">${nextUrl.srLabel}</span>`}${nextUrl.text ? nextUrl.text : "Next"}</a>`}</nav>`}`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/components/Paginator.astro", void 0);

export { $$Paginator as $ };
//# sourceMappingURL=Paginator_V0Ok0_kl.mjs.map
