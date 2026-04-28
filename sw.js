const CACHE='toc-v5';
const ASSETS=['/QuestWorld/','/QuestWorld/index.html','/QuestWorld/manifest.json','/QuestWorld/icon-192.png','/QuestWorld/icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})));
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>
    Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch',e=>{
  // Network first, fall back to cache — ensures latest code always loads
  e.respondWith(
    fetch(e.request).catch(()=>caches.match(e.request))
  );
});
