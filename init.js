/**
 * Copyright © 2026 KCOH Software Inc. All Rights Reserved.
 * Initialization script that runs before other resources load
 */

// Generate timestamp bucket for this session
(function() {
    'use strict';

    // Use a stable cache-bust per session; set once, reuse until tab closes
    const saved = Number(sessionStorage.getItem('CACHE_BUST_TS') || 0);
    const cacheBust = saved || Date.now();
    sessionStorage.setItem('CACHE_BUST_TS', cacheBust);
    window.CACHE_BUST = cacheBust;
    console.log('[Cache Bust] Timestamp:', window.CACHE_BUST);

    // Unregister all service workers (they cache aggressively)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(regs => {
            regs.forEach(reg => {
                console.log('[Cache Bust] Unregistering service worker');
                reg.unregister();
            });
        });
    }

    // Clear all caches
    if ('caches' in window) {
        caches.keys().then(names => {
            names.forEach(name => {
                console.log('[Cache Bust] Clearing cache:', name);
                caches.delete(name);
            });
        });
    }
})();

// Apply timestamp to preload links and stylesheets when DOM is ready
(function() {
    'use strict';

    function applyTimestamps() {
        const cacheBust = window.CACHE_BUST || Date.now();

        // Apply to preload links
        const preloadStyles = document.getElementById('preload-styles');
        const preloadScript = document.getElementById('preload-script');
        if (preloadStyles) preloadStyles.href = 'styles.css?t=' + cacheBust;
        if (preloadScript) preloadScript.href = 'script.js?t=' + cacheBust;

        // Apply to stylesheets
        const mainStyles = document.getElementById('main-styles');
        const quickWinsStyles = document.getElementById('quick-wins-styles');
        if (mainStyles) mainStyles.href = 'styles.css?t=' + cacheBust;
        if (quickWinsStyles) quickWinsStyles.href = 'quick-wins.css?t=' + cacheBust;

        // Apply to main script
        const mainScript = document.getElementById('main-script');
        if (mainScript && mainScript.src) {
            mainScript.src = mainScript.src.split('?')[0] + '?t=' + cacheBust;
        }

        // Apply to terminal script
        const terminalScript = document.getElementById('terminal-script');
        if (terminalScript && terminalScript.src) {
            terminalScript.src = terminalScript.src.split('?')[0] + '?t=' + cacheBust;
        }
    }

    // Run immediately if possible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyTimestamps);
    } else {
        applyTimestamps();
    }
})();
