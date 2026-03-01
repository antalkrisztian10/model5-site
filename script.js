document.addEventListener('DOMContentLoaded', function () {
    // 1. Scroll Reveals Animation
    const reveals = document.querySelectorAll('.reveal');
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // 2. Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.querySelector('.menu-open-icon');
    const menuCloseIcon = document.querySelector('.menu-close-icon');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                document.body.style.overflow = 'hidden';
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.remove('pointer-events-none');
                setTimeout(() => mobileMenu.classList.remove('opacity-0'), 10);
                if (menuOpenIcon) menuOpenIcon.classList.add('hidden');
                if (menuCloseIcon) menuCloseIcon.classList.remove('hidden');
            } else {
                document.body.style.overflow = '';
                mobileMenu.classList.add('opacity-0');
                mobileMenu.classList.add('pointer-events-none');
                setTimeout(() => mobileMenu.classList.add('hidden'), 300);
                if (menuOpenIcon) menuOpenIcon.classList.remove('hidden');
                if (menuCloseIcon) menuCloseIcon.classList.add('hidden');
            }
        });
    }

    // 3. Hero Tabs Logic (Used in Homepage)
    const heroTabs = document.querySelectorAll('.hero-tab');
    const heroBgs = document.querySelectorAll('.hero-diagonal-overlay');
    const heroContents = document.querySelectorAll('.hero-content');

    if (heroTabs.length > 0) {
        let currentHeroIndex = 0;
        let heroTimer;

        function switchHeroTab(index) {
            heroTabs.forEach(t => {
                t.classList.remove('active', 'text-brand-accent', 'border-brand-accent');
                t.classList.add('border-transparent');
            });
            const targetTab = document.querySelector(`.hero-tab[data-tab="${index}"]`);
            if (targetTab) {
                targetTab.classList.add('active', 'text-brand-accent', 'border-brand-accent');
                targetTab.classList.remove('border-transparent');
            }

            heroBgs.forEach((bg, i) => {
                if (i == index) bg.classList.add('active');
                else bg.classList.remove('active');
            });

            heroContents.forEach((content, i) => {
                if (i == index) content.classList.add('active');
                else content.classList.remove('active');
            });
        }

        function startHeroCycle() {
            heroTimer = setInterval(() => {
                currentHeroIndex = (currentHeroIndex + 1) % heroTabs.length;
                switchHeroTab(currentHeroIndex);
            }, 10000);
        }

        function resetHeroCycle() {
            clearInterval(heroTimer);
            startHeroCycle();
        }

        heroTabs.forEach(tab => {
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                currentHeroIndex = parseInt(this.getAttribute('data-tab'));
                switchHeroTab(currentHeroIndex);
                resetHeroCycle();
            });
        });
        startHeroCycle();
    }

    // 4. Module Tabs Logic
    const moduleTabs = document.querySelectorAll('.module-tab');
    const moduleContents = document.querySelectorAll('.module-content');

    if (moduleTabs.length > 0) {
        moduleTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const targetId = this.getAttribute('data-target');

                moduleTabs.forEach(t => {
                    t.classList.remove('active', 'bg-brand-text/5', 'text-brand-text', 'border-brand-text/10');
                    t.classList.add('border-transparent', 'text-brand-textlight');
                });

                this.classList.remove('border-transparent', 'text-brand-textlight');
                this.classList.add('active', 'bg-brand-text/5', 'text-brand-text', 'border-brand-text/10');

                moduleContents.forEach(content => {
                    content.classList.remove('opacity-100');
                    content.classList.add('opacity-0', 'pointer-events-none');
                });

                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.remove('opacity-0', 'pointer-events-none');
                    targetContent.classList.add('opacity-100');
                }
            });
        });
    }

    // 5. Modal Logic pentru DIASAN Modules
    window.openModal = function (modalId) {
        const dataId = modalId.replace('-modal', '-data');
        const sourceData = document.getElementById(dataId);
        const modal = document.getElementById('module-modal');
        const modalContent = document.getElementById('modal-content');

        if (sourceData && modal && modalContent) {
            modalContent.innerHTML = sourceData.innerHTML;

            document.body.style.overflow = 'hidden';
            modal.classList.remove('hidden');

            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modal.classList.add('opacity-100');
            }, 10);
        }
    };

    window.closeModal = function () {
        const modal = document.getElementById('module-modal');
        if (modal) {
            modal.classList.remove('opacity-100');
            modal.classList.add('opacity-0');

            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
    };

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            window.closeModal();
        }
    });

    // 6. FAQ Toggle Logic
    const faqBtns = document.querySelectorAll('.faq-btn');
    if (faqBtns.length > 0) {
        faqBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const content = this.nextElementSibling;
                const icon = this.querySelector('.faq-icon');

                if (content.classList.contains('hidden')) {
                    content.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    content.classList.add('hidden');
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    // 7. Scrollspy Logic for Sticky Subnav
    const scrollspyLinks = document.querySelectorAll('.scrollspy-link');
    if (scrollspyLinks.length > 0) {
        const sections = Array.from(scrollspyLinks).map(link => document.querySelector(link.getAttribute('href')));
        const headerOffset = 180;

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                if (section) {
                    const sectionTop = section.offsetTop;
                    if (pageYOffset >= (sectionTop - headerOffset)) {
                        current = section.getAttribute('id');
                    }
                }
            });

            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50) {
                if (sections.length > 0) {
                    current = sections[sections.length - 1].getAttribute('id');
                }
            }

            scrollspyLinks.forEach(link => {
                link.classList.remove('border-brand-accent', 'text-brand-text');
                link.classList.add('border-transparent', 'text-brand-textlight');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.remove('border-transparent', 'text-brand-textlight');
                    link.classList.add('border-brand-accent', 'text-brand-text');
                }
            });
        });
    }

    // 8. Counter Animation Logic
    const counters = document.querySelectorAll('.count-up');
    let hasAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }

    const statsContainer = document.getElementById('stats-container');
    if (statsContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateCounters();
                    hasAnimated = true;
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsContainer);
    }

    // 9. Load Footer Dynamically (Embedded due to local file:// CORS restrictions)
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
});
