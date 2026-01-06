// Intersection Observer for Scroll Reveals with staggered timing
const revealOnScroll = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element index in view
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hide');
    hiddenElements.forEach(el => observer.observe(el));
};

// Smooth Scrolling for Navigation
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
};

// Custom Cursor Follower with smooth interpolation
const initCustomCursor = () => {
    const cursor = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation loop
    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.4;
        cursorY += (mouseY - cursorY) * 0.4;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor scaling on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .service-card, .work-card, input, textarea, select');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
};

// Animated Counter for Stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.innerText;
                const isPercentage = target.includes('%');
                const hasPlus = target.includes('+');
                const numericValue = parseInt(target.replace(/[^0-9]/g, ''));

                let current = 0;
                const increment = numericValue / 60; // 60 frames
                const duration = 2000; // 2 seconds
                const stepTime = duration / 60;

                const updateCounter = () => {
                    current += increment;
                    if (current < numericValue) {
                        counter.innerText = Math.round(current) + (hasPlus ? '+' : '') + (isPercentage ? '%' : '');
                        setTimeout(updateCounter, stepTime);
                    } else {
                        counter.innerText = target; // Ensure exact final value
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
};

// Parallax effect on hero videos
const initParallax = () => {
    const heroVideos = document.querySelector('.hero-videos');
    const heroOverlay = document.querySelector('.hero-overlay');

    if (!heroVideos) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;

        if (scrollY <= heroHeight) {
            // Parallax: videos move slower than scroll
            heroVideos.style.transform = `translateY(${scrollY * 0.3}px)`;
            // Fade overlay as user scrolls
            heroOverlay.style.opacity = 0.8 + (scrollY / heroHeight) * 0.2;
        }
    });
};

// Nav background opacity on scroll
const initNavScroll = () => {
    const nav = document.querySelector('.glass-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.6)';
        }
    });
};

// Contact form handler
const initContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;

        // Simulate sending
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerText = '✓ Message Sent!';
            submitBtn.style.background = 'var(--accent-blue)';

            // Reset form
            form.reset();

            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
};

// Tilt effect on work cards
const initTiltEffect = () => {
    const cards = document.querySelectorAll('.work-card, .service-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
};

// World Clock - Update times for different timezones
const initWorldClock = () => {
    const updateClocks = () => {
        const clockElements = document.querySelectorAll('.clock-time');

        clockElements.forEach(clock => {
            const timezone = clock.dataset.timezone;
            if (timezone) {
                const time = new Date().toLocaleTimeString('en-US', {
                    timeZone: timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                clock.textContent = time;
            }
        });
    };

    // Update immediately and then every second
    updateClocks();
    setInterval(updateClocks, 1000);
};

// Typewriter effect on hover for subtitle
const initTypewriter = () => {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;

    const originalText = subtitle.textContent;
    let isTyping = false;

    subtitle.addEventListener('mouseenter', () => {
        if (isTyping) return;
        isTyping = true;

        subtitle.textContent = '';
        let i = 0;

        const typeChar = () => {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeChar, 30);
            } else {
                isTyping = false;
            }
        };

        typeChar();
    });
};

// Gallery Modal Handler
const initGallery = () => {
    const modal = document.getElementById('gallery-modal');
    const modalImg = modal.querySelector('.gallery-image');
    const contentContainer = modal.querySelector('.gallery-content');
    const closeBtn = modal.querySelector('.gallery-close');
    const prevBtn = modal.querySelector('.gallery-prev');
    const nextBtn = modal.querySelector('.gallery-next');
    const cards = document.querySelectorAll('.work-card');

    let currentImages = [];
    let currentIndex = 0;

    // Helper to add/remove visit button
    const updateVisitButton = (url) => {
        // Remove existing button if any
        const existingBtn = modal.querySelector('.visit-site-btn');
        if (existingBtn) existingBtn.remove();

        if (url) {
            const btn = document.createElement('a');
            btn.href = url;
            btn.className = 'visit-site-btn';
            btn.textContent = 'Visit Website';
            btn.target = '_blank';
            btn.rel = 'noopener noreferrer';
            contentContainer.appendChild(btn);
        }
    };

    const showImage = (index) => {
        modalImg.style.opacity = '0';
        setTimeout(() => {
            modalImg.src = currentImages[index];
            modalImg.onload = () => {
                modalImg.style.opacity = '1';
            };
        }, 200);
        currentIndex = index;
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Get gallery images
            const galleryData = card.dataset.gallery;
            if (galleryData) {
                currentImages = galleryData.split(',').map(src => src.trim());
                currentIndex = 0;
                showImage(0);

                // Handle website URL
                const projectUrl = card.dataset.url;
                updateVisitButton(projectUrl);

                modal.classList.remove('hide');
                // Small delay to allow display:flex to apply before opacity transition
                requestAnimationFrame(() => {
                    modal.classList.add('show');
                });
            }
        });
    });

    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hide');
            modalImg.src = '';
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const newIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage(newIndex);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const newIndex = (currentIndex + 1) % currentImages.length;
        showImage(newIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('hide')) {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        }
    });
};

// Mobile Navigation Toggle
const initMobileNav = () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const links = document.querySelectorAll('.mobile-nav-links a');

    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
};

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    initSmoothScroll();
    initCustomCursor();
    animateCounters();
    initParallax();
    initNavScroll();
    initContactForm();
    initTiltEffect();
    initWorldClock();
    initTypewriter();
    initMobileNav();
    initGallery();

    // Initialize hero videos with staggered start times
    const heroVideos = document.querySelectorAll('.hero-video');
    heroVideos.forEach((video) => {
        const delay = parseFloat(video.dataset.delay) || 0;
        // Reset time to ensure sync
        video.currentTime = 0;

        setTimeout(() => {
            video.play().catch(error => {
                console.log("Auto-play was prevented.", error);
            });
        }, delay * 1000);
    });

    // Trigger hero content reveal after a short delay
    setTimeout(() => {
        document.querySelectorAll('.hero-content .hide').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('reveal');
            }, index * 200);
        });
    }, 500);
});
