import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate, r as renderComponent, F as Fragment, d as renderScript, f as renderSlot } from '../../chunks/astro/server_BD3UESb9.mjs';
import 'piccolore';
import { g as getCollection, r as renderEntry } from '../../chunks/_astro_content_B2HDxKAd.mjs';
import { g as getAllPosts } from '../../chunks/post_Amwrh5yK.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_CByYgECE.mjs';
import { $ as $$FormattedDate } from '../../chunks/FormattedDate_BNYOJjJd.mjs';
import { a as $$Icon, $ as $$Base } from '../../chunks/Base_Dcxoz-Oz.mjs';
import { $ as $$Badge } from '../../chunks/Badge_BjNMUSh4.mjs';
import 'clsx';
import { $ as $$SeriesPanel, a as $$TOC } from '../../chunks/SeriesPanel_Bzi8cJAG.mjs';
import * as fs from 'node:fs';
import { c as createInvalidVariablesError, g as getEnv$1, s as setOnSetGetEnv } from '../../chunks/runtime_CQJgFgds.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$6 = createAstro("https://www.scalablehacker.com/");
const $$Separator = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Separator;
  const { type = "horizontal", className = "" } = Astro2.props;
  const separatorClasses = {
    base: "flex-shrink-0 bg-lighter mx-2",
    // Общие стили
    types: {
      horizontal: "h-[1px] w-full",
      // Горизонтальный разделитель
      vertical: "h-full w-[1px]",
      // Вертикальный разделитель
      dot: "w-1.5 h-1.5 rounded-full"
      // Кружок для dot
    }
    // Указываем, что типы здесь конкретные строки
  };
  const typeClass = separatorClasses.types[type];
  return renderTemplate`${type === "dot" ? renderTemplate`${maybeRenderHead()}<span${addAttribute(`${separatorClasses.base} ${typeClass} ${className}`, "class")}></span>` : renderTemplate`<span role="separator"${addAttribute(type === "horizontal" ? "horizontal" : "vertical", "aria-orientation")}${addAttribute(`${separatorClasses.base} ${typeClass} ${className}`, "class")}></span>`}`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/components/Separator.astro", void 0);

const $$Astro$5 = createAstro("https://www.scalablehacker.com/");
const $$Masthead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Masthead;
  const {
    content
  } = Astro2.props;
  const dateTimeOptions = {
    month: "long"
  };
  const postSeries = content.data.seriesId ? await getCollection("series").then((series) => series.find((s) => s.id === content.data.seriesId)).catch((err) => {
    console.error("Failed to find series:", err);
    return null;
  }) : null;
  return renderTemplate`${maybeRenderHead()}<div class="md:sticky md:top-8 md:z-10 flex items-end"> ${postSeries ? renderTemplate`<button id="toggle-panel" class="hidden md:flex mr-2 h-8 w-8 items-center bg-accent-base/10 flex-shrink-0 justify-center rounded-lg text-accent-base hover:brightness-110" aria-label="Toggle Series Panel" aria-controls="series-panel">  ${renderComponent($$result, "Icon", $$Icon, { "aria-hidden": "true", "class": "flex-shrink-0 h-6 w-6", "focusable": "false", "name": "solar:notes-bold" })} </button>` : null} ${!!content.rendered?.metadata?.headings?.length && renderTemplate`<button id="toggle-toc" class="hidden md:flex h-8 w-8 items-center flex-shrink-0 bg-accent-base/10 justify-center rounded-lg text-accent-base hover:brightness-110" aria-label="Table of Contents"> ${renderComponent($$result, "Icon", $$Icon, { "aria-hidden": "true", "class": "h-6 w-6", "focusable": "false", "name": "solar:clipboard-list-bold" })} </button>`} <h1 class="title ml-2 md:sticky md:top-4 md:z-20 line-clamp-none md:line-clamp-1 md:max-w-[calc(100%-10rem)]"${addAttribute(content.data.title, "title")} data-pagefind-body> ${content.data.title} </h1> </div> <div class="flex flex-wrap items-center text-lighter text-sm mt-[1.0625rem] mx-2 mb-2"> <span class="flex items-center h-[1.75rem]"> ${renderComponent($$result, "Icon", $$Icon, { "aria-hidden": "true", "class": "flex items-center h-4 w-4 me-1", "focusable": "false", "name": "hugeicons:calendar-03" })} ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": content.data.publishDate, "dateTimeOptions": dateTimeOptions, "class": "flex flex-shrink-0" })} </span> ${renderComponent($$result, "Separator", $$Separator, { "type": "dot" })} <span class="flex items-center h-[1.75rem]"> ${renderComponent($$result, "Icon", $$Icon, { "aria-hidden": "true", "class": "flex items-center inline-block h-4 w-4 me-1", "focusable": "false", "name": "hugeicons:book-open-01" })}  ${content.rendered?.metadata?.frontmatter?.readingTime ? `${content.rendered.metadata.frontmatter.readingTime}` : "Less than one minute read"} </span> ${content.data.updatedDate && renderTemplate`${renderComponent($$result, "Separator", $$Separator, { "type": "dot" })}
			<span class="h-[1.75rem] flex items-center flex-shrink-0 rounded-lg bg-accent-two/5 text-accent-two py-1 px-2 text-sm gap-x-1">
Updated:${renderComponent($$result, "FormattedDate", $$FormattedDate, { "class": "flex flex-shrink-0", "date": content.data.updatedDate, "dateTimeOptions": dateTimeOptions })} </span>`} </div> ${content.data.draft ? renderTemplate`<span class="text-base text-red-500 ml-2">(Draft)</span>` : null} ${content.data.coverImage && renderTemplate`<div class="mb-4 mt-2 overflow-auto rounded-lg"> ${renderComponent($$result, "Image", $$Image, { "alt": content.data.coverImage.alt, "class": "object-cover", "fetchpriority": "high", "loading": "lazy", "loading": "eager", "src": content.data.coverImage.src })} </div>`} <p class="prose max-w-none text-textColor mx-2" data-pagefind-body> ${content.data.description} </p> <div class="mt-4 flex flex-wrap items-center gap-2 mx-1">  ${content.data.tags?.length ? renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "aria-hidden": "true", "class": "flex-shrink-0 inline-block h-6 w-6 text-accent-base", "focusable": "false", "name": "solar:tag-line-duotone" })}	
			${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${content.data.tags.map((tag) => renderTemplate`<a${addAttribute(`View all posts with the tag: ${tag}`, "aria-label")}${addAttribute(`/tags/${tag}`, "href")}> ${renderComponent($$result2, "Badge", $$Badge, { "variant": "accent-two", "title": tag })} </a>`)}` })}` : renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "aria-hidden": "true", "class": "flex-shrink-0 inline-block h-6 w-6 text-lightest", "focusable": "false", "name": "solar:tag-line-duotone" })}
			<span class="text-sm text-lightest">No tags</span>`}  ${postSeries ? renderTemplate`<div class="flex items-center gap-2"> ${renderComponent($$result, "Icon", $$Icon, { "aria-hidden": "true", "class": "flex-shrink-0 inline-block h-6 w-6 text-accent-base", "focusable": "false", "name": "solar:notes-line-duotone" })} <a${addAttribute(`About ${postSeries.data.title} series`, "aria-label")}${addAttribute(`/series/${postSeries.id}`, "href")} class="flex items-center gap-2 flex-wrap"> ${renderComponent($$result, "Badge", $$Badge, { "variant": "accent-base", "showHash": false, "title": postSeries.data.title })} </a> </div>` : renderTemplate`<div class="flex items-center gap-2"> ${renderComponent($$result, "Icon", $$Icon, { "aria-hidden": "true", "class": "flex-shrink-0 inline-block h-6 w-6 text-lightest", "focusable": "false", "name": "solar:notes-line-duotone" })} <span class="text-sm text-lightest">Not in series</span> </div>`} </div>`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/components/blog/Masthead.astro", void 0);

const schema = {"WEBMENTION_API_KEY":{"context":"server","access":"secret","optional":true,"type":"string"},"WEBMENTION_URL":{"context":"client","access":"public","optional":true,"type":"string"},"WEBMENTION_PINGBACK":{"context":"client","access":"public","optional":true,"type":"string"}};

function getEnvFieldType(options) {
  const optional = options.default !== void 0 ? false : true ;
  let type;
  if (options.type === "enum") {
    type = options.values.map((v) => `'${v}'`).join(" | ");
  } else {
    type = options.type;
  }
  return `${type}${optional ? " | undefined" : ""}`;
}
const stringValidator = ({ max, min, length, url, includes, startsWith, endsWith }) => (input) => {
  if (typeof input !== "string") {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  const errors = [];
  if (max !== void 0 && !(input.length <= max)) {
    errors.push("max");
  }
  if (min !== void 0 && !(input.length >= min)) {
    errors.push("min");
  }
  if (length !== void 0 && !(input.length === length)) {
    errors.push("length");
  }
  if (url !== void 0 && !URL.canParse(input)) {
    errors.push("url");
  }
  if (includes !== void 0 && !input.includes(includes)) {
    errors.push("includes");
  }
  if (startsWith !== void 0 && !input.startsWith(startsWith)) {
    errors.push("startsWith");
  }
  if (endsWith !== void 0 && !input.endsWith(endsWith)) {
    errors.push("endsWith");
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }
  return {
    ok: true,
    value: input
  };
};
const numberValidator = ({ gt, min, lt, max, int }) => (input) => {
  const num = parseFloat(input ?? "");
  if (isNaN(num)) {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  const errors = [];
  if (gt !== void 0 && !(num > gt)) {
    errors.push("gt");
  }
  if (min !== void 0 && !(num >= min)) {
    errors.push("min");
  }
  if (lt !== void 0 && !(num < lt)) {
    errors.push("lt");
  }
  if (max !== void 0 && !(num <= max)) {
    errors.push("max");
  }
  if (int !== void 0) {
    const isInt = Number.isInteger(num);
    if (!(int ? isInt : !isInt)) {
      errors.push("int");
    }
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }
  return {
    ok: true,
    value: num
  };
};
const booleanValidator = (input) => {
  const bool = input === "true" ? true : input === "false" ? false : void 0;
  if (typeof bool !== "boolean") {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  return {
    ok: true,
    value: bool
  };
};
const enumValidator = ({ values }) => (input) => {
  if (!(typeof input === "string" ? values.includes(input) : false)) {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  return {
    ok: true,
    value: input
  };
};
function selectValidator(options) {
  switch (options.type) {
    case "string":
      return stringValidator(options);
    case "number":
      return numberValidator(options);
    case "boolean":
      return booleanValidator;
    case "enum":
      return enumValidator(options);
  }
}
function validateEnvVariable(value, options) {
  if (value === void 0) {
    return {
      ok: true,
      value: options.default
    };
  }
  return selectValidator(options)(value);
}

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-check

// @ts-expect-error
/** @returns {string} */
// used while generating the virtual module
// biome-ignore lint/correctness/noUnusedFunctionParameters: `key` is used by the generated code
const getEnv = (key) => {
	return getEnv$1(key);
};

const _internalGetSecret = (key) => {
	const rawVariable = getEnv(key);
	const variable = rawVariable === '' ? undefined : rawVariable;
	const options = schema[key];

	const result = validateEnvVariable(variable, options);
	if (result.ok) {
		return result.value;
	}
	const type = getEnvFieldType(options);
	throw createInvalidVariablesError(key, type, result);
};

setOnSetGetEnv(() => {
	WEBMENTION_API_KEY = _internalGetSecret("WEBMENTION_API_KEY");

});
let WEBMENTION_API_KEY = _internalGetSecret("WEBMENTION_API_KEY");

const DOMAIN = "https://www.scalablehacker.com/";
const CACHE_DIR = ".data";
const filePath = `${CACHE_DIR}/webmentions.json`;
const validWebmentionTypes = ["like-of", "mention-of", "in-reply-to"];
const hostName = new URL(DOMAIN).hostname;
async function fetchWebmentions(timeFrom, perPage = 1e3) {
  if (!WEBMENTION_API_KEY) {
    console.warn("No webmention api token specified in .env");
    return null;
  }
  let url = `https://webmention.io/api/mentions.jf2?domain=${hostName}&token=${WEBMENTION_API_KEY}&sort-dir=up&per-page=${perPage}`;
  if (timeFrom) url += `&since${timeFrom}`;
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    return data;
  }
  return null;
}
function mergeWebmentions(a, b) {
  return Array.from(
    [...a.children, ...b.children].reduce((map, obj) => map.set(obj["wm-id"], obj), /* @__PURE__ */ new Map()).values()
  );
}
function filterWebmentions(webmentions) {
  return webmentions.filter((webmention) => {
    if (!validWebmentionTypes.includes(webmention["wm-property"])) return false;
    if (webmention["wm-property"] === "mention-of" || webmention["wm-property"] === "in-reply-to") {
      return webmention.content && webmention.content.text !== "";
    }
    return true;
  });
}
function writeToCache(data) {
  const fileContent = JSON.stringify(data, null, 2);
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR);
  }
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) throw err;
    console.log(`Webmentions saved to ${filePath}`);
  });
}
function getFromCache() {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  }
  return {
    lastFetched: null,
    children: []
  };
}
async function getAndCacheWebmentions() {
  const cache = getFromCache();
  const mentions = await fetchWebmentions(cache.lastFetched);
  if (mentions) {
    mentions.children = filterWebmentions(mentions.children);
    const webmentions = {
      lastFetched: (/* @__PURE__ */ new Date()).toISOString(),
      // Make sure the first arg is the cache
      children: mergeWebmentions(cache, mentions)
    };
    writeToCache(webmentions);
    return webmentions;
  }
  return cache;
}
let webMentions;
async function getWebmentionsForUrl(url) {
  if (!webMentions) webMentions = await getAndCacheWebmentions();
  return webMentions.children.filter((entry) => entry["wm-target"] === url);
}

const $$Astro$4 = createAstro("https://www.scalablehacker.com/");
const $$Comments = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Comments;
  const { mentions } = Astro2.props;
  const validComments = ["mention-of", "in-reply-to"];
  const comments = mentions.filter(
    (mention) => validComments.includes(mention["wm-property"]) && mention.content?.text
  );
  return renderTemplate`${!!comments.length && renderTemplate`${maybeRenderHead()}<div><p class="mb-0 text-accent-base"><strong>${comments.length}</strong> Mention${comments.length > 1 ? "s" : ""}</p><ul class="mt-0 divide-y divide-textColor/20 ps-0" role="list">${comments.map((mention) => renderTemplate`<li class="p-comment h-cite my-0 flex items-start gap-x-5 py-5">${mention.author?.photo && mention.author.photo !== "" ? mention.author.url && mention.author.url !== "" ? renderTemplate`<a class="u-author not-prose shrink-0 overflow-hidden rounded-full outline-none ring-2 ring-textColor hover:ring-4 hover:ring-link focus-visible:ring-4 focus-visible:ring-link"${addAttribute(mention.author.url, "href")} rel="noreferrer" target="_blank"${addAttribute(mention.author.name, "title")}>${renderComponent($$result, "Image", $$Image, { "alt": mention.author?.name, "class": "u-photo my-0 h-12 w-12", "height": 48, "src": mention.author?.photo, "width": 48 })}</a>` : renderTemplate`${renderComponent($$result, "Image", $$Image, { "alt": mention.author?.name, "class": "u-photo my-0 h-12 w-12 rounded-full", "height": 48, "src": mention.author?.photo, "width": 48 })}` : null}<div class="flex-auto"><div class="p-author h-card flex items-center justify-between gap-x-2"><p class="p-name my-0 line-clamp-1 font-semibold text-accent-base">${mention.author?.name}</p><a aria-labelledby="cmt-source" class="u-url not-prose hover:text-link"${addAttribute(mention.url, "href")} rel="noreferrer" target="_blank"><span class="hidden" id="cmt-source">
Vist the source of this webmention
</span>${renderComponent($$result, "Icon", $$Icon, { "aria-hidden": "true", "class": "h-5 w-5", "focusable": "false", "name": "mdi:open-in-new" })}</a></div><p class="comment-content mb-0 mt-1 break-words [word-break:break-word]">${mention.content?.text}</p></div></li>`)}</ul></div>`}`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/components/blog/webmentions/Comments.astro", void 0);

const $$Astro$3 = createAstro("https://www.scalablehacker.com/");
const $$Likes = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Likes;
  const { mentions } = Astro2.props;
  const MAX_LIKES = 10;
  const likes = mentions.filter((mention) => mention["wm-property"] === "like-of");
  const likesToShow = likes.filter((like) => like.author?.photo && like.author.photo !== "").slice(0, MAX_LIKES);
  return renderTemplate`${!!likes.length && renderTemplate`${maybeRenderHead()}<div><p class="mb-0 text-accent-base"><strong>${likes.length}</strong>${likes.length > 1 ? " People" : " Person"} liked this
</p>${!!likesToShow.length && renderTemplate`<ul class="flex list-none flex-wrap overflow-hidden ps-2" role="list">${likesToShow.map((like) => renderTemplate`<li class="p-like h-cite -ms-2"><a class="u-url not-prose relative inline-block overflow-hidden rounded-full outline-none ring-2 ring-textColor hover:z-10 hover:ring-4 hover:ring-link focus-visible:z-10 focus-visible:ring-4 focus-visible:ring-link"${addAttribute(like.author?.url, "href")} rel="noreferrer" target="_blank"${addAttribute(like.author?.name, "title")}><span class="p-author h-card">${renderComponent($$result, "Image", $$Image, { "alt": like.author.name, "class": "u-photo my-0 inline-block h-12 w-12", "height": 48, "src": like.author.photo, "width": 48 })}</span></a></li>`)}</ul>`}</div>`}`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/components/blog/webmentions/Likes.astro", void 0);

const $$Astro$2 = createAstro("https://www.scalablehacker.com/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index;
  const url = new URL(Astro2.url.pathname, Astro2.site);
  const webMentions = await getWebmentionsForUrl(`${url}`);
  if (!webMentions.length) return;
  return renderTemplate`${maybeRenderHead()}<hr class="border-solid"> <h2 class="mb-8 before:hidden">Webmentions for this post</h2> <div class="space-y-10"> ${renderComponent($$result, "Likes", $$Likes, { "mentions": webMentions })} ${renderComponent($$result, "Comments", $$Comments, { "mentions": webMentions })} </div> <p class="mt-8">
Responses powered by${" "} <a href="https://webmention.io" rel="noreferrer" target="_blank">Webmentions</a> </p>`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/components/blog/webmentions/index.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://www.scalablehacker.com/");
const $$BlogPost = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { post } = Astro2.props;
  const { ogImage, title, description, updatedDate, publishDate, seriesId } = post.data;
  const socialImage = ogImage ?? `/og-image/${post.id}.png`;
  const articleDate = updatedDate?.toISOString() ?? publishDate.toISOString();
  const { headings } = await renderEntry(post);
  return renderTemplate(_a || (_a = __template(["", " <!-- Copy code button --> ", " ", " ", " ", " <!-- Scroll to top button --> ", ' <!-- REQUIRES IMPROVEMENT!!! --> <!-- Menu button instead of the main menu --> <!--\n<script>\n	document.addEventListener("DOMContentLoaded", () => {\n		const menuButton = document.getElementById("toggle-navigation-menu");\n		const navigationMenu = document.getElementById("menu");\n\n		if (!menuButton || !navigationMenu) {\n			console.error("Menu button or navigation menu is missing in the DOM.");\n			return;\n		}\n\n		menuButton.addEventListener("click", () => {\n			const isOpen = menuButton.getAttribute("aria-expanded") === "true";\n\n			if (isOpen) {\n				// Close the menu\n				navigationMenu.classList.add("hidden");\n			} else {\n				// Open the menu\n				navigationMenu.classList.remove("hidden");\n			}\n\n			// Update the button state\n			menuButton.setAttribute("aria-expanded", (!isOpen).toString());\n		});\n	});\n<\/script>\n-->'])), renderComponent($$result, "BaseLayout", $$Base, { "meta": { articleDate, description, ogImage: socialImage, title } }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="fixed left-0 top-0 z-10 flex h-16 md:h-20 w-full bg-bgColor overflow-hidden"> <!-- Background 
			TODO: This approach is not optimal and requires improvements. 
  			- Too many absolutely positioned elements can affect performance. 
  		--> <div class="absolute top-0 left-1/2 -ml-[50vw] w-screen min-h-screen pointer-events-none blur-2xl"> <div class="absolute top-[-90%] right-[25%] w-[75%] h-full bg-gradient-to-b from-blue-300 via-pink-300 to-transparent rounded-full opacity-40 dark:opacity-5"></div> <div class="absolute top-[-90%] left-[25%] w-[75%] h-full bg-gradient-to-b from-blue-300 via-pink-300 to-transparent rounded-full opacity-40 dark:opacity-5"></div> <div class="absolute top-[-85%] right-[25%] w-[55%] h-full bg-gradient-to-b from-purple-300 via-blue-300 to-transparent rounded-full opacity-40 dark:opacity-5"></div> <div class="absolute top-[-85%] left-[25%] w-[55%] h-full bg-gradient-to-b from-indigo-300 via-orange-300 to-transparent rounded-full opacity-40 dark:opacity-5"></div> <div class="absolute top-[-75%] left-[-25%] w-[65%] h-full bg-gradient-to-b from-blue-300 via-pink-300 to-transparent rounded-full opacity-30 dark:opacity-5"></div> <div class="absolute top-[-75%] right-[-25%] w-[65%] h-full bg-gradient-to-b from-purple-300 via-blue-300 to-transparent rounded-full opacity-30 dark:opacity-5"></div> <div class="absolute top-[-85%] left-[-30%] w-[85%] h-full bg-gradient-to-b from-indigo-300 via-orange-300 to-transparent rounded-full opacity-60 dark:opacity-5"></div> <div class="absolute top-[-85%] right-[-30%] w-[85%] h-full bg-gradient-to-b from-orange-300 via-indigo-300 to-transparent rounded-full opacity-60 dark:opacity-5"></div> </div> </div>         ${renderComponent($$result2, "Masthead", $$Masthead, { "content": post })} <div class="mt-6 flex sm:grid-cols-[auto_1fr] md:items-start gap-x-8"> <article class="grid flex-grow grid-cols-1 break-words pt-4" data-pagefind-body> <div class="prose prose-citrus max-w-none flex-grow prose-headings:font-semibold prose-headings:text-accent-base prose-headings:before:text-accent-two sm:prose-headings:before:content-['#'] sm:prose-th:before:content-none"> ${renderSlot($$result2, $$slots["default"])} </div> ${renderComponent($$result2, "WebMentions", $$Index, {})} </article> ${!!headings.length && renderTemplate`<aside id="toc-panel" class="md:sticky md:top-20 z-10 hidden md:w-[14rem] md:min-w-[14rem] md:rounded-lg md:block"> ${renderComponent($$result2, "TOC", $$TOC, { "headings": headings })} </aside>`} </div> <div class="left-0 right-12 z-50 ml-auto w-fit md:absolute"> <button id="to-top-button" class="fixed bottom-14 flex h-12 w-12 text-light translate-y-28 items-center justify-center rounded-full bg-bgColor text-3xl drop-shadow-xl transition-all duration-300 hover:text-accent-two data-[show=true]:translate-y-0 data-[show=true]:opacity-100" aria-label="Back to Top" data-show="false"> <span class="absolute inset-0 rounded-full bg-special-lighter flex items-center justify-center" aria-hidden="true"> <svg class="h-6 w-6" fill="none" focusable="false" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M4.5 15.75l7.5-7.5 7.5 7.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </span> </button> </div>  ${seriesId && renderTemplate`${renderComponent($$result2, "mobile-button", "mobile-button", { "id": "toggle-panel-mobile", "class": "size-12 flex items-center justify-center block sm:hidden fixed bottom-4 shadow-[0px_10px_25px_rgba(0,0,0,0.15)] border border-special-lighter right-4 z-50 rounded-lg bg-bgColor text-accent-base hover:text-bg-accent-base/90", "aria-label": "Toggle Series Panel" }, { "default": () => renderTemplate` <span class="absolute inset-0 rounded-lg flex items-center justify-center bg-special-light hover:text-accent-base/90"> ${renderComponent($$result2, "Icon", $$Icon, { "class": "size-8", "name": "solar:notes-bold" })} </span> ` })}`}   `, "sidebar": async ($$result2) => renderTemplate`${seriesId && renderTemplate`${renderComponent($$result2, "SeriesPanel", $$SeriesPanel, { "slot": "sidebar", "seriesId": seriesId })}`}` }), renderScript($$result, "/Users/anshul360/personal_site/scalablehacker-citrus/src/layouts/BlogPost.astro?astro&type=script&index=0&lang.ts"), renderScript($$result, "/Users/anshul360/personal_site/scalablehacker-citrus/src/layouts/BlogPost.astro?astro&type=script&index=1&lang.ts"), renderScript($$result, "/Users/anshul360/personal_site/scalablehacker-citrus/src/layouts/BlogPost.astro?astro&type=script&index=2&lang.ts"), renderScript($$result, "/Users/anshul360/personal_site/scalablehacker-citrus/src/layouts/BlogPost.astro?astro&type=script&index=3&lang.ts"), renderScript($$result, "/Users/anshul360/personal_site/scalablehacker-citrus/src/layouts/BlogPost.astro?astro&type=script&index=4&lang.ts"));
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/layouts/BlogPost.astro", void 0);

const $$Astro = createAstro("https://www.scalablehacker.com/");
const getStaticPaths = async () => {
  const blogEntries = await getAllPosts();
  return blogEntries.map((post) => ({
    params: { slug: post.id },
    props: { post }
  }));
};
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { post } = Astro2.props;
  const { Content } = await renderEntry(post);
  return renderTemplate`${renderComponent($$result, "PostLayout", $$BlogPost, { "post": post }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/posts/[...slug].astro", void 0);

const $$file = "/Users/anshul360/personal_site/scalablehacker-citrus/src/pages/posts/[...slug].astro";
const $$url = "/posts/[...slug]";

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
