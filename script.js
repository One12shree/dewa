console.log("DEWA Vanilla JS application loaded");


// Keep the header navigation focused on the current page.
const header = document.querySelector("dda-header");

if (header) {
    const homeMenu = JSON.stringify([
        {
            label: "Home",
            active: "true",
            href: "./index.html"
        },
        {
            label: "Login",
            href: "./login.html"
        },
        {
            label: "Support",
            href: "./support.html"
        }
    ]);

    const homeSideMenu = JSON.stringify([
        {
            label: "Home",
            active: "true",
            href: "#",
            subMenu: []
        },
        {
            label: "Login",
            href: "./login.html",
            subMenu: []
        },
        {
            label: "Support",
            href: "./support.html",
            subMenu: []
        }
    ]);

    header.setAttribute("quick-links", homeMenu);
    header.setAttribute("side-menu-items", homeSideMenu);
    header.setAttribute("hide-other-menu", "true");
    header.setAttribute("other-menu-items", "[]");
}


// =============================================
// DOM ELEMENTS
// =============================================

const exploreButton =
    document.getElementById("exploreButton");


const learnMoreButton =
    document.getElementById("learnMoreButton");


// =============================================
// EXPLORE SERVICES
// =============================================

if (exploreButton) exploreButton.addEventListener(
    "click",
    function () {

        const servicesSection =
            document.getElementById("services");


        if (servicesSection) {
            servicesSection.scrollIntoView({
                behavior: "smooth"
            });
        }

    }
);


// =============================================
// LEARN MORE
// =============================================

if (learnMoreButton) learnMoreButton.addEventListener(
    "click",
    function () {

        console.log("Learn More clicked");

    }
);


// =============================================
// HOME HERO CONTROLS
// =============================================

const homeHero = document.querySelector(".m1-hero");
const heroSlides = Array.from(document.querySelectorAll(".m1-hero__carousel-slide"));
const heroDotItems = Array.from(document.querySelectorAll(".m1-hero .slick-dots li"));
const heroDots = heroDotItems.map((item) => item.querySelector("button"));
const heroPrevious = document.querySelector(".m1-hero__carousel-button--prev");
const heroNext = document.querySelector(".m1-hero__carousel-button--next");
const heroToggle = document.querySelector(".m1-hero__carousel-button-play-pause");
let activeHeroSlide = Math.max(0, heroSlides.findIndex((slide) => slide.classList.contains("is-active")));
let heroPaused = false;
let heroTimer;

function startHeroTimer() {
    window.clearInterval(heroTimer);
    if (heroPaused || heroSlides.length < 2) return;

    heroTimer = window.setInterval(function () {
        showHeroSlide(activeHeroSlide + 1, false);
    }, 3750);
}

function showHeroSlide(index, restartTimer = true) {
    if (!heroSlides.length) return;

    activeHeroSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach(function (slide, slideIndex) {
        const selected = slideIndex === activeHeroSlide;
        slide.classList.toggle("is-active", selected);
        slide.setAttribute("aria-hidden", String(!selected));
        slide.querySelectorAll("a, button").forEach(function (control) {
            control.tabIndex = selected ? 0 : -1;
        });
    });

    heroDotItems.forEach(function (item, dotIndex) {
        const selected = dotIndex === activeHeroSlide;
        item.classList.toggle("slick-active", selected);
        item.setAttribute("aria-selected", String(selected));
        if (selected) heroDots[dotIndex]?.setAttribute("aria-current", "true");
        else heroDots[dotIndex]?.removeAttribute("aria-current");
    });

    if (restartTimer) startHeroTimer();
}

heroDots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
        showHeroSlide(index);
    });
});

heroPrevious?.addEventListener("click", function () {
    showHeroSlide(activeHeroSlide - 1);
});

heroNext?.addEventListener("click", function () {
    showHeroSlide(activeHeroSlide + 1);
});

heroToggle?.addEventListener("click", function () {
    heroPaused = !heroPaused;
    heroToggle.setAttribute("aria-pressed", String(heroPaused));
    heroToggle.setAttribute("aria-label", heroPaused ? "Play" : "Pause");
    heroToggle.classList.toggle("m1-hero__carousel-button--pause", !heroPaused);
    heroToggle.classList.toggle("m1-hero__carousel-button--play", heroPaused);
    startHeroTimer();
});

homeHero?.addEventListener("mouseenter", function () {
    window.clearInterval(heroTimer);
});

homeHero?.addEventListener("mouseleave", startHeroTimer);

showHeroSlide(activeHeroSlide, false);
startHeroTimer();


// =============================================
// NEWS VIDEO
// =============================================

const newsVideoLink = document.querySelector(".m122-news--weekly_img");
const newsModal = document.querySelector(".m122-news--modal");
const newsModalClose = document.querySelector(".m122-news--modal_close");

function closeNewsModal() {
    if (!newsModal) return;

    newsModal.classList.remove("is-open");
    newsModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("news-modal-open");

    const videoFrame = newsModal.querySelector("iframe");
    if (videoFrame) videoFrame.src = videoFrame.src;
}

if (newsVideoLink && newsModal) {
    newsModal.setAttribute("role", "dialog");
    newsModal.setAttribute("aria-modal", "true");
    newsModal.setAttribute("aria-hidden", "true");

    newsVideoLink.addEventListener("click", function (event) {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

        event.preventDefault();
        newsModal.classList.add("is-open");
        newsModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("news-modal-open");
        newsModalClose?.focus();
    });

    newsModal.addEventListener("click", function (event) {
        if (event.target === newsModal) closeNewsModal();
    });
}

newsModalClose?.addEventListener("click", closeNewsModal);

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && newsModal?.classList.contains("is-open")) {
        closeNewsModal();
    }
});


// =============================================
// INITIATIVES CAROUSEL CONTROLS
// =============================================

const initiativesTrack = document.querySelector(".initiatives-track");
const initiativesPrevious = document.querySelector(".initiatives-prev");
const initiativesNext = document.querySelector(".initiatives-next");
const initiativeDots = Array.from(document.querySelectorAll(".initiatives-dots span"));

function scrollInitiatives(direction) {
    if (!initiativesTrack) return;

    const firstCard = initiativesTrack.querySelector(".initiative-card");
    const gap = 24;
    const distance = firstCard ? firstCard.getBoundingClientRect().width + gap : initiativesTrack.clientWidth;

    initiativesTrack.scrollBy({ left: direction * distance, behavior: "smooth" });
}

function updateInitiativesControls() {
    if (!initiativesTrack) return;

    const firstCard = initiativesTrack.querySelector(".initiative-card");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 24 : 1;
    const maxScroll = initiativesTrack.scrollWidth - initiativesTrack.clientWidth;
    const currentIndex = Math.max(0, Math.min(initiativeDots.length - 1, Math.round(initiativesTrack.scrollLeft / step)));

    if (initiativesPrevious) initiativesPrevious.disabled = initiativesTrack.scrollLeft <= 2;
    if (initiativesNext) initiativesNext.disabled = initiativesTrack.scrollLeft >= maxScroll - 2;

    initiativeDots.forEach(function (dot, index) {
        dot.classList.toggle("is-active", index === currentIndex);
    });
}

initiativesPrevious?.addEventListener("click", function () {
    scrollInitiatives(-1);
});

initiativesNext?.addEventListener("click", function () {
    scrollInitiatives(1);
});

initiativesTrack?.addEventListener("scroll", updateInitiativesControls, { passive: true });
window.addEventListener("resize", updateInitiativesControls);

function initializeInitiativesCarousel() {
    if (!initiativesTrack) return;

    initiativesTrack.scrollLeft = initiativesTrack.scrollWidth - initiativesTrack.clientWidth;
    updateInitiativesControls();
}

requestAnimationFrame(initializeInitiativesCarousel);
window.addEventListener("load", initializeInitiativesCarousel);
