import { g as getCollection } from './_astro_content_B2HDxKAd.mjs';

async function getAllPosts() {
  return await getCollection("post", ({ data }) => {
    return !data.draft ;
  });
}
function groupPostsByYear(posts) {
  return posts.reduce((acc, post) => {
    const year = post.data.publishDate.getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year]?.push(post);
    return acc;
  }, {});
}
function getAllTags(posts) {
  return posts.flatMap((post) => [...post.data.tags]);
}
function getUniqueTags(posts) {
  return [...new Set(getAllTags(posts))];
}
function getUniqueTagsWithCount(posts) {
  return [
    ...getAllTags(posts).reduce(
      (acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
      /* @__PURE__ */ new Map()
    )
  ].sort((a, b) => b[1] - a[1]);
}

export { groupPostsByYear as a, getUniqueTags as b, getUniqueTagsWithCount as c, getAllPosts as g };
//# sourceMappingURL=post_Amwrh5yK.mjs.map
