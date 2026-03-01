import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, f as renderSlot, a as renderTemplate } from './astro/server_BD3UESb9.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://www.scalablehacker.com/");
const $$Badge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Badge;
  const { variant = "default", showHash = true, title } = Astro2.props;
  const badgeClasses = {
    base: "flex items-baseline pt-[0.075rem] drop-shadow-lg active:drop-shadow-none rounded-lg h-6 px-2 text-sm font-medium transition-colors",
    variants: {
      default: "bg-textColor text-bgColor hover:brightness-105",
      accent: "bg-accent text-bgColor hover:brightness-105",
      "accent-base": "bg-accent-base text-bgColor hover:brightness-105",
      "accent-one": "bg-accent-one text-bgColor hover:brightness-105",
      "accent-two": "bg-accent-two text-bgColor hover:brightness-105",
      muted: "bg-color-100 text-textColor hover:bg-accent-two hover:text-bgColor drop-shadow-none hover:drop-shadow-lg",
      outline: "border border-lightest text-textColor drop-shadow-none",
      inactive: "text-lighter bg-color-100 drop-shadow-none"
    }
  };
  const variantClasses = badgeClasses.variants[variant];
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`${badgeClasses.base} ${variantClasses}`, "class")}> ${showHash && renderTemplate`<span class="h-full">#</span>`} ${title} ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/components/Badge.astro", void 0);

export { $$Badge as $ };
//# sourceMappingURL=Badge_BjNMUSh4.mjs.map
