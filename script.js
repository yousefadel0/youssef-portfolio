/* ============================================
   YOUSSEF ADEL — CINEMATIC PORTFOLIO
   GSAP Timeline Animation Architecture
   ============================================ */

(function () {
    "use strict";

    gsap.registerPlugin(ScrollTrigger);

    /* ── Device detection ── */
    const isMobile = window.innerWidth <= 768;
    const isSmallPhone = window.innerWidth <= 480;

    /* ── Lenis Smooth Scroll ── */
    const lenis = new Lenis({
        duration: isMobile ? 1.0 : 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: isMobile ? 1.0 : 0.8,
        touchMultiplier: 1.5,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    /* ── Custom Cursor ── */
    const cursor = document.getElementById("cursor");
    if (cursor && window.innerWidth > 768) {
        const dot = cursor.querySelector(".cursor-dot");
        const ring = cursor.querySelector(".cursor-ring");
        let cx = 0, cy = 0;
        let dx = 0, dy = 0;

        document.addEventListener("mousemove", (e) => {
            cx = e.clientX;
            cy = e.clientY;
            gsap.to(dot, { x: cx, y: cy, duration: 0.1, ease: "power2.out" });
        });

        gsap.ticker.add(() => {
            dx += (cx - dx) * 0.12;
            dy += (cy - dy) * 0.12;
            gsap.set(ring, { x: dx, y: dy });
        });

        const hoverTargets = document.querySelectorAll("a, button, .project-card, .service-card, .faq-header, .cta-btn");
        hoverTargets.forEach((el) => {
            el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
            el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
        });
    }

    /* ── Preloader ── */
    const preloader = document.getElementById("preloader");

    const preloaderTL = gsap.timeline({
        onComplete: () => {
            if (preloader) preloader.style.display = "none";
            initPageAnimations();
        },
    });

    preloaderTL
        .to(".preloader-text", {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
        })
        .to(
            ".preloader-text",
            {
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: "power2.in",
                delay: 0.6,
            }
        )
        .to(
            ".preloader-line",
            {
                scaleX: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            },
            "-=0.3"
        )
        .to(".preloader", {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
        });

    /* ── Page Animations ── */
    function initPageAnimations() {
        heroEntrance();
        scrollRevealHeadings();
        scrollRevealElements();
        parallaxElements();
        navBehavior();
        faqAccordion();
        menuToggle();
    }

    /* ── Hero Entrance Timeline ── */
    function heroEntrance() {
        const heroTL = gsap.timeline({ defaults: { ease: "power4.out" } });

        heroTL
            .to(".hero-bg-grid", {
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
            })
            .to(
                ".hero-line-inner",
                {
                    y: 0,
                    duration: 1.2,
                    stagger: 0.12,
                },
                "-=1.0"
            )
            .to(
                ".hero-tag",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.6"
            )
            .to(
                ".hero-sub",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.5"
            )
            .to(
                ".hero-scroll-indicator",
                {
                    opacity: 1,
                    duration: 0.8,
                },
                "-=0.3"
            );

        /* Hero parallax on scroll (reduced on mobile for performance) */
        gsap.to(".hero-content", {
            y: isMobile ? -50 : -120,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: isMobile ? 1.2 : 0.8,
            },
        });

        if (!isMobile) {
            gsap.to(".hero-bg-grid", {
                y: 60,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                },
            });
        }
    }

    /* ── Scroll Reveal: Section Headings (line-by-line) ── */
    function scrollRevealHeadings() {
        const headings = document.querySelectorAll(".section-heading");

        headings.forEach((heading) => {
            const lines = heading.querySelectorAll(".line-inner");
            if (lines.length === 0) return;

            gsap.to(lines, {
                y: 0,
                duration: isMobile ? 0.8 : 1.0,
                stagger: isMobile ? 0.08 : 0.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: heading,
                    start: isMobile ? "top 90%" : "top 82%",
                    toggleActions: "play none none none",
                },
            });
        });

        /* Contact heading */
        const contactHeading = document.querySelector(".contact-heading");
        if (contactHeading) {
            const contactLines = contactHeading.querySelectorAll(".line-inner");
            gsap.to(contactLines, {
                y: 0,
                duration: isMobile ? 0.8 : 1.0,
                stagger: isMobile ? 0.08 : 0.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: contactHeading,
                    start: isMobile ? "top 90%" : "top 82%",
                    toggleActions: "play none none none",
                },
            });
        }
    }

    /* ── Scroll Reveal: General Elements ── */
    function scrollRevealElements() {
        const reveals = document.querySelectorAll(".reveal-up");

        const revealStart = isMobile ? "top 92%" : "top 85%";

        reveals.forEach((el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: isMobile ? 0.7 : 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: revealStart,
                    toggleActions: "play none none none",
                },
            });
        });

        /* Stagger service cards */
        const serviceCards = document.querySelectorAll(".service-card");
        if (serviceCards.length) {
            gsap.to(serviceCards, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        }

        /* Stagger project cards */
        const projectCards = document.querySelectorAll(".project-card");
        if (projectCards.length) {
            gsap.to(projectCards, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".work-grid",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        }

        /* Section labels */
        const labels = document.querySelectorAll(".section-label");
        labels.forEach((label) => {
            gsap.from(label, {
                opacity: 0,
                x: -30,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: label,
                    start: "top 88%",
                    toggleActions: "play none none none",
                },
            });
        });

        /* Stats counter-like reveal */
        const stats = document.querySelectorAll(".stat");
        if (stats.length) {
            gsap.from(stats, {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-stats",
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        }

        /* Stagger campaign items */
        const campaignItems = document.querySelectorAll(".campaign-item");
        if (campaignItems.length) {
            gsap.to(campaignItems, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".campaign-grid",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        }

        /* Featured project card */
        const featuredCard = document.querySelector(".featured-card");
        if (featuredCard) {
            gsap.to(featuredCard, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: featuredCard,
                    start: "top 82%",
                    toggleActions: "play none none none",
                },
            });
        }
    }

    /* ── Parallax Micro-movements ── */
    function parallaxElements() {
        /* Marquee speed increase on scroll proximity */
        document.querySelectorAll(".marquee-section").forEach((section) => {
            gsap.to(section.querySelector(".marquee-track"), {
                x: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        });

        /* Subtle section bg parallax */
        document.querySelectorAll(".about, .work, .contact").forEach((sec) => {
            gsap.from(sec, {
                backgroundPosition: "50% 0%",
                ease: "none",
                scrollTrigger: {
                    trigger: sec,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });
    }

    /* ── Nav Behavior ── */
    function navBehavior() {
        /* Smooth anchor scroll via Lenis */
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute("href"));
                if (target) {
                    lenis.scrollTo(target, { offset: -80, duration: 1.5 });
                    /* Close mobile menu if open */
                    const overlay = document.getElementById("menu-overlay");
                    const btn = document.getElementById("menu-btn");
                    if (overlay && overlay.classList.contains("active")) {
                        overlay.classList.remove("active");
                        btn.classList.remove("active");
                        lenis.start();
                    }
                }
            });
        });
    }

    /* ── FAQ Accordion ── */
    function faqAccordion() {
        const items = document.querySelectorAll(".faq-item");

        items.forEach((item) => {
            const header = item.querySelector(".faq-header");
            header.addEventListener("click", () => {
                const isActive = item.classList.contains("active");

                /* Close all */
                items.forEach((i) => i.classList.remove("active"));

                /* Open clicked (if wasn't already open) */
                if (!isActive) {
                    item.classList.add("active");
                }
            });
        });
    }

    /* ── Mobile Menu Toggle ── */
    function menuToggle() {
        const btn = document.getElementById("menu-btn");
        const overlay = document.getElementById("menu-overlay");

        if (!btn || !overlay) return;

        btn.addEventListener("click", () => {
            const isOpen = overlay.classList.contains("active");
            btn.classList.toggle("active");
            overlay.classList.toggle("active");

            if (isOpen) {
                lenis.start();
            } else {
                lenis.stop();
            }
        });
    }
})();
/* script.js - تعديلات بسيطة لضمان عمل العناصر الجديدة */

(function () {
    "use strict";

    gsap.registerPlugin(ScrollTrigger);

    /* ── Device detection ── */
    const isMobile = window.innerWidth <= 768;
    const isSmallPhone = window.innerWidth <= 480;

    /* ── Lenis Smooth Scroll ── */
    const lenis = new Lenis({
        duration: isMobile ? 1.0 : 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: isMobile ? 1.0 : 0.8,
        touchMultiplier: 1.5,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    /* ── Custom Cursor ── */
    const cursor = document.getElementById("cursor");
    if (cursor && window.innerWidth > 768) {
        const dot = cursor.querySelector(".cursor-dot");
        const ring = cursor.querySelector(".cursor-ring");
        let cx = 0, cy = 0;
        let dx = 0, dy = 0;

        document.addEventListener("mousemove", (e) => {
            cx = e.clientX;
            cy = e.clientY;
            gsap.to(dot, { x: cx, y: cy, duration: 0.1, ease: "power2.out" });
        });

        gsap.ticker.add(() => {
            dx += (cx - dx) * 0.12;
            dy += (cy - dy) * 0.12;
            gsap.set(ring, { x: dx, y: dy });
        });

        const hoverTargets = document.querySelectorAll("a, button, .project-card, .service-card, .faq-header, .cta-btn, .tech-tag");
        hoverTargets.forEach((el) => {
            el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
            el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
        });
    }

    /* ── Preloader ── */
    const preloader = document.getElementById("preloader");

    const preloaderTL = gsap.timeline({
        onComplete: () => {
            if (preloader) preloader.style.display = "none";
            initPageAnimations();
        },
    });

    preloaderTL
        .to(".preloader-text", {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
        })
        .to(
            ".preloader-text",
            {
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: "power2.in",
                delay: 0.6,
            }
        )
        .to(
            ".preloader-line",
            {
                scaleX: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            },
            "-=0.3"
        )
        .to(".preloader", {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
        });

    /* ── Page Animations ── */
    function initPageAnimations() {
        heroEntrance();
        scrollRevealHeadings();
        scrollRevealElements();
        parallaxElements();
        navBehavior();
        faqAccordion();
        menuToggle();
        animateTechTags(); // إضافة جديدة
    }

    /* ── Hero Entrance Timeline ── */
    function heroEntrance() {
        const heroTL = gsap.timeline({ defaults: { ease: "power4.out" } });

        heroTL
            .to(".hero-bg-grid", {
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
            })
            .to(
                ".hero-line-inner",
                {
                    y: 0,
                    duration: 1.2,
                    stagger: 0.12,
                },
                "-=1.0"
            )
            .to(
                ".hero-tag",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.6"
            )
            .to(
                ".hero-sub",
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.5"
            )
            .to(
                ".hero-scroll-indicator",
                {
                    opacity: 1,
                    duration: 0.8,
                },
                "-=0.3"
            );

        gsap.to(".hero-content", {
            y: isMobile ? -50 : -120,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: isMobile ? 1.2 : 0.8,
            },
        });

        if (!isMobile) {
            gsap.to(".hero-bg-grid", {
                y: 60,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                },
            });
        }
    }

    /* ── Scroll Reveal: Section Headings (line-by-line) ── */
    function scrollRevealHeadings() {
        const headings = document.querySelectorAll(".section-heading");

        headings.forEach((heading) => {
            const lines = heading.querySelectorAll(".line-inner");
            if (lines.length === 0) return;

            gsap.to(lines, {
                y: 0,
                duration: isMobile ? 0.8 : 1.0,
                stagger: isMobile ? 0.08 : 0.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: heading,
                    start: isMobile ? "top 90%" : "top 82%",
                    toggleActions: "play none none none",
                },
            });
        });

        const contactHeading = document.querySelector(".contact-heading");
        if (contactHeading) {
            const contactLines = contactHeading.querySelectorAll(".line-inner");
            gsap.to(contactLines, {
                y: 0,
                duration: isMobile ? 0.8 : 1.0,
                stagger: isMobile ? 0.08 : 0.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: contactHeading,
                    start: isMobile ? "top 90%" : "top 82%",
                    toggleActions: "play none none none",
                },
            });
        }
    }

    /* ── Scroll Reveal: General Elements ── */
    function scrollRevealElements() {
        const reveals = document.querySelectorAll(".reveal-up");

        const revealStart = isMobile ? "top 92%" : "top 85%";

        reveals.forEach((el) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: isMobile ? 0.7 : 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: revealStart,
                    toggleActions: "play none none none",
                },
            });
        });

        const serviceCards = document.querySelectorAll(".service-card");
        if (serviceCards.length) {
            gsap.to(serviceCards, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        }

        const projectCards = document.querySelectorAll(".project-card");
        if (projectCards.length) {
            gsap.to(projectCards, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".work-grid",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        }

        const labels = document.querySelectorAll(".section-label");
        labels.forEach((label) => {
            gsap.from(label, {
                opacity: 0,
                x: -30,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: label,
                    start: "top 88%",
                    toggleActions: "play none none none",
                },
            });
        });

        const stats = document.querySelectorAll(".stat");
        if (stats.length) {
            gsap.from(stats, {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-stats",
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        }

        const campaignItems = document.querySelectorAll(".campaign-item");
        if (campaignItems.length) {
            gsap.to(campaignItems, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".campaign-grid",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        }

        const featuredCard = document.querySelector(".featured-card");
        if (featuredCard) {
            gsap.to(featuredCard, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: featuredCard,
                    start: "top 82%",
                    toggleActions: "play none none none",
                },
            });
        }

        // إضافة للـ tech-category
        const techCategories = document.querySelectorAll(".tech-category");
        if (techCategories.length) {
            gsap.to(techCategories, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".tech-stack",
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        }
    }

    /* ── Parallax Micro-movements ── */
    function parallaxElements() {
        document.querySelectorAll(".marquee-section").forEach((section) => {
            gsap.to(section.querySelector(".marquee-track"), {
                x: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        });

        document.querySelectorAll(".about, .work, .contact, .tech-stack").forEach((sec) => {
            gsap.from(sec, {
                backgroundPosition: "50% 0%",
                ease: "none",
                scrollTrigger: {
                    trigger: sec,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });
    }

    /* ── Nav Behavior ── */
    function navBehavior() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute("href"));
                if (target) {
                    lenis.scrollTo(target, { offset: -80, duration: 1.5 });
                    const overlay = document.getElementById("menu-overlay");
                    const btn = document.getElementById("menu-btn");
                    if (overlay && overlay.classList.contains("active")) {
                        overlay.classList.remove("active");
                        btn.classList.remove("active");
                        lenis.start();
                    }
                }
            });
        });
    }

    /* ── FAQ Accordion ── */
    function faqAccordion() {
        const items = document.querySelectorAll(".faq-item");

        items.forEach((item) => {
            const header = item.querySelector(".faq-header");
            header.addEventListener("click", () => {
                const isActive = item.classList.contains("active");

                items.forEach((i) => i.classList.remove("active"));

                if (!isActive) {
                    item.classList.add("active");
                }
            });
        });
    }

    /* ── Mobile Menu Toggle ── */
    function menuToggle() {
        const btn = document.getElementById("menu-btn");
        const overlay = document.getElementById("menu-overlay");

        if (!btn || !overlay) return;

        btn.addEventListener("click", () => {
            const isOpen = overlay.classList.contains("active");
            btn.classList.toggle("active");
            overlay.classList.toggle("active");

            if (isOpen) {
                lenis.start();
            } else {
                lenis.stop();
            }
        });
    }

    /* ── Animate Tech Tags (إضافة جديدة) ── */
    function animateTechTags() {
        const tags = document.querySelectorAll(".tech-tag");
        
        tags.forEach((tag, index) => {
            tag.addEventListener("mouseenter", () => {
                gsap.to(tag, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "back.out(0.5)"
                });
            });
            
            tag.addEventListener("mouseleave", () => {
                gsap.to(tag, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
    }

})();