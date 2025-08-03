// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const progressBars = document.querySelectorAll('.progress-bar');
const heroButtons = document.querySelectorAll('.hero-buttons a');

// Create scroll indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
document.body.appendChild(scrollIndicator);

// Mobile Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
            const icon = navToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Enhanced smooth scrolling function
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const headerOffset = 80; // Account for fixed navbar
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Update URL hash without triggering scroll
        if (history.pushState) {
            history.pushState(null, null, targetId);
        }
        return true;
    }
    return false;
}

// Handle all navigation links (including hero buttons)
function setupNavigationHandlers() {
    console.log('Setting up navigation handlers...');
    
    // Handle navigation menu links
    navLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`Nav link ${index}: ${href}`);
        
        if (href && href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Clicked nav link: ${href}`);
                
                // Special case for home link - scroll to top
                if (href === '#home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                } else {
                    const success = smoothScrollTo(href);
                    console.log(`Scroll to ${href}: ${success ? 'success' : 'failed'}`);
                }
            });
        }
    });
    
    // Handle hero buttons
    heroButtons.forEach((button, index) => {
        const href = button.getAttribute('href');
        console.log(`Hero button ${index}: ${href}`);
        
        if (href && href.startsWith('#')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Clicked hero button: ${href}`);
                
                if (href === '#home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                } else {
                    const success = smoothScrollTo(href);
                    console.log(`Scroll to ${href}: ${success ? 'success' : 'failed'}`);
                }
            });
        }
    });
}

// Scroll indicator
function updateScrollIndicator() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(scrollTop / docHeight, 1);
    
    scrollIndicator.style.transform = `scaleX(${scrollPercent})`;
}

// Active navigation link highlighting
function updateActiveNavLink() {
    let current = 'home'; // Default to home
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (sectionId && window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    // Special case for very top of page
    if (window.pageYOffset < 100) {
        current = 'home';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Fade in animation observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate progress bars when skills section comes into view
            if (entry.target.id === 'skills') {
                setTimeout(() => animateProgressBars(), 300);
            }
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.section, .timeline-item, .cert-card, .project-card, .interest-card, .skill-category, .contact-item');
    
    fadeElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${Math.min(index * 0.1, 1)}s`;
        observer.observe(el);
    });
}

// Animate progress bars
function animateProgressBars() {
    progressBars.forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress');
        const fill = bar.querySelector('.progress-fill');
        
        if (fill && !fill.style.width) {
            setTimeout(() => {
                fill.style.width = `${progress}%`;
            }, index * 200);
        }
    });
}

// Navbar background on scroll
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(139, 92, 246, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconClass = getNotificationIcon(type);
    const iconColor = type === 'error' ? '#ff5459' : 
                      type === 'success' ? '#8B5CF6' : 
                      '#626c7d';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${iconClass}" style="color: ${iconColor}; font-size: 18px;"></i>
            <span style="flex: 1; margin: 0 12px;">${message}</span>
            <button class="notification-close" style="background: none; border: none; color: #999; cursor: pointer; padding: 4px;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: #1a1a1a;
        border: 1px solid rgba(139, 92, 246, 0.2);
        border-radius: 8px;
        padding: 16px;
        max-width: 400px;
        z-index: 1002;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        transform: translateX(420px);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        color: #f5f5f5;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 12px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(420px)';
        setTimeout(() => notification.remove(), 400);
    });
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(420px)';
            setTimeout(() => notification.remove(), 400);
        }
    }, 6000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'error': return 'fa-exclamation-circle';
        case 'success': return 'fa-check-circle';
        default: return 'fa-info-circle';
    }
}

// Parallax effect for hero section (optimized)
function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        const parallaxValue = scrolled * 0.5;
        hero.style.transform = `translateY(${parallaxValue}px)`;
        
        const floatingElements = document.querySelectorAll('.element');
        floatingElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    }
}

// Typing effect for hero tagline
function typeWriter(element, text, speed = 50) {
    if (!element) return;
    
    element.textContent = '';
    element.style.opacity = '1';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor effect briefly
            element.textContent += '|';
            setTimeout(() => {
                element.textContent = text;
            }, 1000);
        }
    }
    
    type();
}

// Initialize typing effect
function initTypingEffect() {
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        tagline.style.opacity = '0';
        
        // Start typing effect after hero loads
        setTimeout(() => {
            typeWriter(tagline, originalText, 40);
        }, 1500);
    }
}

// Enhanced contact functionality
function initContactInteractions() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const link = item.querySelector('a');
        
        // Add click handler for entire contact item
        item.addEventListener('click', (e) => {
            if (link && e.target !== item.querySelector('.contact-item i')) {
                if (link.href.startsWith('mailto:') || link.href.startsWith('http')) {
                    window.open(link.href, link.target || '_self');
                }
            }
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', () => {
            item.classList.add('glow-effect');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('glow-effect');
        });
    });
    
    // Add special handling for email contact items
    const emailItem = document.querySelector('.contact-item a[href^="mailto:"]');
    if (emailItem) {
        emailItem.addEventListener('click', (e) => {
            // Show notification when email link is clicked
            setTimeout(() => {
                showNotification('Client email in apertura. Se non funziona, copia l\'indirizzo: maurizio.napoli@nekblu.com', 'success');
            }, 100);
        });
    }
}

// Performance optimized scroll handler
function createThrottledScrollHandler() {
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollIndicator();
                updateActiveNavLink();
                updateNavbarBackground();
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    return updateOnScroll;
}

// Handle hash navigation on page load
function handleInitialHash() {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            if (hash === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                smoothScrollTo(hash);
            }
        }, 500);
    }
}

// Add dynamic glow effects
function addDynamicEffects() {
    // Add pulse effect to main CTA button
    const primaryBtn = document.querySelector('.btn--primary');
    if (primaryBtn) {
        primaryBtn.classList.add('pulse-animation');
    }
    
    // Add hover effects to stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = '';
        });
    });
}

// Debug function to check sections
function debugSections() {
    console.log('Available sections:');
    sections.forEach(section => {
        const id = section.getAttribute('id');
        const rect = section.getBoundingClientRect();
        console.log(`- ${id}: top=${Math.round(rect.top + window.pageYOffset)}, height=${Math.round(rect.height)}`);
    });
}

// Initialize everything when DOM is ready
function initialize() {
    console.log('🚀 Initializing nekblu website...');
    
    setupNavigationHandlers();
    initFadeInAnimations();
    initTypingEffect();
    initContactInteractions();
    addDynamicEffects();
    handleInitialHash();
    
    // Debug information
    debugSections();
    
    // Initial state updates
    updateScrollIndicator();
    updateActiveNavLink();
    updateNavbarBackground();
    
    console.log('🚀 nekblu - Maurizio Napoli Cyber Defence Specialist');
    console.log('💜 New purple-blue design loaded successfully');
    console.log('🔐 Try the Konami code for a surprise!');
    console.log('✅ Navigation system initialized');
}

// Event listeners
const throttledScrollHandler = createThrottledScrollHandler();
window.addEventListener('scroll', throttledScrollHandler, { passive: true });

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

window.addEventListener('load', () => {
    console.log('📄 Page fully loaded');
});

window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('active');
        const icon = navToggle?.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Add CSS for active nav link and animations
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--cyber-primary) !important;
        text-shadow: 0 0 10px rgba(139, 92, 246, 0.3) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .scroll-indicator {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #8B5CF6, #3B82F6);
        transform-origin: left;
        transform: scaleX(0);
        z-index: 1001;
        transition: transform 0.1s ease-out;
    }
    
    .glow-effect {
        box-shadow: 0 0 20px rgba(139, 92, 246, 0.3) !important;
        border-color: var(--cyber-primary) !important;
    }
    
    .pulse-animation {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(139, 92, 246, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
        }
    }
    
    .contact-item {
        cursor: pointer;
    }
    
    .contact-item:hover {
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px !important;
            left: 10px !important;
            max-width: none !important;
        }
        
        .pulse-animation {
            animation: none; /* Disable pulse on mobile for performance */
        }
    }
`;
document.head.appendChild(style);

// Konami code easter egg with purple theme
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        createPurpleMatrixRain();
        showNotification('🎉 Codice Konami attivato! Benvenuto nella Purple Matrix! 💜', 'success');
        konamiCode = []; // Reset
    }
});

// Purple Matrix rain easter egg
function createPurpleMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.9);
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>nekblu';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Create gradient for purple effect
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#8B5CF6');
        gradient.addColorStop(0.5, '#A78BFA');
        gradient.addColorStop(1, '#3B82F6');
        
        ctx.fillStyle = gradient;
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // Add some special nekblu text occasionally  
            if (Math.random() > 0.98) {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillText('nekblu', i * fontSize, drops[i] * fontSize);
                ctx.fillStyle = gradient;
            } else {
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            }
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const interval = setInterval(draw, 33);
    
    // Remove after 10 seconds
    setTimeout(() => {
        clearInterval(interval);
        canvas.style.opacity = '0';
        canvas.style.transition = 'opacity 1s ease-out';
        setTimeout(() => canvas.remove(), 1000);
    }, 10000);
}

// Add meta theme-color for mobile browsers
if (!document.querySelector('meta[name="theme-color"]')) {
    const metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    metaThemeColor.content = '#8B5CF6';
    document.head.appendChild(metaThemeColor);
}

// Add loading animation
function addLoadingAnimation() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            body.style.opacity = '1';
        }, 100);
    });
}

// Initialize loading animation
addLoadingAnimation();

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`⚡ Page loaded in ${loadTime}ms`);
            
            if (loadTime > 3000) {
                console.log('⚠️ Page load time is slow. Consider optimizing assets.');
            }
        }, 0);
    });
}
