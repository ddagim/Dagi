// ==== THEME TOGGLE ====
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
let isDark = true;

function toggleTheme() {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    const icon = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    themeToggle.innerHTML = icon;
    if (mobileThemeToggle) mobileThemeToggle.innerHTML = icon;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', toggleTheme);
if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    isDark = false;
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    if (mobileThemeToggle) mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// ==== MOBILE MENU - SIMPLE DROPDOWN ====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
}

// Event listeners
mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close menu when clicking on mobile menu links
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

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
    }
});

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
    }
});

// ==== SCROLL ANIMATIONS ====
const fadeElements = document.querySelectorAll('.fade-in');
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

// ==== SMOOTH SCROLL FOR DESKTOP LINKS ====
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

// ==== BUTTON FUNCTIONALITY ====
document.querySelectorAll('.hire-btn, .btn-hire').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#contact') {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.querySelectorAll('.btn-cv').forEach(btn => {
    btn.addEventListener('click', function(e) {
        console.log('Desktop CV Download initiated');
    });
});

// ==== BUTTON GLOW EFFECTS ====
document.querySelectorAll('.btn-hire, .btn-cv').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        const glow = this.querySelector('.btn-glow');
        if (glow) {
            glow.style.transition = 'transform 0.6s ease';
            glow.style.transform = 'translateX(100%)';
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        const glow = this.querySelector('.btn-glow');
        if (glow) {
            glow.style.transform = 'translateX(-100%)';
        }
    });
});

// ==== SKILL ITEMS HOVER EFFECTS ====
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// ==== PROJECT CARDS HOVER EFFECTS ====
document.querySelectorAll('.project-holo').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==== ACTIVE NAV LINK HIGHLIGHTING ====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==== INITIALIZE ====
window.addEventListener('load', () => {
    // Console greeting
    console.log('%c🔥 DAGIM DESALEGN - PORTFOLIO 🔥', 'color: #00FF41; font-size: 18px; font-weight: bold;');
    console.log('%c> Fixed: Contact section theme consistency', 'color: #00FFFF;');
    console.log('%c> Added: Programming Languages skill matrix', 'color: #00FF41;');
    console.log('%c> Mobile Menu: Compact dropdown without buttons', 'color: #00FF41;');
    
    // Initialize active link
    setTimeout(() => {
        const navLinks = document.querySelectorAll('.nav-link');
        if (navLinks.length > 0) {
            navLinks[0].classList.add('active');
        }
    }, 100);
});
