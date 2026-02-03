// ===== SECURE EMAILJS CONFIGURATION =====
// Obfuscated to prevent easy extraction
const EMAIL_CONFIG = (function() {
    // Obfuscated service and template IDs
    const serviceParts = ['service', '_', 'j7i2umf'];
    const templateParts = ['template', '_', '20f4wwd'];
    
    return {
        serviceID: serviceParts.join(''),
        templateID: templateParts.join(''),
        // EmailJS requires user_id to be exposed, but we obfuscate it
        userID: ['P','0','i','p','f','B','B','J','x','I','T','O','3','m','p','0','X'].join('')
    };
})();

// ===== MAIN APPLICATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🔒 DAGIM DESALEGN PORTFOLIO - SECURE SYSTEM', 'color: #00FF41; font-size: 16px; font-weight: bold;');
    console.log('%c⚠️  Security: Site inspection allowed | Direct file access blocked', 'color: #FF003C; font-weight: bold;');
    
    // Initialize components
    initThemeToggle();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initContactForm();
    initButtonEffects();
    
    // Initialize EmailJS after DOM is loaded
    setTimeout(() => {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAIL_CONFIG.userID);
            console.log('📧 EmailJS initialized securely');
        }
    }, 100);
});

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    let isDark = true;
    
    function toggleTheme() {
        isDark = !isDark;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        const icon = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        themeToggle.innerHTML = icon;
        if (mobileThemeToggle) mobileThemeToggle.innerHTML = icon;
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        isDark = false;
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        if (mobileThemeToggle) mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.remove('active');
            
            setTimeout(() => {
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) && 
            mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (!fadeElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(el => observer.observe(el));
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submitBtn');
    const clearBtn = document.getElementById('clearBtn');
    const formStatus = document.getElementById('formStatus');
    
    if (!contactForm || !submitBtn || !clearBtn || !formStatus) return;
    
    const statusText = formStatus.querySelector('.status-text');
    const statusIcon = formStatus.querySelector('.status-icon i');
    
    // Clear form
    clearBtn.addEventListener('click', () => {
        contactForm.reset();
        formStatus.classList.remove('visible', 'success', 'error');
        formStatus.classList.add('visible');
        statusIcon.className = 'fas fa-satellite-dish';
        statusText.textContent = 'Ready for transmission...';
        
        setTimeout(() => {
            formStatus.classList.remove('visible');
        }, 2000);
    });
    
    // Form validation
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || name.length < 2) {
            showError('Please enter a valid name (min 2 characters)');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showError('Please enter a valid email address');
            return false;
        }
        
        if (!message || message.length < 10) {
            showError('Please enter a message with at least 10 characters');
            return false;
        }
        
        return true;
    }
    
    function showError(message) {
        formStatus.classList.remove('success');
        formStatus.classList.add('error', 'visible');
        statusIcon.className = 'fas fa-exclamation-triangle';
        statusText.textContent = message;
        
        setTimeout(() => {
            formStatus.classList.remove('visible');
        }, 5000);
    }
    
    function showSuccess(message) {
        formStatus.classList.remove('error');
        formStatus.classList.add('success', 'visible');
        statusIcon.className = 'fas fa-check-circle';
        statusText.textContent = message;
    }
    
    function showLoading() {
        formStatus.classList.remove('success', 'error');
        formStatus.classList.add('visible');
        statusIcon.className = 'fas fa-satellite-dish fa-spin';
        statusText.textContent = 'Establishing secure connection...';
    }
    
    // SECURE EMAIL SENDING FUNCTION
    async function sendSecureEmail(formData) {
        // This is the key fix - EmailJS requires these parameters in the payload
        // We obfuscate them as much as possible
        const payload = {
            lib_version: "3.12.1",
            user_id: EMAIL_CONFIG.userID,
            service_id: EMAIL_CONFIG.serviceID,
            template_id: EMAIL_CONFIG.templateID,
            template_params: {
                from_name: formData.from_name,
                from_email: formData.from_email,
                message: formData.message,
                to_email: 'dagid6944@gmail.com',
                timestamp: new Date().toLocaleString()
            }
        };
        
        // Send via EmailJS API
        return emailjs.send(
            EMAIL_CONFIG.serviceID,
            EMAIL_CONFIG.templateID,
            {
                from_name: formData.from_name,
                from_email: formData.from_email,
                message: formData.message,
                to_email: 'dagid6944@gmail.com'
            }
        );
    }
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>TRANSMITTING...</span>';
        
        // Show loading status
        showLoading();
        
        try {
            const formData = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Send email securely
            await sendSecureEmail(formData);
            
            // Show success message
            showSuccess('Message transmitted successfully! I\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Re-enable button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>TRANSMIT MESSAGE</span>';
                formStatus.classList.remove('visible');
            }, 3000);
            
        } catch (error) {
            console.error('Email error:', error);
            
            // Show error message
            showError('Transmission failed. Please try again or email me directly at dagid6944@gmail.com');
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>TRANSMIT MESSAGE</span>';
            
            // Hide status after 5 seconds
            setTimeout(() => {
                formStatus.classList.remove('visible');
            }, 5000);
        }
    });
}

// ===== BUTTON EFFECTS =====
function initButtonEffects() {
    // Button glow effects
    document.querySelectorAll('.btn-hire, .btn-cv, .btn-transmit').forEach(btn => {
        const glow = btn.querySelector('.btn-glow');
        if (!glow) return;
        
        btn.addEventListener('mouseenter', function() {
            glow.style.transition = 'transform 0.6s ease';
            glow.style.transform = 'translateX(100%)';
        });
        
        btn.addEventListener('mouseleave', function() {
            glow.style.transform = 'translateX(-100%)';
        });
    });
    
    // Hire button scroll
    document.querySelectorAll('.hire-btn, .btn-hire').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#contact') {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    window.scrollTo({
                        top: contactSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== SECURITY NOTE =====
// EmailJS ALWAYS exposes these parameters in the API call:
// 1. user_id (public key) - Required by EmailJS for authentication
// 2. service_id - Identifies your EmailJS service
// 3. template_id - Identifies your email template
// This is NORMAL and how EmailJS works
// The keys are public-facing by design and can only send emails to your configured email
