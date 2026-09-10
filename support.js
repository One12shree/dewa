async function inheritHomepageFooter() {
    try {
        const response = await fetch('./index.html', { cache: 'no-store' });
        if (!response.ok) return;

        const homepage = new DOMParser().parseFromString(await response.text(), 'text/html');
        const homepageFooter = homepage.querySelector('.site-footer');
        const homepageDock = homepage.querySelector('.m13-footer--floating_inner');
        const currentFooter = document.querySelector('.support-footer');
        const currentDock = document.querySelector('.support-dock');

        if (homepageFooter && currentFooter) currentFooter.replaceWith(homepageFooter);
        if (homepageDock && currentDock) currentDock.replaceWith(homepageDock);
    } catch (error) {
        console.warn('Homepage footer could not be loaded.');
    }
}

inheritHomepageFooter();

document.getElementById('hayakSupportCard').addEventListener('click', (event) => {
    event.preventDefault();
});

document.getElementById('contactDetailsButton').addEventListener('click', () => {
    window.location.href = 'https://www.dewa.gov.ae/about-us/support-and-points-of-interest/contact-us';
});

document.getElementById('serviceGuideButton').addEventListener('click', () => {
    window.location.href = 'https://www.dewa.gov.ae/about-us/service-guide/consumer-services';
});
