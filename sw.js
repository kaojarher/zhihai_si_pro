/* 智海 AI Service Worker：離線可開啟、App 外殼快取；LLM / Google / Puter 等 API 一律直連網路，絕不快取。 */
const VERSION = 'zhihai-v4';
const SHELL_CACHE = `${VERSION}-shell`;
const CDN_CACHE = `${VERSION}-cdn`;

const SHELL = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-32.png'
];
// 只快取這些「靜態資源」網域（Tailwind、FontAwesome、PDF/Word/Excel/PPT 解析套件）
const CDN_HOSTS = ['cdn.tailwindcss.com', 'cdnjs.cloudflare.com'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await Promise.all(SHELL.map(u => cache.add(u).catch(() => {})));  // 單一檔案失敗不影響安裝
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keep = [SHELL_CACHE, CDN_CACHE];
    for (const k of await caches.keys()) if (!keep.includes(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

async function networkFirstPage(req) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put('./index.html', res.clone());
    return res;
  } catch (e) {
    return (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req);
  const refresh = fetch(req).then(res => {
    if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
    return res;
  }).catch(() => null);
  return hit || (await refresh) || Response.error();
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;                       // POST（LLM / Drive 上傳）直接放行
  const url = new URL(req.url);

  if (req.mode === 'navigate' && url.origin === self.location.origin) {
    event.respondWith(networkFirstPage(req));
    return;
  }
  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(req, SHELL_CACHE));
    return;
  }
  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(req, CDN_CACHE));
    return;
  }
  // 其餘（api.openai.com、googleapis.com、accounts.google.com、js.puter.com 等）不攔截
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
