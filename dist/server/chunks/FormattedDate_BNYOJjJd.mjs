import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, a as renderTemplate } from './astro/server_BD3UESb9.mjs';
import { g as getFormattedDate } from './date_DpoIRUIO.mjs';
import 'clsx';

const $$Astro = createAstro("https://www.scalablehacker.com/");
const $$FormattedDate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date, dateTimeOptions, ...attrs } = Astro2.props;
  const postDate = getFormattedDate(date, dateTimeOptions);
  const ISO = date.toISOString();
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(ISO, "datetime")}${addAttribute(ISO, "title")}${spreadAttributes(attrs)}>${postDate}</time>`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/components/FormattedDate.astro", void 0);

export { $$FormattedDate as $ };
//# sourceMappingURL=FormattedDate_BNYOJjJd.mjs.map
