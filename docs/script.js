// DOM Ready
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Highlight.js
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }

    // Active navigation item based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close sidebar on mobile
                sidebar.classList.remove('open');
            }
        });
    });

    // Highlight current section in sidebar based on scroll
    const sections = document.querySelectorAll('h2[id], h3[id]');

    if (sections.length > 0) {
        const observerOptions = {
            rootMargin: '-80px 0px -80% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const navLink = document.querySelector(`.nav-item[href*="#${id}"]`);
                    if (navLink) {
                        navItems.forEach(item => {
                            if (item.getAttribute('href').includes('#')) {
                                item.classList.remove('active');
                            }
                        });
                        navLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }
});

// Copy code functionality
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code').textContent;

    navigator.clipboard.writeText(code).then(() => {
        const icon = button.querySelector('i');
        icon.classList.remove('fa-copy');
        icon.classList.add('fa-check');
        button.classList.add('copied');

        setTimeout(() => {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-copy');
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Table of contents scroll spy
function updateTOC() {
    const toc = document.querySelector('.toc');
    if (!toc) return;

    const headings = document.querySelectorAll('h2[id], h3[id]');
    const tocLinks = toc.querySelectorAll('a');

    let current = '';

    headings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
            current = heading.getAttribute('id');
        }
    });

    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateTOC);

// Console Easter Egg
console.log('%c🎓 GitHub Workshop Wiki', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cKapsamlı Git ve GitHub Eğitimi', 'font-size: 14px; color: #8b949e;');
console.log('%c👉 https://github.com/Furk4nBulut/Github-Workshop', 'font-size: 12px; color: #10b981;');
