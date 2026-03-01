import { g as getAllPosts } from '../chunks/post_Amwrh5yK.mjs';
import { s as siteConfig } from '../chunks/consts_yq49tbae.mjs';
import rss from '@astrojs/rss';
export { renderers } from '../renderers.mjs';

const GET = async () => {
  const posts = await getAllPosts();
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: "https://www.scalablehacker.com/",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `posts/${post.id}/`
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
