/**
 * Copyright 2026 KCOH Software Inc. All Rights Reserved.
 * Early language detection — runs before DOM renders to prevent flash of wrong language.
 */
var __kcohDetectedLang = localStorage.getItem('kcoh-lang') ||
    (navigator.language && navigator.language.startsWith('fr') ? 'fr' : 'en');
document.documentElement.lang = __kcohDetectedLang;
document.documentElement.classList.add('lang-' + __kcohDetectedLang);
window.__kcohLang = __kcohDetectedLang;
