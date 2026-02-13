/**
 * Copyright © 2026 KCOH Software Inc. All Rights Reserved.
 * Cache-busting: appends a per-session timestamp to script src attributes.
 * Stylesheets load via HTML href (no JS needed) — this only busts script caches.
 */

(function() {
    'use strict';

    // Stable cache-bust per session; set once, reuse until tab closes
    var saved = Number(sessionStorage.getItem('CACHE_BUST_TS') || 0);
    var cacheBust = saved || Date.now();
    sessionStorage.setItem('CACHE_BUST_TS', String(cacheBust));
    window.CACHE_BUST = cacheBust;

    function applyTimestamps() {
        var ts = window.CACHE_BUST;

        // Cache-bust scripts only (CSS is loaded directly via HTML href)
        var mainScript = document.getElementById('main-script');
        if (mainScript && mainScript.src) {
            mainScript.src = mainScript.src.split('?')[0] + '?t=' + ts;
        }
        var terminalScript = document.getElementById('terminal-script');
        if (terminalScript && terminalScript.src) {
            terminalScript.src = terminalScript.src.split('?')[0] + '?t=' + ts;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyTimestamps);
    } else {
        applyTimestamps();
    }
})();
