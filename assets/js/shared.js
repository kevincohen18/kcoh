// ============================================
// SHARED JAVASCRIPT - Used across all pages
// Version: 3.0.0
// ============================================

// ============================================
// PERFORMANCE UTILITIES
// ============================================

// Debounce function to limit function calls during rapid events
function debounce(func, wait = 16) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function using requestAnimationFrame for optimal performance
function throttleRAF(func) {
    let ticking = false;
    return function(...args) {
        if (!ticking) {
            requestAnimationFrame(() => {
                func.apply(this, args);
                ticking = false;
            });
            ticking = true;
        }
    };
}

// ============================================
// SCROLL RESTORATION
// ============================================

// Disable browser scroll restoration (we'll handle it manually)
if (window.history.scrollRestoration) {
    window.history.scrollRestoration = 'manual';
}

// ============================================
// MOBILE MENU
// ============================================

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ============================================
// NAVBAR SCROLL EFFECT - REMOVED
// ============================================
// Navbar scroll effect removed - navbar stays fixed and consistent

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: [0, 0.1, 0.2],
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Use requestAnimationFrame for smooth animation triggering
            requestAnimationFrame(() => {
                entry.target.classList.add('visible');
                // Remove will-change after animation
                if (entry.target.style.willChange) {
                    setTimeout(() => {
                        entry.target.style.willChange = 'auto';
                    }, 1000);
                }
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ============================================
// PAGE TRANSITIONS
// ============================================

function initPageTransitions() {
    const sections = document.querySelectorAll('section');

    const transitionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        transitionObserver.observe(section);
    });
}

// ============================================
// LOADING SCREEN
// ============================================

function enhanceLoadingScreen() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const loaderContent = loader.querySelector('.loader-content');
    if (!loaderContent) return;

    // Add compilation text
    const compilingText = document.createElement('div');
    compilingText.style.cssText = `
        margin-top: 2rem;
        font-family: 'Courier New', monospace;
        color: #6366f1;
        font-size: 1rem;
    `;

    const messages = [
        'Initializing framework...',
        'Loading components...',
        'Compiling assets...',
        'Rendering UI...',
        'Ready!'
    ];

    let messageIndex = 0;

    const updateMessage = () => {
        if (messageIndex < messages.length) {
            compilingText.textContent = messages[messageIndex];
            messageIndex++;
            setTimeout(updateMessage, 300);
        }
    };

    loaderContent.appendChild(compilingText);
    updateMessage();

    // Hide loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.classList.remove('loading');
                document.body.classList.add('ready');
            }, 500);
        }, 1000);
    });
}

// ============================================
// DEVELOPER PALETTE
// ============================================

function initDeveloperPalette() {
    const palette = document.createElement('div');
    palette.className = 'dev-palette';
    palette.innerHTML = `
        <div class="dev-palette-header">
            <span>Developer Shortcuts</span>
            <span class="dev-palette-close">✕</span>
        </div>
        <div class="dev-palette-list">
            <span><span class="dev-key">Ctrl + \`</span>Open interactive terminal</span>
            <span><span class="dev-key">Ctrl + K</span>Toggle this palette</span>
            <span><span class="dev-key">?</span>Show/hide shortcuts</span>
            <span><span class="dev-key">Konami</span>Confetti surprise</span>
            <span><span class="dev-key">Click</span>Particle + ripple effects</span>
            <span><span class="dev-key">Hover</span>Magnetic cards + tilt</span>
        </div>
        <div class="dev-palette-hint">Press "?" or Ctrl+K from anywhere to view shortcuts.</div>
    `;

    const closeBtn = palette.querySelector('.dev-palette-close');
    closeBtn.addEventListener('click', () => {
        palette.classList.remove('show');
    });

    document.body.appendChild(palette);

    // Toggle palette with Ctrl+K or ?
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey && e.key === 'k') || e.key === '?') {
            e.preventDefault();
            palette.classList.toggle('show');
        }

        // Close palette with Escape
        if (e.key === 'Escape') {
            palette.classList.remove('show');
        }
    });
}

// ============================================
// MODERN HOVER EFFECT FOR TITLES
// ============================================

function initModernHoverEffect() {
    const headers = document.querySelectorAll('.section-title');

    headers.forEach(header => {
        // Skip effect for terminal/code style titles
        const text = header.textContent.trim();
        if (text.startsWith('$') || text.includes('~/') || text.includes('ls ')) {
            return;
        }

        // Add shimmer class on hover
        header.addEventListener('mouseenter', () => {
            header.classList.add('title-shimmer');
        });

        header.addEventListener('mouseleave', () => {
            header.classList.remove('title-shimmer');
        });
    });
}

// ============================================
// INITIALIZE SHARED COMPONENTS
// ============================================

// Critical effects - Load on DOMContentLoaded for instant interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Essential UI effects - Load first for immediate responsiveness
    initPageTransitions();
    initModernHoverEffect();
    initDeveloperPalette();
    enhanceLoadingScreen();
});

// Export utilities for use in page-specific scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttleRAF,
        initPageTransitions,
        enhanceLoadingScreen,
        initDeveloperPalette,
        initModernHoverEffect
    };
}
