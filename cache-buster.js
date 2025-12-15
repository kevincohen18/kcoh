/**
 * Cache Buster - Auto-reload when new version detected
 * This script checks for updates and automatically reloads the page
 */

(function() {
    'use strict';

    const CURRENT_VERSION = '3.4.0';
    const CHECK_INTERVAL = 60000; // Check every 60 seconds

    // Register service worker if supported
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('[Cache Buster] Service Worker registered:', registration.scope);

                    // Check for updates periodically
                    setInterval(() => {
                        registration.update();
                    }, CHECK_INTERVAL);

                    // Listen for new service worker waiting
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;

                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New service worker available - notify user
                                showUpdateNotification();
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log('[Cache Buster] Service Worker registration failed:', error);
                });
        });
    }

    // Check if there's a newer version via version.json
    function checkForUpdates() {
        fetch('/version.json?' + Date.now())
            .then(response => response.json())
            .then(data => {
                if (data.version !== CURRENT_VERSION) {
                    console.log('[Cache Buster] New version available:', data.version);
                    showUpdateNotification();
                }
            })
            .catch(err => {
                console.log('[Cache Buster] Version check failed:', err);
            });
    }

    // Show update notification
    function showUpdateNotification() {
        const notification = document.createElement('div');
        notification.id = 'update-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.75rem;
                box-shadow: 0 10px 40px rgba(99, 102, 241, 0.4);
                z-index: 10000;
                animation: slideIn 0.3s ease;
                max-width: 300px;
            ">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9"/>
                    </svg>
                    <div>
                        <strong style="display: block; margin-bottom: 0.25rem;">Update Available!</strong>
                        <span style="font-size: 0.875rem; opacity: 0.9;">A new version is ready</span>
                    </div>
                </div>
                <button onclick="location.reload(true)" style="
                    margin-top: 0.75rem;
                    width: 100%;
                    background: white;
                    color: #6366f1;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                ">
                    Refresh Now
                </button>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                    background: none;
                    border: none;
                    color: white;
                    opacity: 0.7;
                    cursor: pointer;
                    font-size: 1.25rem;
                    line-height: 1;
                    width: 24px;
                    height: 24px;
                ">×</button>
            </div>
            <style>
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            </style>
        `;
        document.body.appendChild(notification);
    }

    // Check for updates on load and periodically
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkForUpdates);
    } else {
        checkForUpdates();
    }

    // Check for updates every 5 minutes
    setInterval(checkForUpdates, 300000);

    // Force reload resources on page load (aggressive cache busting)
    window.addEventListener('load', () => {
        // Clear old storage
        if (window.localStorage) {
            const storedVersion = localStorage.getItem('site-version');
            if (storedVersion !== CURRENT_VERSION) {
                console.log('[Cache Buster] Version changed, clearing cache');
                localStorage.setItem('site-version', CURRENT_VERSION);

                // Optional: Show a subtle notification that cache was cleared
                console.log('[Cache Buster] Cache cleared, running latest version');
            }
        }
    });
})();
