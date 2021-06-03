function customizeLegacyForumsUrl(url) {
  const host = url.host?.replace('www', 'na').replace('forums.', '');
  const server = host.replace('.leagueoflegends.com', '');
  const pathname = url.pathname?.replace('board', server) ?? '';
  const search = url.search?.replace('p', 't') ?? '';
  const hash = url.hash ?? '';
  const newUrl = `https://forums.leagueboards.net${pathname}${search}${hash}`;
  return newUrl;
}

function listener(details) {
  const url = new URL(details.url);
  if (url && url.pathname.startsWith('/board'))
    return {
      redirectUrl: customizeLegacyForumsUrl(url)
    };
  else return {};
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {urls: ["http://*.leagueoflegends.com/board/*"]},
  ["blocking"]
);