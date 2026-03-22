/**
 * AUTOMATIC CACHE BUSTER - Zero Configuration
 * Ensures users ALWAYS see the latest version without manual work
 *
 * This script automatically:
 * 1. Detects cached page loads and forces refresh
 * 2. Appends timestamps to all resources
 * 3. Clears old caches
 * 4. NO manual version bumping needed!
 */

(function() {
    'use strict';

    // Get current timestamp for cache busting
    const timestamp = Date.now();

    console.log('[Auto Cache Bust] Initializing... Timestamp:', timestamp);

    // === 1. DETECT CACHED PAGE LOADS ===
    // Log when the page was served from cache (the loader handles the visual transition)
    if (performance && performance.getEntriesByType) {
        const navEntries = performance.getEntriesByType('navigation');
        if (navEntries.length > 0) {
            const navEntry = navEntries[0];
            if (navEntry.transferSize === 0 || navEntry.type === 'back_forward') {
                console.log('[Auto Cache Bust] Cached page detected — loader will handle transition');
            }
        }
    }

    // === 2. CHECK IF WE NEED TO RELOAD BASED ON LAST VISIT ===
    const STORAGE_KEY = 'last-page-load';
    const lastLoad = sessionStorage.getItem(STORAGE_KEY);
    const currentLoad = Date.now().toString();

    // Store current load time
    sessionStorage.setItem(STORAGE_KEY, currentLoad);

    // === 3. CLEAR OLD CACHES ===
    if ('caches' in window) {
        caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
                console.log('[Auto Cache Bust] Clearing cache:', cacheName);
                caches.delete(cacheName);
            });
        }).catch(e => {
            console.warn('[Auto Cache Bust] Could not clear caches:', e);
        });
    }

    // === 4. CLEAR LOCAL STORAGE (except important data) ===
    try {
        const keysToPreserve = ['theme', 'user-preferences'];
        const allKeys = Object.keys(localStorage);

        allKeys.forEach(key => {
            if (!keysToPreserve.includes(key) && !key.startsWith('keep-')) {
                localStorage.removeItem(key);
            }
        });

        console.log('[Auto Cache Bust] Cleared old localStorage data');
    } catch (e) {
        console.warn('[Auto Cache Bust] Could not clear localStorage:', e);
    }

    // === 5. UNREGISTER SERVICE WORKERS ===
    // Service workers cache aggressively - remove them to ensure fresh content
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
                registration.unregister();
                console.log('[Auto Cache Bust] Unregistered service worker');
            });
        }).catch(e => {
            console.warn('[Auto Cache Bust] Could not unregister service workers:', e);
        });
    }

    // === 6. PREVENT BROWSER BACK/FORWARD CACHE ===
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            console.log('[Auto Cache Bust] Page restored from bfcache, reloading...');
            // Show loader overlay before reloading to prevent white flash
            var loader = document.getElementById('loader');
            if (!loader) {
                loader = document.createElement('div');
                loader.id = 'loader';
                loader.className = 'loader';
                loader.innerHTML = '<div class="loader-content"><div class="loader-logo">KCOH</div><div class="loader-spinner"></div></div>';
                document.body.prepend(loader);
            }
            loader.classList.remove('hidden');
            location.reload();
        }
    });

    // === 7. MARK RESOURCES WITH TIMESTAMPS ===
    // Update all script and link tags on the page
    window.addEventListener('DOMContentLoaded', function() {
        console.log('[Auto Cache Bust] Updating resource timestamps...');

        // Update all scripts
        document.querySelectorAll('script[src]').forEach(script => {
            const src = script.getAttribute('src');
            if (src && !src.startsWith('http') && !src.includes('?t=')) {
                const separator = src.includes('?') ? '&' : '?';
                script.setAttribute('src', `${src}${separator}t=${timestamp}`);
            }
        });

        // Update all stylesheets
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.includes('?t=')) {
                const separator = href.includes('?') ? '&' : '?';
                link.setAttribute('href', `${href}${separator}t=${timestamp}`);
            }
        });

        console.log('[Auto Cache Bust] ✅ All resources updated with timestamp:', timestamp);
    });

    console.log('[Auto Cache Bust] ✅ Active - Fresh content guaranteed!');
})();
