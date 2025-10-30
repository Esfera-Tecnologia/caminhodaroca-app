const CACHE_NAME = 'caminhodaroca-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/login.html',
  '/cadastro.html',
  '/cadastro-parceiro.html',
  '/home.html',
  '/parceiros.html',
  '/parceiro-detalhe.html',
  '/editar-parceiro.html',
  '/mapa.html',
  '/propriedade.html',
  '/termodeuso.html',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/screenshot-narrow–540x960.png',
  '/screenshot-wide–1280x720.png',
  // Adicione aqui os outros arquivos HTML, CSS, JS e imagens que fazem parte do app
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
