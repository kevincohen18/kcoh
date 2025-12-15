/**
 * Service Worker - NO CACHING MODE
 * This service worker is disabled to ensure fresh content on every load
 * All requests pass through to the network without caching
 */

console.log('[SW] No-cache service worker loaded');

// Install event - immediately activate
self.addEventListener('install', (event) => {
    console.log('[SW] Installing (no-cache mode)');
    event.waitUntil(self.skipWaiting());
});

// Activate event - delete ALL caches and take control
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating (no-cache mode)');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            // Delete ALL caches
            return Promise.all(
                cacheNames.map((cacheName) => {
                    console.log('[SW] Deleting cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            console.log('[SW] All caches cleared');
            return self.clients.claim();
        })
    );
});

// Fetch event - ALWAYS use network (no caching)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request, {
            cache: 'no-store', // Force no caching
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        }).catch(error => {
            console.error('[SW] Fetch failed:', error);
            return new Response('Network error', { status: 503 });
        })
    );
});

// Message handler
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    // Handle cache clear requests
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => caches.delete(cacheName));
        });
    }
});
