// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Frame Preloader Variables
const FRAME_COUNT = parseInt(document.body.dataset.frameCount) || 192;
const FRAME_PATH = document.body.dataset.framePath || 'frames';
const frames = [];
let currentFrame = -1;

// Canvas Setup
const canvasWrap = document.getElementById("canvas-wrap");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const heroSection = document.getElementById("hero");
const scrollContainer = document.getElementById("scroll-container");

// Cap DPR at 2 for performance (3x Retina is too heavy for canvas)
const DPR = Math.min(window.devicePixelRatio || 1, 2);

// Scale canvas for high DPI
let resizeTimeout;
function resizeCanvas() {
    canvas.width = window.innerWidth * DPR;
    canvas.height = window.innerHeight * DPR;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (currentFrame >= 0) drawFrame(currentFrame);
}
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 150);
});
resizeCanvas();

const IMAGE_SCALE = 0.90;

function drawFrame(index) {
    const img = frames[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
    const dw = iw * scale, dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
}

// Preload Images
for (let i = 1; i <= FRAME_COUNT; i++) {
    const img = new Image();
    const indexStr = i.toString().padStart(4, '0');
    img.src = `${FRAME_PATH}/frame_${indexStr}.webp`;
    img.onload = () => { if (i === 1) drawFrame(0); };
    img.onerror = () => { console.warn(`Frame ${indexStr} failed to load`); };
    frames.push(img);
}

// ------------------------------------------------------------------
// Scroll Animations — Consolidated into single ScrollTrigger
// ------------------------------------------------------------------

const FRAME_SPEED = 1.0;
const overlay = document.getElementById("dark-overlay");
const enterOverlay = 0.68;
const leaveOverlay = 0.80;
const fadeRange = 0.04;

// Single master ScrollTrigger for frame draw + hero wipe + dark overlay
ScrollTrigger.create({
    trigger: scrollContainer,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
        const p = self.progress;

        // 1. Frame-to-Scroll (Ping-Pong)
        const fp = p * FRAME_SPEED;
        const pingPong = fp <= 0.5 ? fp * 2 : (1 - fp) * 2;
        const clamped = Math.max(0, Math.min(1, pingPong));
        const index = Math.min(Math.floor(clamped * FRAME_COUNT), FRAME_COUNT - 1);
        if (index !== currentFrame) {
            currentFrame = index;
            drawFrame(currentFrame);
        }

        // 2. Hero fade-out + Circle-wipe reveal
        if (heroSection) heroSection.style.opacity = Math.max(0, 1 - p * 15);
        const wipeProgress = Math.min(1, Math.max(0, (p - 0.01) / 0.06));
        const radius = wipeProgress * 75;
        if (canvasWrap) canvasWrap.style.clipPath = `circle(${radius}% at 50% 50%)`;

        // 3. Dark overlay for stats section
        let overlayOpacity = 0;
        if (p >= enterOverlay - fadeRange && p <= enterOverlay) {
            overlayOpacity = (p - (enterOverlay - fadeRange)) / fadeRange;
        } else if (p > enterOverlay && p < leaveOverlay) {
            overlayOpacity = 0.9;
        } else if (p >= leaveOverlay && p <= leaveOverlay + fadeRange) {
            overlayOpacity = 0.9 * (1 - (p - leaveOverlay) / fadeRange);
        }
        if (overlay) overlay.style.opacity = overlayOpacity;
    }
});

// 4. Horizontal Text Marquee
document.querySelectorAll(".marquee-wrap").forEach(el => {
    const speed = parseFloat(el.dataset.scrollSpeed) || -25;

    gsap.to(el, {
        opacity: 1,
        scrollTrigger: {
            trigger: scrollContainer,
            start: "1% top",
            end: "5% top",
            scrub: true
        }
    });

    gsap.to(el.querySelector(".marquee-text"), {
        xPercent: speed,
        ease: "none",
        scrollTrigger: {
            trigger: scrollContainer,
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
});

// 5. Section Entrance Animations
document.querySelectorAll(".scroll-section").forEach(section => {
    const type = section.dataset.animation;
    const persist = section.dataset.persist === "true";
    const enter = parseFloat(section.dataset.enter) / 100;
    const leave = parseFloat(section.dataset.leave) / 100;

    section.style.top = `${((enter + leave) / 2) * 100}%`;

    const children = section.querySelectorAll(
        ".section-label, .section-heading, .section-body, .stat, .btn-glow"
    );

    const tl = gsap.timeline({ paused: true });

    switch (type) {
        case "fade-up":
            tl.from(children, { y: 50, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" });
            break;
        case "slide-left":
            tl.from(children, { x: -80, opacity: 0, stagger: 0.14, duration: 0.9, ease: "power3.out" });
            break;
        case "scale-up":
            tl.from(children, { scale: 0.85, opacity: 0, stagger: 0.12, duration: 1.0, ease: "power2.out" });
            break;
        case "stagger-up":
            tl.from(children, { y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" });
            break;
        case "clip-reveal":
            tl.from(children, { clipPath: "inset(100% 0 0 0)", opacity: 0, stagger: 0.15, duration: 1.2, ease: "power4.inOut" });
            break;
    }

    ScrollTrigger.create({
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
            const p = self.progress;
            if (p >= enter && p <= leave) {
                tl.play();
            } else if (p < enter) {
                tl.reverse();
            } else if (p > leave && !persist) {
                tl.reverse();
            }
        }
    });
});

// 6. Counter Animations
document.querySelectorAll(".stat-number").forEach((el, i) => {
    const target = parseFloat(el.dataset.value);
    const decimals = parseInt(el.dataset.decimals || "0");

    gsap.to(el, {
        textContent: target,
        duration: 2,
        delay: i * 0.2,
        ease: "power1.out",
        snap: { textContent: decimals === 0 ? 1 : 0.01 },
        scrollTrigger: {
            trigger: scrollContainer,
            start: () => `${enterOverlay * 100}% top`,
            toggleActions: "play none none reverse"
        }
    });
});
