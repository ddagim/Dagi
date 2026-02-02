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

// ==== THREE-DOT MOBILE MENU ====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close menu when clicking on links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
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

// ==== SMOOTH SCROLL ====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            closeMobileMenu();
        }
    });
});

// ==== HIRE ME BUTTON FUNCTIONALITY ====
document.querySelectorAll('.hire-btn, .btn-hire').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#contact') {
            e.preventDefault();
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            console.log('Hire Me button clicked - Redirecting to contact section');
        }
    });
});

// ==== CV DOWNLOAD FUNCTIONALITY ====
document.querySelectorAll('.btn-cv').forEach(btn => {
    btn.addEventListener('click', function(e) {
        console.log('CV Download button clicked');
        // Optional: Add download tracking or analytics here
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
        this.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});

// ==== INITIALIZE ====
window.addEventListener('load', () => {
    // Console greeting
    console.log('%c🔥 DAGIM DESALEGN - ULTIMATE HACKER PORTFOLIO 🔥', 'color: #00FF41; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px #00FF41;');
    console.log('%c> Domain: dagi-tech.com', 'color: #00FFFF;');
    console.log('%c> Status: Portfolio fully loaded', 'color: #00FF41;');
    console.log('%c> Features: Theme toggle, Mobile menu, Smooth scroll', 'color: #00FF41;');
    console.log('%c> Buttons: Hire Me & View CV with attractive design', 'color: #00FF41;');
    
    // Auto-hide mobile menu on desktop resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeMobileMenu();
        }
    });
});

// ==== SCROLL PROGRESS INDICATOR ====
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight * 100;
    
    // Optional: Add scroll progress bar if needed
    // You could add a progress bar at the top
});

// ==== ACTIVE NAV LINK HIGHLIGHTING ====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
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