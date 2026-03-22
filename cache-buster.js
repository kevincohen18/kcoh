/**
 * Cache Buster - Silent auto-reload when new version detected
 */

(function() {
    'use strict';

    const CURRENT_VERSION = '3.5.2';

    // Check if there's a newer version via version.json
    function checkForUpdates() {
        fetch('/version.json?' + Date.now())
            .then(function(response) { return response.json(); })
            .then(function(data) {
                if (data.version !== CURRENT_VERSION) {
                    console.log('[Cache Buster] New version detected, reloading...');
                    location.reload();
                }
            })
            .catch(function(err) {
                console.log('[Cache Buster] Version check failed:', err);
            });
    }

    // Check on load and every 5 minutes
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkForUpdates);
    } else {
        checkForUpdates();
    }

    setInterval(checkForUpdates, 300000);

    // Track version in localStorage
    window.addEventListener('load', function() {
        if (window.localStorage) {
            var storedVersion = localStorage.getItem('site-version');
            if (storedVersion !== CURRENT_VERSION) {
                localStorage.setItem('site-version', CURRENT_VERSION);
            }
        }
    });
})();
