import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderComponent, F as Fragment, a as renderTemplate } from './astro/server_BD3UESb9.mjs';
import 'piccolore';
import { $ as $$FormattedDate } from './FormattedDate_BNYOJjJd.mjs';
import { $ as $$Image } from './_astro_assets_CByYgECE.mjs';

const $$Astro = createAstro("https://www.scalablehacker.com/");
const $$PostPreview = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostPreview;
  const { as: Tag = "div", post, withDesc = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(withDesc ? "flex flex-col" : "flex flex-col grow sm:flex-row sm:items-center sm:justify-between", "class")}> ${!withDesc ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "class": "shrink-0 text-lighter text-sm sm:order-2 sm:text-right", "date": post.data.publishDate, "dateTimeOptions": {
    // hour: "2-digit",
    // minute: "2-digit",
    year: "numeric",
    month: "long",
    day: "2-digit"
  } })} ${renderComponent($$result2, "Tag", Tag, { "class": "citrus-link font-medium text-accent-base sm:order-1 sm:flex-gro md:line-clamp-1" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Fragment", Fragment, {}, { "default": ($$result4) => renderTemplate` <a data-astro-prefetch${addAttribute(`/posts/${post.id}/`, "href")}> ${post.data.draft && renderTemplate`<span class="text-red-500">(Draft) </span>`} ${post.data.title} </a> ` })} ` })} ` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "class": "text-sm shrink-0 text-lighter", "date": post.data.publishDate, "dateTimeOptions": {
    // hour: "2-digit",
    // minute: "2-digit",
    year: "numeric",
    month: "long",
    day: "2-digit"
  } })} ${renderComponent($$result2, "Tag", Tag, { "class": "citrus-link font-medium flex-row text-accent-base mt-2.5" }, { "default": ($$result3) => renderTemplate` <a data-astro-prefetch${addAttribute(`/posts/${post.id}/`, "href")}> ${renderComponent($$result3, "Image", $$Image, { "src": post.data.coverImage.src, "alt": post.data.coverImage.alt, "class": " max-w-xs" })} ${post.data.title} </a> ` })} <p class="mt-0.5 line-clamp-2">${post.data.description}</p> ` })}`} </div>`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/components/blog/PostPreview.astro", void 0);

export { $$PostPreview as $ };
//# sourceMappingURL=PostPreview_DfLWqfoM.mjs.map
