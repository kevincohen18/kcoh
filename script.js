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

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll is now handled by the enhanced smoothScrollTo function below

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Force reflow to ensure transform is applied
            entry.target.offsetHeight;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    // Service cards with stagger
    document.querySelectorAll('.service-card').forEach((el, index) => {
        el.classList.add('stagger-item');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Portfolio items with stagger
    document.querySelectorAll('.portfolio-item').forEach((el, index) => {
        el.classList.add('stagger-item');
        el.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(el);
    });

    // Testimonial cards
    document.querySelectorAll('.testimonial-card').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(el);
    });

    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // About text
    document.querySelectorAll('.about-text').forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });

    // Stats
    document.querySelectorAll('.stat-item').forEach((el, index) => {
        el.classList.add('scale-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Tech categories
    document.querySelectorAll('.tech-category').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(el);
    });

    // Contact items
    document.querySelectorAll('.contact-item').forEach((el, index) => {
        el.classList.add('slide-in-left');
        el.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(el);
    });
});

// Contact Form Handling - Removed duplicate handler (now handled below with EmailJS)

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Enhanced loading animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Trigger initial animations
            document.body.style.opacity = '1';
        }, 800);
    }
});

// Removed parallax effects that cause overlaps during scroll
// Parallax disabled to prevent overlapping issues

// Removed mouse parallax to prevent overlaps

// Animate numbers in stats
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Observe stats for number animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    statNumber.textContent = '0+';
                    animateNumber(statNumber, number);
                }
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Particle System for Hero Section
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize particles when page loads
window.addEventListener('load', () => {
    setTimeout(initParticles, 500);
});

// Magnetic cursor effect will be added below with modern implementation

// Smooth scroll with easing
function smoothScrollTo(target) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const duration = 1000;
        const run = easeInOutCubic(timeElapsed / duration);
        window.scrollTo(0, startPosition + distance * run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Enhanced smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScrollTo(target);
    });
});

// Removed problematic parallax effect that caused overlapping issues

// Back to Top Button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'dark') {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
} else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');
        
        const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });
}

// Animate tech progress bars on scroll
const techProgressBars = document.querySelectorAll('.tech-progress');

const techObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target;
            const progressValue = progress.getAttribute('data-progress');
            progress.style.width = progressValue + '%';
            techObserver.unobserve(progress);
        }
    });
}, { threshold: 0.5 });

techProgressBars.forEach(bar => {
    techObserver.observe(bar);
});

// Enhanced form validation
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });

    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Validate based on field type
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        field.parentElement.appendChild(errorDiv);
    }

    return isValid;
}

// Initialize EmailJS
// Replace 'YOUR_PUBLIC_KEY' with your EmailJS public key
// Get it from https://dashboard.emailjs.com/admin/integration
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_CONTACT_TEMPLATE = 'YOUR_CONTACT_TEMPLATE_ID';
const EMAILJS_NEWSLETTER_TEMPLATE = 'YOUR_NEWSLETTER_TEMPLATE_ID';

// Initialize EmailJS if available
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Enhanced form submission with EmailJS
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            return;
        }
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        const originalBackground = submitButton.style.background;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        submitButton.style.background = '#6b7280';
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        try {
            // Check if EmailJS is configured
            if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
                // Send email via EmailJS
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_CONTACT_TEMPLATE,
                    {
                        from_name: formData.name,
                        from_email: formData.email,
                        subject: formData.subject,
                        message: formData.message,
                        to_email: 'contact@kcoh.ca'
                    }
                );
                
                // Show success message
                showFormMessage(contactForm, 'Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.style.background = originalBackground;
                submitButton.disabled = false;
            } else {
                // Fallback: Send email via mailto link
                const mailtoLink = `mailto:contact@kcoh.ca?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
                window.location.href = mailtoLink;
                
                // Show success message
                showFormMessage(contactForm, 'Opening your email client...', 'success');
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = originalBackground;
                    submitButton.disabled = false;
                }, 2000);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage(contactForm, 'Failed to send message. Please try again or email us directly at contact@kcoh.ca', 'error');
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.style.background = originalBackground;
            submitButton.disabled = false;
        }
    });
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value.trim();
        
        // Validate email
        if (!email || !validateEmail(email)) {
            showFormMessage(newsletterForm, 'Please enter a valid email address.', 'error');
            return;
        }
        
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        const originalBackground = submitButton.style.background;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Subscribing...';
        submitButton.style.background = '#6b7280';
        
        try {
            // Check if EmailJS is configured
            if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
                // Send email via EmailJS
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_NEWSLETTER_TEMPLATE,
                    {
                        email: email,
                        to_email: 'contact@kcoh.ca'
                    }
                );
                
                // Show success message
                showFormMessage(newsletterForm, 'Successfully subscribed! Check your email for confirmation.', 'success');
                newsletterForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.style.background = originalBackground;
                submitButton.disabled = false;
            } else {
                // Fallback: Store in localStorage and show success
                const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
                if (!subscribers.includes(email)) {
                    subscribers.push(email);
                    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
                }
                
                // Show success message
                showFormMessage(newsletterForm, 'Successfully subscribed! We\'ll keep you updated.', 'success');
                newsletterForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.style.background = originalBackground;
                submitButton.disabled = false;
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            showFormMessage(newsletterForm, 'Failed to subscribe. Please try again.', 'error');
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.style.background = originalBackground;
            submitButton.disabled = false;
        }
    });
}

// Helper function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show form messages
function showFormMessage(form, message, type) {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    
    // Insert message after form or before submit button
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.parentNode.insertBefore(messageDiv, submitButton);
    } else {
        form.appendChild(messageDiv);
    }
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Cookie Consent
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookies = document.getElementById('acceptCookies');
const declineCookies = document.getElementById('declineCookies');

// Check if user has already made a choice
if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
        if (cookieConsent) {
            cookieConsent.classList.add('show');
        }
    }, 1000);
}

if (acceptCookies) {
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        if (cookieConsent) {
            cookieConsent.classList.remove('show');
            document.body.classList.remove('cookie-visible');
        }
    });
}

if (declineCookies) {
    declineCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        if (cookieConsent) {
            cookieConsent.classList.remove('show');
            document.body.classList.remove('cookie-visible');
        }
    });
}

// Add body class when cookie consent is visible
if (cookieConsent) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (cookieConsent.classList.contains('show')) {
                    document.body.classList.add('cookie-visible');
                } else {
                    document.body.classList.remove('cookie-visible');
                }
            }
        });
    });

    observer.observe(cookieConsent, { attributes: true });
}

// ============================================
// MODERN DEVELOPER EFFECTS & ANIMATIONS
// ============================================

// Matrix Rain Effect
function initMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-rain';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.04';
    document.querySelector('.hero').appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|~';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#6366f1';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Code Typing Animation
function initCodeTyping() {
    const codeLines = [
        'const developer = new Developer();',
        'developer.skills = ["React", "Node.js", "Python"];',
        'developer.build(yourIdea);',
        '// Creating amazing software...'
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = '';

    const codeDisplay = document.createElement('div');
    codeDisplay.className = 'code-typing';
    codeDisplay.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 20px;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        color: #6366f1;
        background: rgba(15, 23, 42, 0.95);
        padding: 1.5rem;
        padding-top: 2.5rem;
        border-radius: 0.5rem;
        border: 1px solid #6366f1;
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        max-width: 400px;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.5s;
    `;

    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0.7;
        transition: opacity 0.3s;
    `;
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.7');
    closeBtn.addEventListener('click', () => {
        codeDisplay.style.opacity = '0';
        setTimeout(() => codeDisplay.remove(), 500);
    });

    codeDisplay.appendChild(closeBtn);
    document.body.appendChild(codeDisplay);

    setTimeout(() => {
        codeDisplay.style.opacity = '1';
        typeCode();
    }, 2000);

    function typeCode() {
        if (lineIndex < codeLines.length) {
            if (charIndex < codeLines[lineIndex].length) {
                currentLine += codeLines[lineIndex][charIndex];
                codeDisplay.innerHTML = codeLines.slice(0, lineIndex).join('<br>') +
                    (lineIndex > 0 ? '<br>' : '') +
                    currentLine + '<span class="cursor">|</span>';
                charIndex++;
                setTimeout(typeCode, 50);
            } else {
                lineIndex++;
                charIndex = 0;
                currentLine = '';
                setTimeout(typeCode, 500);
            }
        } else {
            setTimeout(() => {
                codeDisplay.style.opacity = '0';
                setTimeout(() => {
                    lineIndex = 0;
                    charIndex = 0;
                    currentLine = '';
                    codeDisplay.innerHTML = '';
                    setTimeout(() => {
                        codeDisplay.style.opacity = '1';
                        typeCode();
                    }, 1000);
                }, 500);
            }, 3000);
        }
    }
}

// Magnetic Cursor Effect
function initMagneticCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'magnetic-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
        mix-blend-mode: difference;
        opacity: 0.8;
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
    `;
    document.body.appendChild(cursor);

    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    cursorRing.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid #6366f1;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.2s ease, width 0.2s ease, height 0.2s ease;
        opacity: 0.5;
    `;
    document.body.appendChild(cursorRing);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;

        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        cursorRing.style.transform = `translate(${mouseX - 20}px, ${mouseY - 20}px)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Expand cursor on hover
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${cursorX - 15}px, ${cursorY - 15}px) scale(1.5)`;
            cursorRing.style.width = '60px';
            cursorRing.style.height = '60px';
            cursorRing.style.transform = `translate(${mouseX - 30}px, ${mouseY - 30}px)`;
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(1)`;
            cursorRing.style.width = '40px';
            cursorRing.style.height = '40px';
            cursorRing.style.transform = `translate(${mouseX - 20}px, ${mouseY - 20}px)`;
        });
    });
}

// Glitch Effect for Headers
function initGlitchEffect() {
    const headers = document.querySelectorAll('.section-title');
    headers.forEach(header => {
        header.addEventListener('mouseenter', () => {
            header.style.animation = 'glitch 0.3s infinite';
        });
        header.addEventListener('mouseleave', () => {
            header.style.animation = '';
        });
    });

    // Add glitch keyframes to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% {
                text-shadow: 2px 2px #6366f1, -2px -2px #8b5cf6;
                transform: translate(0);
            }
            25% {
                text-shadow: -2px -2px #6366f1, 2px 2px #8b5cf6;
                transform: translate(-2px, 2px);
            }
            50% {
                text-shadow: 2px -2px #6366f1, -2px 2px #8b5cf6;
                transform: translate(2px, -2px);
            }
            75% {
                text-shadow: -2px 2px #6366f1, 2px -2px #8b5cf6;
                transform: translate(-2px, -2px);
            }
            100% {
                text-shadow: 2px 2px #6366f1, -2px -2px #8b5cf6;
                transform: translate(0);
            }
        }

        .cursor { animation: blink 0.7s infinite; }

        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }

        .holographic-card {
            position: relative;
            overflow: hidden;
        }

        .holographic-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg,
                transparent 30%,
                rgba(99, 102, 241, 0.1) 50%,
                transparent 70%);
            animation: holographic-shine 3s linear infinite;
        }

        @keyframes holographic-shine {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .floating-particles {
            position: fixed;
            pointer-events: none;
            z-index: 1;
        }
    `;
    document.head.appendChild(style);
}

// Holographic Card Effect
function initHolographicCards() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');
    cards.forEach(card => {
        card.classList.add('holographic-card');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Circuit Board Background Pattern
function initCircuitBoard() {
    const canvas = document.createElement('canvas');
    canvas.id = 'circuit-board';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.03;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawCircuit() {
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 1;

        for (let i = 0; i < 50; i++) {
            const x1 = Math.random() * canvas.width;
            const y1 = Math.random() * canvas.height;
            const x2 = x1 + (Math.random() - 0.5) * 200;
            const y2 = y1 + (Math.random() - 0.5) * 200;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x1, y1, 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x2, y2, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawCircuit();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCircuit();
    });
}

// Enhanced Particle System with Mouse Interaction
function initInteractiveParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // Particles will now react to mouse position
    const particleSystem = {
        mouseX: mouseX,
        mouseY: mouseY
    };

    // Add floating code snippets
    const codeSnippets = ['{ }', '< />', '( )', '[ ]', '=>', '{}', 'fn', 'const', 'let'];
    let floatingCode = [];

    for (let i = 0; i < 15; i++) {
        floatingCode.push({
            text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.3 + 0.1
        });
    }

    function animateFloatingCode() {
        ctx.font = '14px monospace';
        floatingCode.forEach(code => {
            ctx.fillStyle = `rgba(99, 102, 241, ${code.opacity})`;
            ctx.fillText(code.text, code.x, code.y);

            code.x += code.vx;
            code.y += code.vy;

            if (code.x > canvas.width) code.x = 0;
            if (code.x < 0) code.x = canvas.width;
            if (code.y > canvas.height) code.y = 0;
            if (code.y < 0) code.y = canvas.height;
        });
    }

    // Integrate with existing particle animation
    const originalAnimate = window.animateParticles || (() => {});
    window.animateParticles = function() {
        originalAnimate();
        animateFloatingCode();
    };
}

// Smooth Page Transitions
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

// Enhanced Loading Screen
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
        'Optimizing performance...',
        'Ready!'
    ];

    let messageIndex = 0;
    const interval = setInterval(() => {
        if (messageIndex < messages.length) {
            compilingText.textContent = messages[messageIndex];
            messageIndex++;
        }
    }, 150);

    loaderContent.appendChild(compilingText);

    setTimeout(() => {
        clearInterval(interval);
    }, 800);
}

// Terminal Command Animation in Console
function initTerminalCommands() {
    const commands = [
        'npm install awesome-website',
        'Building modern UI...',
        'Compiling with love ❤️',
        'Website ready! 🚀'
    ];

    commands.forEach((cmd, index) => {
        setTimeout(() => {
            console.log(`%c$ ${cmd}`, 'color: #6366f1; font-weight: bold; font-size: 14px;');
        }, index * 500);
    });
}

// ============================================
// ULTRA INTERACTIVE EFFECTS
// ============================================

// Particle Explosion on Click
function initClickExplosion() {
    const canvas = document.createElement('canvas');
    canvas.id = 'explosion-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    class ExplosionParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 10;
            this.vy = (Math.random() - 0.5) * 10;
            this.life = 100;
            this.maxLife = 100;
            this.size = Math.random() * 4 + 2;
            this.color = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'][Math.floor(Math.random() * 4)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.2; // gravity
            this.life--;
        }

        draw() {
            const opacity = this.life / this.maxLife;
            ctx.fillStyle = this.color;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        isDead() {
            return this.life <= 0;
        }
    }

    document.addEventListener('click', (e) => {
        for (let i = 0; i < 30; i++) {
            particles.push(new ExplosionParticle(e.clientX, e.clientY));
        }
    });

    function animateExplosions() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        particles = particles.filter(p => !p.isDead());
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animateExplosions);
    }

    animateExplosions();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Mouse Trail Particles
function initMouseTrail() {
    const canvas = document.createElement('canvas');
    canvas.id = 'trail-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9997;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const trail = [];
    const maxTrailLength = 20;

    class TrailParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.life = 30;
            this.size = Math.random() * 3 + 1;
        }

        update() {
            this.life--;
        }

        draw() {
            const opacity = this.life / 30;
            ctx.fillStyle = `rgba(99, 102, 241, ${opacity * 0.6})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        isDead() {
            return this.life <= 0;
        }
    }

    let lastX = 0, lastY = 0;
    document.addEventListener('mousemove', (e) => {
        const dist = Math.sqrt((e.clientX - lastX) ** 2 + (e.clientY - lastY) ** 2);
        if (dist > 5) {
            trail.push(new TrailParticle(e.clientX, e.clientY));
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    function animateTrail() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = trail.length - 1; i >= 0; i--) {
            trail[i].update();
            trail[i].draw();
            if (trail[i].isDead()) {
                trail.splice(i, 1);
            }
        }

        requestAnimationFrame(animateTrail);
    }

    animateTrail();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Interactive Ripple Effect
function initRippleEffect() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple-wave {
            position: fixed;
            border-radius: 50%;
            border: 2px solid rgba(99, 102, 241, 0.5);
            pointer-events: none;
            animation: ripple-expand 1s ease-out;
            z-index: 9996;
        }

        @keyframes ripple-expand {
            from {
                width: 0;
                height: 0;
                opacity: 1;
            }
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-wave';
        ripple.style.left = (e.clientX - 150) + 'px';
        ripple.style.top = (e.clientY - 150) + 'px';
        document.body.appendChild(ripple);

        setTimeout(() => ripple.remove(), 1000);
    });
}

// Konami Code Easter Egg
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonamiEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateKonamiEasterEgg() {
        // Create celebration overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            padding: 3rem;
            border-radius: 1rem;
            box-shadow: 0 0 100px rgba(99, 102, 241, 0.8);
            z-index: 99999;
            text-align: center;
            color: white;
            font-size: 2rem;
            font-weight: bold;
            animation: konamiPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        overlay.innerHTML = `
            🎮 KONAMI CODE ACTIVATED! 🎮<br>
            <span style="font-size: 1rem; opacity: 0.9;">You found the secret!</span><br>
            <span style="font-size: 1rem; opacity: 0.8;">🚀 Developer Mode Unlocked 🚀</span>
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes konamiPop {
                0% { transform: translate(-50%, -50%) scale(0); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(styleSheet);

        document.body.appendChild(overlay);

        // Trigger confetti
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = ['🎉', '🚀', '⭐', '💻', '🔥'][Math.floor(Math.random() * 5)];
                confetti.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}%;
                    top: -50px;
                    font-size: 2rem;
                    pointer-events: none;
                    z-index: 99998;
                    animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
                `;
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 4000);
            }, i * 30);
        }

        const confettiStyle = document.createElement('style');
        confettiStyle.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(confettiStyle);

        setTimeout(() => overlay.remove(), 5000);
    }
}

// Interactive Terminal
function initInteractiveTerminal() {
    const terminal = document.createElement('div');
    terminal.id = 'interactive-terminal';
    terminal.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 400px;
        background: rgba(15, 23, 42, 0.95);
        border: 1px solid #6366f1;
        border-radius: 0.5rem;
        padding: 1rem;
        font-family: 'Courier New', monospace;
        color: #6366f1;
        z-index: 10001;
        box-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
        display: none;
        max-height: 300px;
        overflow-y: auto;
    `;

    const terminalHeader = document.createElement('div');
    terminalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        font-weight: bold;
    `;
    terminalHeader.innerHTML = `
        <span>Developer Terminal</span>
        <span style="cursor: pointer;" id="terminal-close">✕</span>
    `;

    const terminalOutput = document.createElement('div');
    terminalOutput.id = 'terminal-output';
    terminalOutput.style.cssText = `
        margin-bottom: 1rem;
        font-size: 0.9rem;
        max-height: 200px;
        overflow-y: auto;
    `;
    terminalOutput.innerHTML = `<div>Welcome to KCOH Terminal v1.0</div><div>Type 'help' for available commands</div>`;

    const terminalInput = document.createElement('input');
    terminalInput.type = 'text';
    terminalInput.placeholder = '$ type command...';
    terminalInput.style.cssText = `
        width: 100%;
        background: transparent;
        border: none;
        border-top: 1px solid #6366f1;
        padding: 0.5rem 0;
        color: #6366f1;
        font-family: inherit;
        outline: none;
    `;

    terminal.appendChild(terminalHeader);
    terminal.appendChild(terminalOutput);
    terminal.appendChild(terminalInput);
    document.body.appendChild(terminal);

    // Toggle terminal with Ctrl+`
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '`') {
            e.preventDefault();
            terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
            if (terminal.style.display === 'block') {
                terminalInput.focus();
            }
        }
    });

    document.getElementById('terminal-close').addEventListener('click', () => {
        terminal.style.display = 'none';
    });

    const commands = {
        help: 'Available commands: help, about, skills, contact, clear, matrix, party',
        about: 'KCOH Software Inc. - Professional software development services',
        skills: 'React, Node.js, Python, AWS, Docker, and more!',
        contact: 'Email: contact@kcoh.ca | Phone: 514-898-8716',
        clear: '',
        matrix: 'Entering the Matrix... 🟢',
        party: '🎉 Party mode activated! 🎊',
        whoami: 'You are exploring the portfolio of a professional developer',
        ls: 'services/  portfolio/  about/  contact/',
        pwd: '/home/kcoh/website',
        date: new Date().toLocaleString()
    };

    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.value.trim().toLowerCase();
            const output = terminalOutput;

            output.innerHTML += `<div style="margin-top: 0.5rem;">$ ${terminalInput.value}</div>`;

            if (cmd === 'clear') {
                output.innerHTML = '';
            } else if (cmd === 'party') {
                output.innerHTML += `<div style="color: #a78bfa;">${commands[cmd]}</div>`;
                triggerPartyMode();
            } else if (commands[cmd]) {
                output.innerHTML += `<div style="color: #a78bfa;">${commands[cmd]}</div>`;
            } else if (cmd) {
                output.innerHTML += `<div style="color: #ef4444;">Command not found: ${cmd}</div>`;
            }

            output.scrollTop = output.scrollHeight;
            terminalInput.value = '';
        }
    });

    function triggerPartyMode() {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }

    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
}

// Floating Achievement Badges
function initAchievementBadges() {
    const achievements = [
        { icon: '🎯', text: 'Explorer', trigger: 'scroll', threshold: 1000 },
        { icon: '🖱️', text: 'Clicker', trigger: 'click', threshold: 10 },
        { icon: '⌨️', text: 'Typist', trigger: 'keypress', threshold: 50 },
        { icon: '🕐', text: 'Time Traveler', trigger: 'time', threshold: 30000 }
    ];

    let stats = { scroll: 0, click: 0, keypress: 0, time: 0 };
    const unlockedAchievements = new Set();

    window.addEventListener('scroll', () => stats.scroll = window.pageYOffset);
    document.addEventListener('click', () => stats.click++);
    document.addEventListener('keypress', () => stats.keypress++);
    setInterval(() => stats.time += 1000, 1000);

    function checkAchievements() {
        achievements.forEach(achievement => {
            const key = achievement.icon + achievement.text;
            if (!unlockedAchievements.has(key)) {
                const statValue = stats[achievement.trigger];
                if (statValue >= achievement.threshold) {
                    unlockAchievement(achievement);
                    unlockedAchievements.add(key);
                }
            }
        });
    }

    function unlockAchievement(achievement) {
        const badge = document.createElement('div');
        badge.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
            z-index: 99999;
            animation: achievementSlide 0.5s ease, achievementShake 0.5s ease 0.5s;
            font-weight: bold;
        `;
        badge.innerHTML = `
            <div style="font-size: 2rem; text-align: center;">${achievement.icon}</div>
            <div>Achievement Unlocked!</div>
            <div style="font-size: 0.9rem; opacity: 0.9;">${achievement.text}</div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes achievementSlide {
                from { transform: translateX(500px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes achievementShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px) rotate(-5deg); }
                75% { transform: translateX(10px) rotate(5deg); }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(badge);
        setTimeout(() => badge.remove(), 4000);
    }

    setInterval(checkAchievements, 1000);
}

// Parallax Mouse Movement
function initParallaxLayers() {
    const layers = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        layers.forEach((layer, index) => {
            const rect = layer.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                const depth = (index % 3 + 1) * 5;
                const moveX = mouseX * depth;
                const moveY = mouseY * depth;

                layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    });
}

// Interactive Stats Counter
function initInteractiveStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        stat.style.cursor = 'pointer';
        stat.style.transition = 'all 0.3s ease';

        stat.addEventListener('click', () => {
            const currentValue = parseInt(stat.textContent);
            const newValue = currentValue + 1;

            stat.style.transform = 'scale(1.2) rotate(360deg)';
            stat.textContent = newValue + '+';

            setTimeout(() => {
                stat.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });

        stat.addEventListener('mouseenter', () => {
            stat.style.transform = 'scale(1.1)';
        });

        stat.addEventListener('mouseleave', () => {
            stat.style.transform = 'scale(1)';
        });
    });
}

// Card Shake Effect
function initShakeEffects() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item');

    cards.forEach(card => {
        let shakeTimeout;

        card.addEventListener('mouseenter', () => {
            shakeTimeout = setTimeout(() => {
                card.style.animation = 'cardShake 0.5s ease';
            }, 500);
        });

        card.addEventListener('mouseleave', () => {
            clearTimeout(shakeTimeout);
            card.style.animation = '';
        });

        card.addEventListener('animationend', () => {
            card.style.animation = '';
        });
    });

    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes cardShake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-3px) rotate(-1deg); }
            20%, 40%, 60%, 80% { transform: translateX(3px) rotate(1deg); }
        }
    `;
    document.head.appendChild(shakeStyle);
}

// Easter Eggs - Double Click Logo
function initEasterEggs() {
    const logo = document.querySelector('.logo-text');

    logo.addEventListener('dblclick', () => {
        logo.style.animation = 'logoSpin 1s ease';
        setTimeout(() => logo.style.animation = '', 1000);

        // Show secret message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(99, 102, 241, 0.95);
            color: white;
            padding: 2rem;
            border-radius: 1rem;
            z-index: 99999;
            font-size: 1.5rem;
            box-shadow: 0 0 50px rgba(99, 102, 241, 0.8);
            animation: secretPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        message.textContent = '🎉 You found a secret! Keep exploring! 🚀';
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    });

    const logoStyle = document.createElement('style');
    logoStyle.textContent = `
        @keyframes logoSpin {
            from { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.5); }
            to { transform: rotate(360deg) scale(1); }
        }
        @keyframes secretPop {
            0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); }
            50% { transform: translate(-50%, -50%) scale(1.2) rotate(10deg); }
            100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
        }
    `;
    document.head.appendChild(logoStyle);
}

// Initialize all modern effects
window.addEventListener('load', () => {
    setTimeout(() => {
        enhanceLoadingScreen();
        initMatrixRain();
        initCodeTyping();
        initMagneticCursor();
        initGlitchEffect();
        initHolographicCards();
        initCircuitBoard();
        initInteractiveParticles();
        initPageTransitions();
        initTerminalCommands();

        // New ultra-interactive effects
        initClickExplosion();
        initMouseTrail();
        initRippleEffect();
        initKonamiCode();
        initInteractiveTerminal();
        initAchievementBadges();
        initParallaxLayers();
        initInteractiveStats();
        initShakeEffects();
        initEasterEggs();

        console.log('%c🚀 All interactive effects loaded!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
        console.log('%c💡 Pro tip: Try Ctrl+` to open terminal, Konami code for surprise, or double-click the logo!', 'color: #8b5cf6; font-size: 12px;');
    }, 1000);
});

