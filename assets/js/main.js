// =====================================================
//  SCROLL PROGRESS BAR
// =====================================================
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    const bar = document.getElementById('scrollProgress');
    if (bar) bar.style.width = progress + '%';
}

// =====================================================
//  BACK TO TOP
// =====================================================
const backToTopBtn = document.getElementById('backToTop');

function updateBackToTop() {
    if (!backToTopBtn) return;
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =====================================================
//  FADE-IN ON SCROLL
// =====================================================
function checkFadeIns() {
    const threshold = window.innerHeight - 80;
    document.querySelectorAll('.fade-in').forEach(function (el) {
        if (el.getBoundingClientRect().top < threshold) {
            el.classList.add('visible');
        }
    });
}

// =====================================================
//  SCROLL LISTENER
// =====================================================
window.addEventListener('scroll', function () {
    updateScrollProgress();
    updateBackToTop();
    checkFadeIns();
}, { passive: true });

// Run once on load
updateScrollProgress();
updateBackToTop();
checkFadeIns();

// =====================================================
//  MOBILE MENU
// =====================================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function () {
        const isOpen = navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
}

// =====================================================
//  SMOOTH SCROLL (with header offset)
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 64;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
});

// =====================================================
//  CONTACT FORM
// =====================================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('.form-submit');
        if (!btn) return;
        const original = btn.textContent;
        btn.textContent = 'Sent!';
        btn.disabled = true;
        this.reset();
        setTimeout(function () {
            btn.textContent = original;
            btn.disabled = false;
        }, 3000);
    });
}
