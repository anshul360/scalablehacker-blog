import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderComponent, a as renderTemplate, F as Fragment } from './astro/server_BD3UESb9.mjs';
import 'piccolore';
import { r as renderEntry } from './_astro_content_B2HDxKAd.mjs';
import { $ as $$FormattedDate } from './FormattedDate_BNYOJjJd.mjs';

const $$Astro = createAstro("https://www.scalablehacker.com/");
const $$Note = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Note;
  const { as: Tag = "div", note, isPreview = false } = Astro2.props;
  const { Content } = await renderEntry(note);
  return renderTemplate`${maybeRenderHead()}<article${addAttribute([isPreview && "inline-grid w-full rounded-lg bg-color-75 px-4 md:px-8 py-2 md:py-4"], "class:list")}${addAttribute(isPreview ? false : true, "data-pagefind-body")}> ${renderComponent($$result, "Tag", Tag, { "class:list": ["flex items-end title md:sticky md:top-8 md:z-10", { "text-base": isPreview }] }, { "default": async ($$result2) => renderTemplate`${isPreview ? renderTemplate`<a class="citrus-link"${addAttribute(`/notes/${note.id}/`, "href")}> ${note.data.title} </a>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${note.data.title}` })}`}` })} <div${addAttribute(["flex items-end h-6 text-sm text-lighter", { "mt-4": !isPreview }], "class:list")}> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "dateTimeOptions": {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "long",
    day: "2-digit"
  }, "date": note.data.publishDate })} </div> <div${addAttribute(["prose prose-citrus mt-4 max-w-none [&>p:last-of-type]:mb-0", {
    "line-clamp-4": isPreview,
    "[&>blockquote]:line-clamp-4 [&>blockquote]:mb-0": isPreview,
    "[&>blockquote:not(:first-of-type)]:hidden": isPreview
    // "[&>p]:line-clamp-4": isPreview,
    // "[&>p:not(:first-of-type)]:hidden": isPreview,
  }], "class:list")}> ${renderComponent($$result, "Content", Content, {})} </div> </article>`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/components/note/Note.astro", void 0);

export { $$Note as $ };
//# sourceMappingURL=Note_Ujycvmyr.mjs.map
