document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const navbar = document.querySelector('.navbar');
let scrolled = false;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        if (!scrolled) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            scrolled = true;
        }
    } else {
        navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        scrolled = false;
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.detail-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
});

document.querySelectorAll('.announcement-card, .filing-info, .disclaimer-card, .contact-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 0.25rem;
    }
`;
document.head.appendChild(style);

document.querySelectorAll('a[href*="sec.gov"]').forEach(link => {
    link.addEventListener('click', function() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'external_link_click', {
                'link_url': this.href,
                'link_text': this.textContent
            });
        }
    });
});

const printStyle = document.createElement('style');
printStyle.textContent = `
    @media print {
        .navbar,
        .hero-buttons,
        .footer {
            display: none;
        }
        body {
            font-size: 12pt;
        }
        a[href]:after {
            content: none;
        }
    }
`;
document.head.appendChild(printStyle);

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

if (document.readyState !== 'loading') {
    document.body.style.opacity = '1';
}