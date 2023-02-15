export const getWebsiteFavicon = (url: string, size = 64) => {
  return `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=${size}`;
}
