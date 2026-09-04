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

exploreButton.addEventListener(
    "click",
    function () {

        const servicesSection =
            document.getElementById("services");


        servicesSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


// =============================================
// LEARN MORE
// =============================================

learnMoreButton.addEventListener(
    "click",
    function () {

        console.log("Learn More clicked");

    }
);

