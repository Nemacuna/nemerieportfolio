(function () {
    'use strict';

    // ==========================================
    // 1. Theme Toggle with LocalStorage
    // ==========================================
    var root = document.documentElement;
    var themeToggle = document.getElementById('themeToggle');

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch (e) { /* ignore */ }
    }

    function getSavedTheme() {
        try {
            var saved = localStorage.getItem('portfolio-theme');
            if (saved === 'light' || saved === 'dark') {
                return saved;
            }
        } catch (e) { /* ignore */ }
        return 'dark';
    }

    applyTheme(getSavedTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var current = root.getAttribute('data-theme');
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // ==========================================
    // 2. Starfield Parallax
    // ==========================================
    var starLayer = document.querySelector('.starfield');
    var stars = [];

    if (starLayer) {
        var starCount = 150;
        for (var i = 0; i < starCount; i++) {
            var star = document.createElement('span');
            star.className = 'star';
            star.style.left = (Math.random() * 100) + '%';
            star.style.top = (Math.random() * 100) + '%';
            star.style.opacity = (0.35 + Math.random() * 0.65).toFixed(2);
            star.style.background = Math.random() < 0.18 ? 'rgba(0, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.9)';
            star.style.boxShadow = Math.random() < 0.18 ? '0 0 8px rgba(0, 255, 255, 0.9)' : '0 0 6px rgba(255, 255, 255, 0.8)';
            starLayer.appendChild(star);
            stars.push(star);
        }

        var lastScrollY = window.scrollY;
        var ticking = false;

        function updateStars() {
            var scrollY = window.scrollY;
            var direction = scrollY >= lastScrollY ? 1 : -1;
            stars.forEach(function (star, idx) {
                var depth = 0.25 + ((idx * 29) % 40) / 100;
                var speed = depth * 0.25;
                star.style.transform = 'translate3d(0, ' + (scrollY * speed * direction).toFixed(2) + 'px, 0)';
            });
            lastScrollY = scrollY;
            ticking = false;
        }

        function scheduleUpdateStars() {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(updateStars);
            }
        }

        window.addEventListener('scroll', scheduleUpdateStars, { passive: true });
        window.addEventListener('resize', scheduleUpdateStars);
        updateStars();
    }

    // ==========================================
    // 3. Mobile Navigation Toggle
    // ==========================================
    var navToggler = document.getElementById('navToggler');
    var navMenu = document.getElementById('navMenu');

    if (navToggler && navMenu) {
        navToggler.addEventListener('click', function () {
            var isActive = navMenu.classList.toggle('active');
            navToggler.classList.toggle('active', isActive);
            navToggler.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });

        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggler.classList.remove('active');
                navToggler.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==========================================
    // 4. Automatic Copyright Year
    // ==========================================
    var currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 5. Certificate Modal (Pure JavaScript)
    // ==========================================
    var certModal = document.getElementById('certModal');
    var certModalTitle = document.getElementById('certModalTitle');
    var certModalIssuer = document.getElementById('certModalIssuer');
    var certModalYear = document.getElementById('certModalYear');
    var certModalDesc = document.getElementById('certModalDesc');
    var certModalImage = document.getElementById('certModalImage');
    var certModalLink = document.getElementById('certModalLink');
    var certModalClose = document.getElementById('certModalClose');

    function openCertModal(data) {
        if (!certModal) return;
        if (certModalTitle) certModalTitle.textContent = data.title || '';
        if (certModalIssuer) certModalIssuer.textContent = data.issuer || '';
        if (certModalYear) certModalYear.textContent = data.year || '';
        if (certModalDesc) certModalDesc.textContent = data.desc || '';
        if (certModalImage) {
            certModalImage.src = data.image || '';
            certModalImage.alt = data.title || '';
        }
        if (certModalLink) certModalLink.href = data.image || '#';
        certModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeCertModal() {
        if (!certModal) return;
        certModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.js-cert-card').forEach(function (card) {
        card.addEventListener('click', function (e) {
            var data = {
                title: card.getAttribute('data-title'),
                issuer: card.getAttribute('data-issuer'),
                year: card.getAttribute('data-year'),
                desc: card.getAttribute('data-desc'),
                image: card.getAttribute('data-image')
            };
            openCertModal(data);
        });
    });

    if (certModalClose) {
        certModalClose.addEventListener('click', function (e) {
            e.stopPropagation();
            closeCertModal();
        });
    }

    if (certModal) {
        certModal.addEventListener('click', function (e) {
            if (e.target === certModal) {
                closeCertModal();
            }
        });
    }

    // ==========================================
    // 6. Project Modal & Carousel (Pure JavaScript)
    // ==========================================
    var projectModal = document.getElementById('projectModal');
    var projectModalTitle = document.getElementById('projectModalTitle');
    var projectModalDesc = document.getElementById('projectModalDesc');
    var projectModalTech = document.getElementById('projectModalTech');
    var projectModalImage = document.getElementById('projectModalImage');
    var projectModalGithub = document.getElementById('projectModalGithub');
    var projectModalLink = document.getElementById('projectModalLink');
    var projectModalClose = document.getElementById('projectModalClose');
    var projectGalleryPrev = document.getElementById('projectGalleryPrev');
    var projectGalleryNext = document.getElementById('projectGalleryNext');
    var projectGalleryDots = document.getElementById('projectGalleryDots');
    var projectGalleryCounter = document.getElementById('projectGalleryCounter');

    var currentProjImages = [];
    var currentProjIndex = 0;

    function renderProjGalleryImage(index) {
        if (!currentProjImages || currentProjImages.length === 0) return;
        currentProjIndex = index;
        if (projectModalImage) {
            projectModalImage.src = currentProjImages[index];
        }
        if (projectGalleryCounter) {
            projectGalleryCounter.textContent = (index + 1) + ' / ' + currentProjImages.length;
        }
        if (projectGalleryDots) {
            var dots = projectGalleryDots.querySelectorAll('.proj-gallery-dot');
            dots.forEach(function (dot, i) {
                if (i === index) {
                    dot.classList.add('proj-gallery-dot--active');
                } else {
                    dot.classList.remove('proj-gallery-dot--active');
                }
            });
        }
    }

    function openProjectModal(data) {
        if (!projectModal) return;
        if (projectModalTitle) projectModalTitle.textContent = data.title || '';
        if (projectModalDesc) projectModalDesc.textContent = data.desc || '';

        // Render tech tags
        if (projectModalTech) {
            projectModalTech.innerHTML = '';
            var tags = data.tech ? data.tech.split(',') : [];
            tags.forEach(function (t) {
                var trimmed = t.trim();
                if (trimmed) {
                    var span = document.createElement('span');
                    span.className = 'tech-tag';
                    span.textContent = trimmed;
                    projectModalTech.appendChild(span);
                }
            });
        }

        // Links
        if (projectModalGithub) {
            if (data.github && data.github.trim() !== '') {
                projectModalGithub.href = data.github;
                projectModalGithub.style.display = 'inline-flex';
            } else {
                projectModalGithub.style.display = 'none';
            }
        }
        if (projectModalLink) {
            if (data.link && data.link.trim() !== '') {
                projectModalLink.href = data.link;
                projectModalLink.style.display = 'inline-flex';
            } else {
                projectModalLink.style.display = 'none';
            }
        }

        // Images array
        try {
            currentProjImages = typeof data.images === 'string' ? JSON.parse(data.images) : (data.images || []);
        } catch (err) {
            currentProjImages = [data.link || ''];
        }
        if (!Array.isArray(currentProjImages) || currentProjImages.length === 0) {
            currentProjImages = [data.link || ''];
        }

        // Dots setup
        if (projectGalleryDots) {
            projectGalleryDots.innerHTML = '';
            if (currentProjImages.length > 1) {
                currentProjImages.forEach(function (_, i) {
                    var dot = document.createElement('button');
                    dot.type = 'button';
                    dot.className = 'proj-gallery-dot' + (i === 0 ? ' proj-gallery-dot--active' : '');
                    dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
                    dot.addEventListener('click', function (e) {
                        e.stopPropagation();
                        renderProjGalleryImage(i);
                    });
                    projectGalleryDots.appendChild(dot);
                });
            }
        }

        // Controls visibility
        var hasMultiple = currentProjImages.length > 1;
        if (projectGalleryPrev) projectGalleryPrev.style.display = hasMultiple ? 'grid' : 'none';
        if (projectGalleryNext) projectGalleryNext.style.display = hasMultiple ? 'grid' : 'none';
        if (projectGalleryDots) projectGalleryDots.style.display = hasMultiple ? 'flex' : 'none';
        if (projectGalleryCounter) projectGalleryCounter.style.display = hasMultiple ? 'block' : 'none';

        renderProjGalleryImage(0);

        projectModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.js-project-card').forEach(function (card) {
        card.addEventListener('click', function (e) {
            e.preventDefault();
            var data = {
                title: card.getAttribute('data-title'),
                desc: card.getAttribute('data-desc'),
                tech: card.getAttribute('data-tech'),
                github: card.getAttribute('data-github'),
                link: card.getAttribute('data-link'),
                images: card.getAttribute('data-images')
            };
            openProjectModal(data);
        });
    });

    if (projectGalleryPrev) {
        projectGalleryPrev.addEventListener('click', function (e) {
            e.stopPropagation();
            if (currentProjImages.length > 1) {
                var prevIndex = (currentProjIndex - 1 + currentProjImages.length) % currentProjImages.length;
                renderProjGalleryImage(prevIndex);
            }
        });
    }

    if (projectGalleryNext) {
        projectGalleryNext.addEventListener('click', function (e) {
            e.stopPropagation();
            if (currentProjImages.length > 1) {
                var nextIndex = (currentProjIndex + 1) % currentProjImages.length;
                renderProjGalleryImage(nextIndex);
            }
        });
    }

    if (projectModalClose) {
        projectModalClose.addEventListener('click', function (e) {
            e.stopPropagation();
            closeProjectModal();
        });
    }

    if (projectModal) {
        projectModal.addEventListener('click', function (e) {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // ==========================================
    // 7. Resume Modal (Pure JavaScript)
    // ==========================================
    var resumeModal = document.getElementById('resumeModal');
    var resumeViewBtn = document.getElementById('resumeViewBtn');
    var resumeModalClose = document.getElementById('resumeModalClose');

    function openResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if (resumeViewBtn) {
        resumeViewBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openResumeModal();
        });
    }

    if (resumeModalClose) {
        resumeModalClose.addEventListener('click', function (e) {
            e.stopPropagation();
            closeResumeModal();
        });
    }

    if (resumeModal) {
        resumeModal.addEventListener('click', function (e) {
            if (e.target === resumeModal) {
                closeResumeModal();
            }
        });
    }

    // ==========================================
    // 8. Global Escape Key Listener
    // ==========================================
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeCertModal();
            closeProjectModal();
            closeResumeModal();
        }
    });

})();
