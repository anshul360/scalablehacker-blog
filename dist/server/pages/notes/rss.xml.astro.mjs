import { g as getCollection } from '../../chunks/_astro_content_B2HDxKAd.mjs';
import { s as siteConfig } from '../../chunks/consts_yq49tbae.mjs';
import rss from '@astrojs/rss';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  const notes = await getCollection("note");
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: "https://www.scalablehacker.com/",
    items: notes.map((note) => ({
      title: note.data.title,
      pubDate: note.data.publishDate,
      link: `notes/${note.id}/`
    }))
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
//# sourceMappingURL=rss.xml.astro.mjs.map
