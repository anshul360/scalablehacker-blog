import { s as siteConfig } from './consts_yq49tbae.mjs';

function getFormattedDate(date, options) {
  if (date === void 0) {
    return "Invalid Date";
  }
  return new Intl.DateTimeFormat(siteConfig.date.locale, {
    ...siteConfig.date.options,
    ...options
  }).format(date);
}
function collectionDateSort(a, b) {
  return b.data.publishDate.getTime() - a.data.publishDate.getTime();
}

export { collectionDateSort as c, getFormattedDate as g };
//# sourceMappingURL=date_DpoIRUIO.mjs.map
