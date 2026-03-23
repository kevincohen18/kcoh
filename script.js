// KCOH Software Inc. — Minimal JS
// Navbar scroll, mobile menu, FAQ accordion, scroll fade-in.

(function () {
    'use strict';

    // Navbar scroll state
    var navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    // Mobile menu toggle
    var toggle = document.getElementById('mobileToggle');
    var links = document.getElementById('navLinks');
    if (toggle && links) {
        toggle.addEventListener('click', function () {
            links.classList.toggle('open');
        });
    }

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.closest('.faq-item');
            var isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.faq-item').forEach(function (el) {
                el.classList.remove('open');
                el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Open clicked (if it wasn't already open)
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Scroll-triggered fade-in
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: just show everything
        document.querySelectorAll('.fade-in').forEach(function (el) {
            el.classList.add('visible');
        });
    }
})();
