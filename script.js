// Force scroll to top on initial load (before DOM is ready)
if (window.history.scrollRestoration) {
    window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

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

// Enhanced Intersection Observer for animations - optimized for smoothness
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

    // Progressive disclosure for tech stack
    const techStack = document.getElementById('tech-stack');
    if (techStack) {
        observer.observe(techStack);
    }

    // Progressive disclosure for code stats
    const codeStats = document.getElementById('code-stats');
    if (codeStats) {
        // Show stats after a delay when hero is visible
        setTimeout(() => {
            codeStats.style.opacity = '1';
            codeStats.style.transform = 'translateY(0)';
        }, 2000);
    }

    // Contact section elements with animations
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        // Animate section header
        const contactHeader = contactSection.querySelector('.section-header');
        if (contactHeader) {
            contactHeader.classList.add('fade-in');
            observer.observe(contactHeader);
        }

        // Animate contact info items
        document.querySelectorAll('.contact-item').forEach((el, index) => {
            el.classList.add('slide-in-left');
            el.style.transitionDelay = `${index * 0.15}s`;
            observer.observe(el);
        });

        // Animate form intro
        const formIntro = contactSection.querySelector('.form-intro');
        if (formIntro) {
            formIntro.classList.add('fade-in');
            formIntro.style.transitionDelay = '0.3s';
            observer.observe(formIntro);
        }

        // Animate contact form
        const contactForm = contactSection.querySelector('.contact-form');
        if (contactForm) {
            contactForm.classList.add('fade-in');
            contactForm.style.transitionDelay = '0.4s';
            observer.observe(contactForm);
        }
    }
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

// mark loading state early
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loading');
});

// Scroll to top on page refresh/reload
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Helper to safely remove loader overlay
function safeRemoveLoader(delay = 0) {
    const loader = document.getElementById('loader');
    if (!loader) return;

    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
            document.body.style.opacity = '1';
            document.body.classList.remove('loading');
            document.body.classList.add('ready');
            document.body.style.overflow = 'auto';
        }, 400);
    }, delay);
}

// Force scroll to top on page load/refresh
window.addEventListener('load', () => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also use history API to ensure we're at top
    if (window.history.scrollRestoration) {
        window.history.scrollRestoration = 'manual';
    }
    
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    const isRefresh = navigationEntry ? navigationEntry.type === 'reload' : performance.navigation?.type === 1;

    if (isRefresh) {
        enhanceLoadingScreen();
        safeRemoveLoader(1200);
    } else {
        safeRemoveLoader(0);
    }

    // Fallback guard in case anything hangs
    setTimeout(() => safeRemoveLoader(0), 3500);
});

// Ensure scroll to top on page show (back/forward navigation)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // Page was loaded from cache, scroll to top
        window.scrollTo(0, 0);
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

// Removed button ripple to keep click visuals minimal (confetti remains)

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

// Smooth scroll with easing - optimized for performance
function smoothScrollTo(target) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = Math.min(800, Math.abs(distance) * 0.5); // Adaptive duration
    let startTime = null;
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const run = easeInOutCubic(progress);
        window.scrollTo(0, startPosition + distance * run);
        
        if (progress < 1) {
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
const validationInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

validationInputs.forEach(input => {
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
// Get your Public Key from: https://dashboard.emailjs.com/admin/integration
// Get your Service ID from: https://dashboard.emailjs.com/admin/service
// Get your Template IDs from: https://dashboard.emailjs.com/admin/template
const EMAILJS_PUBLIC_KEY = 'Z_iIIF96wVdVQLv_E'; // Public key (safe to expose in client-side code)
const EMAILJS_SERVICE_ID = 'service_o6blrnk'; // Replace with your service ID
const EMAILJS_CONTACT_TEMPLATE = 'template_zz1sxwj'; // Replace with your contact form template ID
const EMAILJS_NEWSLETTER_TEMPLATE = 'template_4v48c53'; // Replace with your newsletter template ID

// Get form elements
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm ? contactForm.querySelectorAll('input, textarea') : [];

// Initialize EmailJS if available
if (typeof emailjs !== 'undefined') {
    try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('EmailJS initialized successfully ✓');
        console.log('EmailJS Config:', {
            publicKey: EMAILJS_PUBLIC_KEY,
            serviceId: EMAILJS_SERVICE_ID,
            contactTemplate: EMAILJS_CONTACT_TEMPLATE,
            newsletterTemplate: EMAILJS_NEWSLETTER_TEMPLATE
        });
    } catch (error) {
        console.error('EmailJS initialization error:', error);
    }
} else {
    console.warn('EmailJS library not loaded. Forms will use mailto fallback.');
    console.warn('Make sure EmailJS SDK is loaded: https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js');
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
            if (typeof emailjs !== 'undefined' && 
                EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && 
                EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' && 
                EMAILJS_CONTACT_TEMPLATE !== 'YOUR_CONTACT_TEMPLATE_ID') {
                
                console.log('Sending email via EmailJS...', {
                    serviceId: EMAILJS_SERVICE_ID,
                    templateId: EMAILJS_CONTACT_TEMPLATE,
                    data: {
                        name: formData.name, // Primary - matches template {{name}}
                        email: formData.email, // Primary - matches template {{email}}
                        from_name: formData.name,
                        from_email: formData.email,
                        subject: formData.subject,
                        message: formData.message,
                        to_email: 'inquiries@kcoh.ca'
                    }
                });
                
                // Send email via EmailJS
                // Note: Template uses {{name}} and {{email}}, so these are primary
                const response = await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_CONTACT_TEMPLATE,
                    {
                        name: formData.name, // Primary - matches template {{name}}
                        email: formData.email, // Primary - matches template {{email}}
                        from_name: formData.name, // Also include for compatibility
                        from_email: formData.email, // Also include for compatibility
                        subject: formData.subject,
                        message: formData.message,
                        to_email: 'inquiries@kcoh.ca'
                    }
                );
                
                console.log('EmailJS response:', response);
                console.log('Email sent successfully! Status:', response.status, 'Text:', response.text);
                
                // Show success message
                showFormMessage(contactForm, 'Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.style.background = originalBackground;
                submitButton.disabled = false;
            } else {
                // Fallback: Send email via mailto link
                const mailtoLink = `mailto:inquiries@kcoh.ca?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
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
            // Always log errors for debugging
            console.error('Form submission error:', error);
            console.error('Error details:', {
                message: error.message,
                text: error.text,
                status: error.status,
                serviceId: EMAILJS_SERVICE_ID,
                templateId: EMAILJS_CONTACT_TEMPLATE,
                publicKey: EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing',
                emailjsLoaded: typeof emailjs !== 'undefined'
            });
            
            let errorMessage = 'Failed to send message. ';
            if (error.text) {
                errorMessage += `Error: ${error.text}. `;
            } else if (error.message) {
                errorMessage += `Error: ${error.message}. `;
            }
            errorMessage += 'Please try again or email us directly at inquiries@kcoh.ca';
            
            showFormMessage(contactForm, errorMessage, 'error');
            
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
            if (typeof emailjs !== 'undefined' && 
                EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && 
                EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' && 
                EMAILJS_NEWSLETTER_TEMPLATE !== 'YOUR_NEWSLETTER_TEMPLATE_ID') {
                // Send email via EmailJS
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_NEWSLETTER_TEMPLATE,
                    {
                        email: email,
                        to_email: 'inquiries@kcoh.ca'
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
            // Log error in development only
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.error('Newsletter subscription error:', error);
            }
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
    
    // Create message element with icon
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    
    // Add icon based on type
    const icon = type === 'success' 
        ? '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill="currentColor"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" fill="currentColor"/></svg>';
    
    messageDiv.innerHTML = `
        <div class="form-message-content">
            <span class="form-message-icon">${icon}</span>
            <span class="form-message-text">${message}</span>
        </div>
    `;
    
    // For newsletter form, insert after the input group
    const inputGroup = form.querySelector('.newsletter-input-group');
    if (inputGroup && form.id === 'newsletterForm') {
        form.insertBefore(messageDiv, inputGroup.nextSibling);
    } else {
        // For other forms, insert before submit button
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.parentNode.insertBefore(messageDiv, submitButton);
        } else {
            form.appendChild(messageDiv);
        }
    }
    
    // Auto-remove success messages after 5 seconds with fade out
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
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

// ============================================
// MODERN DEVELOPER EFFECTS & ANIMATIONS
// ============================================

const isMinimalMode = () => document.body.classList.contains('minimal-mode');

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
        if (isMinimalMode()) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }
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
        'let developer = Developer()',
        'developer.skills = ["Swift", "iOS", "React"]',
        'developer.appStoreApps = 10',
        'developer.build(yourIdea)',
        '// 🍎 Building amazing apps...'
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = '';
    let typingTimeout = null;
    let hideTimeout = null;
    let isTyping = false;
    let isVisible = false;

    const codeDisplay = document.createElement('div');
    codeDisplay.className = 'code-typing';
    codeDisplay.style.cssText = `
        position: fixed;
        bottom: 40px;
        left: 50%;
        transform: translate(-50%, 10px);
        font-family: 'Courier New', monospace;
        font-size: 0.85rem;
        color: #c7d2fe;
        background: rgba(15, 23, 42, 0.9);
        padding: 1.35rem;
        padding-top: 2rem;
        border-radius: 0.75rem;
        border: 1px solid rgba(99, 102, 241, 0.35);
        box-shadow: 0 14px 36px rgba(15, 23, 42, 0.35), 0 0 18px rgba(99, 102, 241, 0.25);
        max-width: 360px;
        width: calc(100% - 48px);
        z-index: 10000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s ease, transform 0.4s ease;
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
    closeBtn.addEventListener('click', () => hideCode());

    codeDisplay.appendChild(closeBtn);
    document.body.appendChild(codeDisplay);

    // Toggle button in hero
    const codeToggle = document.querySelector('.code-toggle');
    if (codeToggle) {
        codeToggle.setAttribute('aria-label', 'Show code sample');
        codeToggle.addEventListener('click', () => {
            if (codeDisplay.classList.contains('visible')) {
                hideCode();
            } else {
                showCode(true);
            }
        });
    }

    function typeCode() {
        if (!isVisible || document.body.classList.contains('minimal-mode')) {
            hideCode();
            return;
        }
        
        if (lineIndex < codeLines.length) {
            if (charIndex < codeLines[lineIndex].length) {
                currentLine += codeLines[lineIndex][charIndex];
                codeDisplay.innerHTML = codeLines.slice(0, lineIndex).join('<br>') +
                    (lineIndex > 0 ? '<br>' : '') +
                    currentLine + '<span class="cursor">|</span>';
                charIndex++;
                typingTimeout = setTimeout(typeCode, 50);
            } else {
                lineIndex++;
                charIndex = 0;
                currentLine = '';
                typingTimeout = setTimeout(typeCode, 500);
            }
        } else {
            hideTimeout = setTimeout(() => hideCode(), 2500);
        }
    }

    const showCode = (fromButton = false) => {
        // Clear any existing timeouts
        if (typingTimeout) {
            clearTimeout(typingTimeout);
            typingTimeout = null;
        }
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
        
        // Reset state
        isVisible = true;
        isTyping = true;
        lineIndex = 0;
        charIndex = 0;
        currentLine = '';
        
        codeDisplay.classList.add('visible');
        codeDisplay.style.opacity = '1';
        codeDisplay.style.pointerEvents = 'auto';
        codeDisplay.style.transform = 'translate(-50%, 0)';
        
        if (codeToggle) {
            codeToggle.textContent = 'Hide code';
            codeToggle.setAttribute('aria-pressed', 'true');
        }

        if (fromButton) {
            codeDisplay.innerHTML = '';
            typingTimeout = setTimeout(typeCode, 250);
        }
    };

    const hideCode = () => {
        // Clear any running timeouts
        if (typingTimeout) {
            clearTimeout(typingTimeout);
            typingTimeout = null;
        }
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
        
        isVisible = false;
        isTyping = false;
        
        codeDisplay.classList.remove('visible');
        codeDisplay.style.opacity = '0';
        codeDisplay.style.pointerEvents = 'none';
        codeDisplay.style.transform = 'translate(-50%, 10px)';
        
        if (codeToggle) {
            codeToggle.textContent = 'Show code';
            codeToggle.setAttribute('aria-pressed', 'false');
        }

        setTimeout(() => {
            if (!isVisible) {
                lineIndex = 0;
                charIndex = 0;
                currentLine = '';
                codeDisplay.innerHTML = '';
            }
        }, 400);
    };

    // Keep hidden by default; user can open via hero button

    return {
        hide: hideCode,
        show: showCode
    };
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
        if (isMinimalMode()) return;
        for (let i = 0; i < 30; i++) {
            particles.push(new ExplosionParticle(e.clientX, e.clientY));
        }
    });

    function animateExplosions() {
        if (isMinimalMode()) {
            particles = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            requestAnimationFrame(animateExplosions);
            return;
        }
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
        if (isMinimalMode()) return;
        const dist = Math.sqrt((e.clientX - lastX) ** 2 + (e.clientY - lastY) ** 2);
        if (dist > 5) {
            trail.push(new TrailParticle(e.clientX, e.clientY));
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    function animateTrail() {
        if (isMinimalMode()) {
            trail.length = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            requestAnimationFrame(animateTrail);
            return;
        }
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
    // Ripple effect removed; confetti and other click effects remain
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
        help: 'Available commands: help, about, skills, apps, portfolio, contact, clear, matrix, party, swift',
        about: 'KCOH Software Inc. - Professional software development with 10+ iOS apps on App Store',
        skills: 'Swift, SwiftUI, React, Node.js, Python, AWS, Docker, and more!',
        apps: '10+ published iOS apps on the App Store built with Swift & SwiftUI 🍎',
        portfolio: 'Visit https://kevincohen.ca to see my complete portfolio',
        contact: 'Email: inquiries@kcoh.ca | Phone: 514-898-8716',
        clear: '',
        matrix: 'Entering the Matrix... 🟢',
        party: '🎉 Party mode activated! 🎊',
        swift: 'let expertise = "iOS Development" 🚀',
        whoami: 'You are exploring the portfolio of an iOS developer with 10+ App Store apps',
        ls: 'services/  portfolio/  about/  contact/  apps/',
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

// Floating Achievement Badges (FIXED - higher thresholds)
function initAchievementBadges() {
    const achievements = [
        { icon: '🎯', text: 'Explorer', trigger: 'scroll', threshold: 3000 },
        { icon: '🖱️', text: 'Clicker', trigger: 'click', threshold: 50 },
        { icon: '⌨️', text: 'Typist', trigger: 'keypress', threshold: 200 },
        { icon: '🕐', text: 'Time Traveler', trigger: 'time', threshold: 120000 }
    ];

    let stats = { scroll: 0, click: 0, keypress: 0, time: 0 };
    const unlockedAchievements = new Set();

    window.addEventListener('scroll', () => stats.scroll = window.pageYOffset);
    document.addEventListener('click', () => stats.click++);
    document.addEventListener('keypress', () => stats.keypress++);
    setInterval(() => stats.time += 1000, 1000);

    function checkAchievements() {
        if (isMinimalMode()) return;

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
        badge.className = 'achievement-badge-modern';
        badge.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            width: 320px;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(99, 102, 241, 0.2);
            z-index: 99999;
            animation: achievementSlideIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            overflow: hidden;
        `;

        badge.innerHTML = `
            <div style="
                position: relative;
                padding: 1.25rem;
                display: flex;
                align-items: center;
                gap: 1rem;
            ">
                <div style="
                    font-size: 2.5rem;
                    animation: achievementIconBounce 0.8s ease 0.3s;
                ">${achievement.icon}</div>
                <div style="flex: 1;">
                    <div style="
                        font-size: 0.75rem;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        background: linear-gradient(135deg, #6366f1, #a78bfa);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        margin-bottom: 0.25rem;
                    ">Achievement Unlocked</div>
                    <div style="
                        font-size: 1.1rem;
                        font-weight: 700;
                        color: #e2e8f0;
                        margin-bottom: 0.25rem;
                    ">${achievement.text}</div>
                    <div style="
                        font-size: 0.8rem;
                        color: #94a3b8;
                        opacity: 0.8;
                    ">Keep exploring!</div>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: rgba(99, 102, 241, 0.1);
                    border: 1px solid rgba(99, 102, 241, 0.2);
                    color: #94a3b8;
                    width: 24px;
                    height: 24px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                " onmouseover="this.style.background='rgba(99, 102, 241, 0.2)'; this.style.color='#e2e8f0';" onmouseout="this.style.background='rgba(99, 102, 241, 0.1)'; this.style.color='#94a3b8';">✕</button>
            </div>
            <div class="achievement-progress" style="
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                width: 100%;
                background: linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa);
                transform-origin: left;
                animation: achievementProgress 4s linear;
            "></div>
        `;

        // Add keyframes if not already added
        if (!document.getElementById('achievement-animations')) {
            const style = document.createElement('style');
            style.id = 'achievement-animations';
            style.textContent = `
                @keyframes achievementSlideIn {
                    from {
                        transform: translateX(400px) scale(0.8);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0) scale(1);
                        opacity: 1;
                    }
                }
                @keyframes achievementIconBounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2) rotate(10deg); }
                }
                @keyframes achievementProgress {
                    from { transform: scaleX(1); }
                    to { transform: scaleX(0); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(badge);

        // Auto-remove after 4 seconds with fade out
        setTimeout(() => {
            badge.style.animation = 'achievementSlideIn 0.4s ease reverse';
            badge.style.opacity = '0';
            setTimeout(() => badge.remove(), 400);
        }, 4000);
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

// Developer Command Palette (press ? or Ctrl+K)
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
    let userPinned = false;

    const openPalette = () => palette.classList.add('open');
    const closePalette = () => palette.classList.remove('open');
    const togglePalette = () => palette.classList.toggle('open');

    const pinPalette = () => {
        userPinned = true;
        openPalette();
    };

    closeBtn.addEventListener('click', closePalette);
    palette.addEventListener('click', pinPalette);

    const paletteButton = document.querySelector('.palette-toggle');
    if (paletteButton) {
        paletteButton.addEventListener('click', () => {
            pinPalette();
        });
    }

    document.addEventListener('keydown', (e) => {
        const key = e.key ? e.key.toLowerCase() : '';
        const isQuestionMark = e.key === '?' || (e.key === '/' && e.shiftKey);
        const isCtrlK = e.ctrlKey && key === 'k';

        if (isQuestionMark || isCtrlK) {
            e.preventDefault();
            togglePalette();
        }

        if (key === 'escape') {
            closePalette();
        }
    });

    document.body.appendChild(palette);

    // Auto-show palette briefly on first load (desktop/minimal disabled)
    if (!isMinimalMode()) {
        openPalette();
        setTimeout(() => {
            if (!userPinned && !isMinimalMode()) {
                closePalette();
            }
        }, 3000);
    }
}

// Minimal mode toggle (hides flashy elements)
function initMinimalMode(codeTyping) {
    const toggleBtn = document.querySelector('.minimal-toggle');
    if (!toggleBtn) return;

    const applyState = (isOn) => {
        document.body.classList.toggle('minimal-mode', isOn);
        toggleBtn.setAttribute('aria-pressed', String(isOn));
        toggleBtn.textContent = isOn ? 'Minimal mode: On' : 'Minimal mode';
        if (isOn && codeTyping?.hide) codeTyping.hide();
        const palette = document.querySelector('.dev-palette');
        if (isOn && palette) palette.classList.remove('open');
    };

    toggleBtn.addEventListener('click', () => {
        const isOn = !document.body.classList.contains('minimal-mode');
        applyState(isOn);
    });
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

// ============================================
// NEW INTERACTIVE CODING EFFECTS
// ============================================

// Code Editor Tab Switching
function initCodeEditor() {
    const tabs = document.querySelectorAll('.editor-tab');
    const codeBlocks = document.querySelectorAll('.code-block');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetLang = tab.getAttribute('data-lang');

            // Remove active class from all tabs and code blocks
            tabs.forEach(t => t.classList.remove('active'));
            codeBlocks.forEach(block => block.classList.remove('active'));

            // Add active class to clicked tab and corresponding code block
            tab.classList.add('active');
            const targetBlock = document.querySelector(`.code-block[data-lang="${targetLang}"]`);
            if (targetBlock) {
                targetBlock.classList.add('active');
            }
        });
    });
}

// Pixel Font Generator - 7x5 font for A-Z
const pixelFont = {
    A: [[0,1,1,0],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1]],
    B: [[1,1,1,0],[1,0,0,1],[1,0,0,1],[1,1,1,0],[1,0,0,1],[1,0,0,1],[1,1,1,0]],
    C: [[0,1,1,1],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[0,1,1,1]],
    D: [[1,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,1,1,0]],
    E: [[1,1,1,1],[1,0,0,0],[1,0,0,0],[1,1,1,0],[1,0,0,0],[1,0,0,0],[1,1,1,1]],
    F: [[1,1,1,1],[1,0,0,0],[1,0,0,0],[1,1,1,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],
    G: [[0,1,1,1],[1,0,0,0],[1,0,0,0],[1,0,1,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]],
    H: [[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,0,0,1],[1,0,0,1]],
    I: [[1,1,1],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],
    J: [[0,0,1,1],[0,0,0,1],[0,0,0,1],[0,0,0,1],[0,0,0,1],[1,0,0,1],[0,1,1,0]],
    K: [[1,0,0,1],[1,0,1,0],[1,1,0,0],[1,1,0,0],[1,0,1,0],[1,0,0,1],[1,0,0,1]],
    L: [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,1,1,1]],
    M: [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
    N: [[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1],[1,0,0,0,1]],
    O: [[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]],
    P: [[1,1,1,0],[1,0,0,1],[1,0,0,1],[1,1,1,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],
    Q: [[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,1,1],[1,0,0,1],[0,1,1,1]],
    R: [[1,1,1,0],[1,0,0,1],[1,0,0,1],[1,1,1,0],[1,0,1,0],[1,0,0,1],[1,0,0,1]],
    S: [[0,1,1,1],[1,0,0,0],[1,0,0,0],[0,1,1,0],[0,0,0,1],[0,0,0,1],[1,1,1,0]],
    T: [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
    U: [[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,1,1,0]],
    V: [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0]],
    W: [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,1,0,1],[1,1,0,1,1],[1,0,0,0,1]],
    X: [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1],[1,0,0,0,1]],
    Y: [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
    Z: [[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,0,0,0,0],[1,1,1,1,1]]
};

// Get custom name from localStorage or use default
function getCustomName() {
    const saved = localStorage.getItem('contributionGraphName');
    return saved || 'KCOH';
}

// Save custom name to localStorage
function saveCustomName(name) {
    localStorage.setItem('contributionGraphName', name.toUpperCase());
}

// Generate pattern for any name
function generateNamePattern(name) {
    const pattern = {};
    const letters = name.toUpperCase().split('').filter(char => /[A-Z]/.test(char));
    
    letters.forEach(letter => {
        if (pixelFont[letter]) {
            pattern[letter] = pixelFont[letter];
        }
    });
    
    return { pattern, letters };
}

// GitHub Contribution Graph Generator
function initGitHubGraph() {
    const grid = document.getElementById('contribution-grid');
    if (!grid) return;

    const weeks = 52;
    const days = 7;

    // Get custom name
    const customName = getCustomName();
    const { pattern: namePattern, letters } = generateNamePattern(customName);
    
    if (letters.length === 0) {
        // Fallback to KCOH if no valid letters
        const { pattern: fallbackPattern, letters: fallbackLetters } = generateNamePattern('KCOH');
        return generateGraph(grid, weeks, days, fallbackPattern, fallbackLetters);
    }

    generateGraph(grid, weeks, days, namePattern, letters);
}

// Generate the actual graph
function generateGraph(grid, weeks, days, namePattern, letters) {
    // Clear existing grid
    grid.innerHTML = '';

    const letterSpacing = 1; // gap between letters
    let totalWidth = 0;

    // Calculate total width
    letters.forEach(letter => {
        if (namePattern[letter]) {
            totalWidth += namePattern[letter][0].length + letterSpacing;
        }
    });
    totalWidth -= letterSpacing; // remove last spacing

    // Center the text
    const startWeek = Math.floor((weeks - totalWidth) / 2);

    // Create pattern map
    const patternMap = {};
    let currentWeek = startWeek;

    letters.forEach(letter => {
        const letterPattern = namePattern[letter];
        if (!letterPattern) return;
        
        const letterWidth = letterPattern[0].length;

        // Map pattern to grid coordinates
        for (let dayIdx = 0; dayIdx < days; dayIdx++) {
            for (let col = 0; col < letterWidth; col++) {
                const week = currentWeek + col;
                const key = `${week}-${dayIdx}`;
                patternMap[key] = letterPattern[dayIdx][col];
            }
        }
        currentWeek += letterWidth + letterSpacing;
    });

    // Generate the grid
    for (let week = 0; week < weeks; week++) {
        for (let day = 0; day < days; day++) {
            const box = document.createElement('div');
            box.className = 'contribution-box';
            box.style.gridColumn = week + 1;
            box.style.gridRow = day + 1;

            const key = `${week}-${day}`;
            let level;

            if (patternMap[key] === 1) {
                box.classList.add('level-dark');
                // Add staggered animation delay based on position for subtle effect
                const delay = (week * 7 + day) % 8; // Varies delay from 0-7
                box.style.setProperty('--delay', delay);
                const customName = getCustomName();
                box.title = customName;
            } else {
                const rand = Math.random();
                if (rand < 0.35) {
                    level = 1;
                } else if (rand < 0.60) {
                    level = 2;
                } else if (rand < 0.80) {
                    level = 3;
                } else {
                    level = 4;
                }
                box.classList.add(`level-${level}`);
                const contributions = level * Math.floor(Math.random() * 5) + level;
                box.title = `${contributions} contributions`;
            }

            box.addEventListener('mouseenter', () => {
                box.style.transform = 'scale(1.3)';
                box.style.zIndex = '10';
            });

            box.addEventListener('mouseleave', () => {
                box.style.transform = 'scale(1)';
                box.style.zIndex = '1';
            });

            grid.appendChild(box);
        }
    }
}

// Progressive Disclosure - Reveal elements on scroll
function initProgressiveDisclosure() {
    const codeStats = document.getElementById('code-stats');
    const techStack = document.getElementById('tech-stack');
    
    if (!codeStats || !techStack) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    observer.observe(codeStats);
    observer.observe(techStack);
}

// Inline Name Editor - Live editing on chart
function initNameEditor() {
    const graphWrapper = document.querySelector('.graph-grid-wrapper');
    const graphGrid = document.getElementById('contribution-grid');
    const inlineEditor = document.getElementById('inline-name-input');
    const editorContainer = document.getElementById('inline-name-editor');

    if (!graphWrapper || !graphGrid || !inlineEditor) return;

    let isEditing = false;
    let updateTimeout = null;

    // Set initial value
    inlineEditor.value = getCustomName();

    // Click on chart to edit
    graphWrapper.addEventListener('click', (e) => {
        // Don't trigger if clicking on the editor itself
        if (e.target.closest('.inline-name-editor')) return;
        
        if (!isEditing) {
            enterEditMode();
        }
    });

    // Live update as user types (debounced for performance)
    inlineEditor.addEventListener('input', (e) => {
        // Filter to A-Z only and uppercase
        let value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
        e.target.value = value;
        
        // Clear previous timeout
        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }
        
        // Debounce updates for smooth performance
        updateTimeout = setTimeout(() => {
            if (value.length > 0) {
                saveCustomName(value);
                updateGraphLive(value);
            }
        }, 150); // Fast refresh with minimal lag
    });

    // Handle Enter key to finish editing
    inlineEditor.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            exitEditMode();
        }
    });

    // Click outside to exit edit mode
    document.addEventListener('click', (e) => {
        if (isEditing && !e.target.closest('.inline-name-editor') && !e.target.closest('.graph-grid')) {
            exitEditMode();
        }
    });

    function enterEditMode() {
        isEditing = true;
        graphWrapper.classList.add('editing');
        editorContainer.style.display = 'flex';
        inlineEditor.focus();
        inlineEditor.select();
    }

    function exitEditMode() {
        isEditing = false;
        graphWrapper.classList.remove('editing');
        editorContainer.style.display = 'none';
        // Save final value
        const finalValue = inlineEditor.value.toUpperCase().trim() || 'KCOH';
        saveCustomName(finalValue);
        updateGraphLive(finalValue);
    }

    // Optimized live graph update (only updates pattern, not entire grid)
    function updateGraphLive(name) {
        const { pattern, letters } = generateNamePattern(name);
        if (letters.length === 0) return;

        // Get all boxes
        const boxes = graphGrid.querySelectorAll('.contribution-box');
        const weeks = 52;
        const days = 7;
        const letterSpacing = 1;

        // Calculate pattern map
        let totalWidth = 0;
        letters.forEach(letter => {
            if (pattern[letter]) {
                totalWidth += pattern[letter][0].length + letterSpacing;
            }
        });
        totalWidth -= letterSpacing;
        const startWeek = Math.floor((weeks - totalWidth) / 2);

        const patternMap = {};
        let currentWeek = startWeek;

        letters.forEach(letter => {
            const letterPattern = pattern[letter];
            if (!letterPattern) return;
            const letterWidth = letterPattern[0].length;

            for (let dayIdx = 0; dayIdx < days; dayIdx++) {
                for (let col = 0; col < letterWidth; col++) {
                    const week = currentWeek + col;
                    const key = `${week}-${dayIdx}`;
                    patternMap[key] = letterPattern[dayIdx][col];
                }
            }
            currentWeek += letterWidth + letterSpacing;
        });

        // Update boxes efficiently
        boxes.forEach((box, index) => {
            const week = Math.floor(index / days);
            const day = index % days;
            const key = `${week}-${day}`;

            // Remove all level classes
            box.classList.remove('level-0', 'level-1', 'level-2', 'level-3', 'level-4', 'level-dark');

            if (patternMap[key] === 1) {
                box.classList.add('level-dark');
                const delay = (week * 7 + day) % 8;
                box.style.setProperty('--delay', delay);
                box.title = name;
            } else {
                // Keep existing gradient levels for non-pattern squares
                const rand = Math.random();
                let level;
                if (rand < 0.35) {
                    level = 1;
                } else if (rand < 0.60) {
                    level = 2;
                } else if (rand < 0.80) {
                    level = 3;
                } else {
                    level = 4;
                }
                box.classList.add(`level-${level}`);
                const contributions = level * Math.floor(Math.random() * 5) + level;
                box.title = `${contributions} contributions`;
            }
        });
    }
}

// Enhanced Matrix Rain Effect (Movie-Style)
function initEnhancedMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'enhanced-matrix';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.08;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    function draw() {
        if (isMinimalMode()) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            requestAnimationFrame(draw);
            return;
        }

        ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            // Color gradient effect
            const gradient = ctx.createLinearGradient(0, drops[i] * fontSize, 0, (drops[i] + 1) * fontSize);
            gradient.addColorStop(0, '#6366f1');
            gradient.addColorStop(1, '#a78bfa');
            ctx.fillStyle = gradient;

            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
                drops[i] = 0;
            }

            drops[i]++;
        }

        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typing Effect for Terminal Prompt
function initTerminalTypingEffect() {
    const terminalLine = document.querySelector('.terminal-line');
    const terminalResponse = document.querySelector('.terminal-response');
    
    if (!terminalLine) return;
    
    const command = '$ whoami';
    const response = 'Kevin Cohen';
    
    // Store original text
    terminalLine.dataset.originalText = command;
    if (terminalResponse) {
        terminalResponse.dataset.originalText = response;
    }
    
    // Clear initial text
    terminalLine.textContent = '';
    if (terminalResponse) {
        terminalResponse.style.opacity = '0';
        terminalResponse.textContent = '';
    }
    
    let charIndex = 0;
    
    function typeCommand() {
        if (charIndex < command.length) {
            terminalLine.textContent = command.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeCommand, 80); // Typing speed
        } else {
            // Command typed, wait a bit then show response
            setTimeout(() => {
                if (terminalResponse) {
                    typeResponse();
                }
            }, 500);
        }
    }
    
    let responseCharIndex = 0;
    function typeResponse() {
        if (terminalResponse && responseCharIndex < response.length) {
            terminalResponse.style.opacity = '1';
            terminalResponse.textContent = response.substring(0, responseCharIndex + 1);
            responseCharIndex++;
            setTimeout(typeResponse, 100); // Slightly slower for response
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeCommand, 500);
}

// Typing Effect for Hero Title (FIXED - store original text properly)
function initHeroTypingEffect() {
    const textElement = document.querySelector('.typing-animation');
    if (!textElement) return;

    const texts = [
        'Building the Future',
        'Crafting Solutions',
        'Shipping Quality Code',
        'Creating Experiences'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Store original text as data attribute to prevent glitch interference
    textElement.dataset.originalText = textElement.textContent;
    textElement.dataset.isTyping = 'true';

    function type() {
        if (isMinimalMode()) return;

        const currentText = texts[textIndex];

        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect after a delay
    setTimeout(type, 2000);
}

// Hacker-Style Terminal Animation
function initHackerTerminal() {
    const terminalOutput = document.querySelector('.terminal-output');
    if (!terminalOutput) return;

    // Add typing animation to terminal
    const lines = terminalOutput.querySelectorAll('p:not(.terminal-command-input)');

    lines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.transition = 'opacity 0.3s ease';
            line.style.opacity = '1';

            // Play typing sound effect (visual only)
            line.style.animation = 'terminalGlow 0.3s ease';
        }, index * 150);
    });

    // Add glow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes terminalGlow {
            0%, 100% { text-shadow: none; }
            50% { text-shadow: 0 0 10px rgba(99, 102, 241, 0.5); }
        }
    `;
    document.head.appendChild(style);
}

// Cyber Scan Effect
function initCyberScan() {
    const scanLine = document.createElement('div');
    scanLine.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #6366f1, transparent);
        box-shadow: 0 0 20px #6366f1;
        pointer-events: none;
        z-index: 9999;
        animation: scanDown 8s linear infinite;
        opacity: 0.3;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes scanDown {
            0% { top: 0; opacity: 0.3; }
            50% { opacity: 0.6; }
            100% { top: 100%; opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(scanLine);
}

// Data Stream Effect
function initDataStream() {
    const container = document.createElement('div');
    container.className = 'data-stream-container';
    container.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: 200px;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
        opacity: 0.1;
    `;
    document.body.appendChild(container);

    function createDataBit() {
        const bit = document.createElement('div');
        bit.textContent = Math.random() > 0.5 ? '1' : '0';
        bit.style.cssText = `
            position: absolute;
            right: ${Math.random() * 200}px;
            top: -20px;
            color: #6366f1;
            font-family: 'Courier New', monospace;
            font-size: ${Math.random() * 20 + 10}px;
            animation: dataFall ${Math.random() * 3 + 2}s linear;
        `;

        container.appendChild(bit);

        setTimeout(() => bit.remove(), 5000);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes dataFall {
            to {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    if (!isMinimalMode()) {
        setInterval(createDataBit, 200);
    }
}

// Holographic Grid Effect
function initHolographicGrid() {
    const canvas = document.createElement('canvas');
    canvas.id = 'holographic-grid';
    canvas.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 40%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.05;
    `;
    document.querySelector('.hero').appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.4;

    let angle = 0;

    function drawGrid() {
        if (isMinimalMode()) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 1;

        const gridSize = 50;
        const perspective = 0.5;

        // Draw perspective grid
        for (let i = 0; i < canvas.height; i += gridSize) {
            const y = canvas.height - i;
            const scale = 1 - (i / canvas.height) * perspective;

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();

            // Vertical lines
            for (let x = 0; x < canvas.width; x += gridSize * scale) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x * scale + canvas.width / 2 * (1 - scale), canvas.height);
                ctx.stroke();
            }
        }

        angle += 0.001;
    }

    function animate() {
        drawGrid();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.4;
    });
}

// Glitch Text Effect on Hover (FIXED - excludes terminal/code titles)
function initGlitchText() {
    const headers = document.querySelectorAll('.section-title');

    headers.forEach(header => {
        let glitchInterval;

        // Store original text immediately
        header.dataset.originalText = header.textContent;

        // Skip glitch effect for terminal/code style titles and testimonials
        const text = header.textContent.trim();
        if (text.startsWith('$') || text.includes('~/') || text.includes('ls ') || text.includes('Code Showcase') || text.includes('Client Testimonials') || text.includes('Testimonials')) {
            return;
        }

        header.addEventListener('mouseenter', () => {
            const originalText = header.dataset.originalText;
            const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

            glitchInterval = setInterval(() => {
                header.textContent = originalText
                    .split('')
                    .map(char => {
                        if (Math.random() < 0.1) {
                            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                        }
                        return char;
                    })
                    .join('');
            }, 50);
        });

        header.addEventListener('mouseleave', () => {
            clearInterval(glitchInterval);
            header.textContent = header.dataset.originalText;
        });
    });
}

// Binary Rain Effect
function initBinaryRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'binary-rain';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.05;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const binary = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        if (isMinimalMode()) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            requestAnimationFrame(draw);
            return;
        }

        ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#6366f1';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = binary[Math.floor(Math.random() * binary.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }

        requestAnimationFrame(draw);
    }

    draw();
}

// Neon Pulse Effect
function initNeonPulse() {
    const badges = document.querySelectorAll('.dev-badge, .tech-icon');

    badges.forEach((badge, index) => {
        setInterval(() => {
            badge.style.boxShadow = `
                0 0 ${Math.random() * 30 + 10}px rgba(99, 102, 241, ${Math.random() * 0.5 + 0.3}),
                0 0 ${Math.random() * 50 + 20}px rgba(139, 92, 246, ${Math.random() * 0.3 + 0.2})
            `;
        }, 2000 + index * 500);
    });
}

// Initialize all modern effects
window.addEventListener('load', () => {
    setTimeout(() => {
        enhanceLoadingScreen();
        initMatrixRain();
        const codeTyping = initCodeTyping();
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
        initDeveloperPalette();
        initMinimalMode(codeTyping);
        initEasterEggs();

        // New movie-style coding effects
        initCodeEditor();
        initGitHubGraph();
        initNameEditor();
        
        // Only initialize heavy effects on desktop for better mobile performance
        if (window.innerWidth > 768) {
            initEnhancedMatrixRain();
        }
        
        initHeroTypingEffect();
        initHackerTerminal();
        initProgressiveDisclosure();
        
        // Mobile-specific optimizations
        if (window.innerWidth <= 768) {
            // Reduce animation complexity on mobile
            document.documentElement.style.setProperty('--animation-duration', '0.3s');
            
            // Disable heavy canvas effects
            const particlesCanvas = document.getElementById('particles');
            if (particlesCanvas) {
                particlesCanvas.style.display = 'none';
            }
            
            // Optimize intersection observer for mobile
            const mobileObserverOptions = {
                threshold: 0.05,
                rootMargin: '0px 0px -100px 0px'
            };
            
            // Update observer with mobile-optimized settings
            if (typeof observer !== 'undefined') {
                observer.disconnect();
                // Recreate with mobile settings if needed
            }
        }
        // initCyberScan(); // Removed - horizontal scan line effect
        initDataStream();
        initHolographicGrid();
        initGlitchText();
        initBinaryRain();
        initNeonPulse();

        // Development-only console messages
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('%c🚀 All interactive effects loaded!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
            console.log('%c💡 Pro tip: Try Ctrl+` to open terminal, Konami code for surprise, or double-click the logo!', 'color: #8b5cf6; font-size: 12px;');
            console.log('%c🎬 Movie-style coding effects activated!', 'color: #a78bfa; font-size: 14px; font-weight: bold;');
        }
    }, 1000);
});

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Debounce function for performance
function debounce(func, wait = 100) {
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

// Throttle function for scroll/resize events
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Detect if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Optimize animations based on device capability
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;

if (isMobile || isLowEndDevice || prefersReducedMotion) {
    document.body.classList.add('reduced-animations');
}

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Optimize resize handler
let resizeTimeout;
window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments
    const width = window.innerWidth;
    
    if (width < 768) {
        document.body.classList.add('mobile-view');
        document.body.classList.remove('tablet-view', 'desktop-view');
    } else if (width < 1024) {
        document.body.classList.add('tablet-view');
        document.body.classList.remove('mobile-view', 'desktop-view');
    } else {
        document.body.classList.add('desktop-view');
        document.body.classList.remove('mobile-view', 'tablet-view');
    }
}, 250), { passive: true });

// Preconnect to external resources
const preconnectLinks = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
];

preconnectLinks.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator && !window.location.hostname.includes('localhost')) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}

// Performance monitoring
if (window.performance && window.performance.mark) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            }
        }, 0);
    });
}

// Cleanup function for better memory management
window.addEventListener('beforeunload', () => {
    // Remove event listeners and observers
    if (window.particleCanvas) {
        window.particleCanvas.remove();
    }
    // Clear any intervals or timeouts
    if (window.animationFrameId) {
        cancelAnimationFrame(window.animationFrameId);
    }
});

console.log('Performance optimizations loaded ✓');

// ============================================
// AUTO-CENTER CONTRIBUTION GRAPH ON MOBILE
// ============================================

function centerContributionGraph() {
    // Only run on mobile devices
    if (window.innerWidth > 768) return;

    const graphContainer = document.querySelector('.graph-container');
    const graphGrid = document.querySelector('.graph-grid');
    
    if (!graphContainer || !graphGrid) return;

    // Wait for the graph to be fully rendered
    setTimeout(() => {
        // Calculate the center position
        const containerWidth = graphContainer.clientWidth;
        const gridWidth = graphGrid.scrollWidth;
        
        // Calculate center scroll position
        const centerPosition = (gridWidth - containerWidth) / 2;
        
        // Smoothly scroll to center
        graphContainer.scrollTo({
            left: centerPosition,
            behavior: 'smooth'
        });
        
        console.log('Contribution graph centered on mobile ✓');
    }, 100);
}

// Center on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', centerContributionGraph);
} else {
    centerContributionGraph();
}

// Re-center on orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(centerContributionGraph, 300);
});

// Re-center on resize (debounced)
let centerTimeout;
window.addEventListener('resize', () => {
    clearTimeout(centerTimeout);
    centerTimeout = setTimeout(() => {
        if (window.innerWidth <= 768) {
            centerContributionGraph();
        }
    }, 250);
});

// Also center when the graph becomes visible (IntersectionObserver)
if ('IntersectionObserver' in window) {
    const graphObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && window.innerWidth <= 768) {
                centerContributionGraph();
                graphObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const graphSection = document.querySelector('.github-activity');
    if (graphSection) {
        graphObserver.observe(graphSection);
    }
}

console.log('Auto-center contribution graph loaded ✓');
