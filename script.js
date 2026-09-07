console.log("DEWA Vanilla JS application loaded");


// Keep the header navigation focused on the current page.
const header = document.querySelector("dda-header");

if (header) {
    const homeMenu = JSON.stringify([
        {
            headerMenuLabel: "Home",
            active: "true",
            url: "#"
        },
        {
            headerMenuLabel: "Login",
            url: "./login.html"
        },
        {
            headerMenuLabel: "Support",
            url: "./support.html"
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
