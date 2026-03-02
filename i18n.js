/**
 * Copyright © 2026 KCOH Software Inc. All Rights Reserved.
 * i18n.js — Lightweight translation engine for EN/FR bilingual support.
 */

(function () {
    'use strict';

    var STORAGE_KEY = 'kcoh-lang';
    var DEFAULT_LANG = 'en';
    var SUPPORTED = ['en', 'fr'];
    var cache = {};

    function getCurrentLang() {
        return window.__kcohLang || DEFAULT_LANG;
    }

    function setLang(lang) {
        if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
        localStorage.setItem(STORAGE_KEY, lang);
        window.__kcohLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.classList.remove('lang-en', 'lang-fr');
        document.documentElement.classList.add('lang-' + lang);
    }

    function loadTranslations(lang, cb) {
        if (cache[lang]) return cb(null, cache[lang]);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'lang/' + lang + '.json?t=' + (window.CACHE_BUST || Date.now()), true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200) {
                try {
                    cache[lang] = JSON.parse(xhr.responseText);
                    cb(null, cache[lang]);
                } catch (e) {
                    cb(e);
                }
            } else {
                cb(new Error('Failed to load ' + lang + '.json'));
            }
        };
        xhr.send();
    }

    function resolve(obj, key) {
        var parts = key.split('.');
        var val = obj;
        for (var i = 0; i < parts.length; i++) {
            if (val == null) return undefined;
            val = val[parts[i]];
        }
        return val;
    }

    function applyTranslations(dict) {
        // data-i18n → textContent (safe — no HTML injection)
        var els = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < els.length; i++) {
            var key = els[i].getAttribute('data-i18n');
            var val = resolve(dict, key);
            if (val !== undefined) {
                els[i].textContent = val;
            }
        }

        // data-i18n-placeholder → placeholder attribute
        var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        for (var j = 0; j < placeholders.length; j++) {
            var pk = placeholders[j].getAttribute('data-i18n-placeholder');
            var pv = resolve(dict, pk);
            if (pv !== undefined) placeholders[j].placeholder = pv;
        }

        // data-i18n-aria → aria-label attribute
        var arias = document.querySelectorAll('[data-i18n-aria]');
        for (var k = 0; k < arias.length; k++) {
            var ak = arias[k].getAttribute('data-i18n-aria');
            var av = resolve(dict, ak);
            if (av !== undefined) arias[k].setAttribute('aria-label', av);
        }

        // data-i18n-tooltip → data-tooltip attribute
        var tooltips = document.querySelectorAll('[data-i18n-tooltip]');
        for (var t = 0; t < tooltips.length; t++) {
            var tk = tooltips[t].getAttribute('data-i18n-tooltip');
            var tv = resolve(dict, tk);
            if (tv !== undefined) tooltips[t].setAttribute('data-tooltip', tv);
        }

        // data-i18n-alt → alt attribute
        var alts = document.querySelectorAll('[data-i18n-alt]');
        for (var a = 0; a < alts.length; a++) {
            var altk = alts[a].getAttribute('data-i18n-alt');
            var altv = resolve(dict, altk);
            if (altv !== undefined) alts[a].alt = altv;
        }

        // data-i18n-value → textContent for option elements
        var vals = document.querySelectorAll('[data-i18n-value]');
        for (var v = 0; v < vals.length; v++) {
            var vk = vals[v].getAttribute('data-i18n-value');
            var vv = resolve(dict, vk);
            if (vv !== undefined) vals[v].textContent = vv;
        }
    }

    function updateToggleButtons(lang) {
        var toggles = document.querySelectorAll('.lang-toggle');
        var label = lang === 'fr' ? 'EN' : 'FR';
        for (var i = 0; i < toggles.length; i++) {
            toggles[i].textContent = label;
            toggles[i].setAttribute('aria-label',
                lang === 'fr' ? 'Switch to English' : 'Passer au français');
        }
    }

    function updateSearchIndex(dict) {
        var searchEntries = resolve(dict, 'search');
        if (searchEntries && Array.isArray(searchEntries)) {
            window.__searchIndex = searchEntries;
        }
    }

    function switchTo(lang, skipToggle) {
        setLang(lang);
        loadTranslations(lang, function (err, dict) {
            if (err) {
                console.warn('[i18n] Error loading translations:', err);
                markReady();
                return;
            }
            applyTranslations(dict);
            if (!skipToggle) updateToggleButtons(lang);
            updateSearchIndex(dict);
            markReady();
        });
    }

    function markReady() {
        document.documentElement.classList.add('i18n-ready');
    }

    function init() {
        var lang = getCurrentLang();
        setLang(lang);

        // Bind toggle buttons
        document.addEventListener('click', function (e) {
            var btn = e.target.closest('.lang-toggle');
            if (!btn) return;
            e.preventDefault();
            var next = getCurrentLang() === 'fr' ? 'en' : 'fr';
            switchTo(next);
        });

        // Load and apply
        if (lang === DEFAULT_LANG) {
            // English is already in the HTML — just load for search index and mark ready
            loadTranslations(lang, function (err, dict) {
                if (!err) updateSearchIndex(dict);
                updateToggleButtons(lang);
                markReady();
            });
        } else {
            switchTo(lang);
        }
    }

    // Cross-tab sync: when another tab changes the language, update this one
    window.addEventListener('storage', function (e) {
        if (e.key !== STORAGE_KEY) return;
        var newLang = e.newValue;
        if (newLang && SUPPORTED.indexOf(newLang) !== -1 && newLang !== getCurrentLang()) {
            switchTo(newLang);
        }
    });

    // Tab-switch-back: re-check localStorage when user returns to this tab
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) return;
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored && SUPPORTED.indexOf(stored) !== -1 && stored !== getCurrentLang()) {
            switchTo(stored);
        }
    });

    // Back/forward cache: ensure correct language after browser navigation
    window.addEventListener('pageshow', function (e) {
        if (!e.persisted) return;
        var stored = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
        if (stored !== getCurrentLang()) {
            switchTo(stored);
        }
    });

    // Run on DOMContentLoaded or immediately if already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose for external use
    window.__i18n = {
        switchTo: switchTo,
        getCurrentLang: getCurrentLang
    };
})();
