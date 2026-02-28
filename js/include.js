async function loadIncludes() {
    // Find every element that has a data-include attribute
    const targets = document.querySelectorAll("[data-include]");


    for (const el of targets) {
        // Get the file path from the data-include attribute
        const filePath = el.getAttribute("data-include");


        // Ask the browser to fetch (load) that file
        const response = await fetch(filePath);


        // Turn the response into text (HTML code)
        const html = await response.text();


            // Put the HTML inside this element
        el.innerHTML = html;
    }

    // Once all includes are injected the nav links exist in the DOM,
    // so we can safely determine and mark the current page.
    // adjust URLs for GitHub Pages vs local dev
    adjustNavLinks();

    setActiveNav();
}

function adjustNavLinks() {
    // Determine if we're hosted on GitHub Pages under a project path
    const repoPrefix = '/my-first-website';
    const isGitHub = location.hostname.includes('github.io');

    // select all relevant header/footer links (logo + nav + footer)
    const links = document.querySelectorAll('header a, .nav-links a, footer a');

    links.forEach((link) => {
        let href = link.getAttribute('href');
        if (!href) return;

        if (isGitHub) {
            // ensure prefix is applied exactly once
            if (href.startsWith('/') && !href.startsWith(repoPrefix + '/')) {
                // avoid adding prefix to external URLs starting with http
                if (!href.startsWith('//')) {
                    link.setAttribute('href', repoPrefix + href);
                }
            }
        } else {
            // local environment: strip prefix if present
            if (href.startsWith(repoPrefix + '/')) {
                link.setAttribute('href', href.slice(repoPrefix.length));
            }
        }
    });
}

function setActiveNav() {
    // 1) Get the current page from the URL path.
    // Example: /pages/about.html -> about.html
    let currentPage = window.location.pathname.split("/").pop();


    // If there is no file name in the path, treat it as index.html
    if (!currentPage) {
        currentPage = "index.html";
    }


    // Remove any query string (?x=1) or hash (#section), just in case
    currentPage = currentPage.split("?")[0].split("#")[0];


    // 2) Get all links in the navigation
    const links = document.querySelectorAll(".nav-links a");


    // 3) Compare each link file name with the current page
    links.forEach((link) => {
        // Get the link target from href
        const href = link.getAttribute("href") || "";


        // Example: ../pages/about.html -> about.html
        let linkPage = href.split("/").pop() || "";


        // Remove query/hash from the link too
        linkPage = linkPage.split("?")[0].split("#")[0];


        // Clear old active states first
        link.classList.remove("active");


        // If this link matches the current page, highlight it
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
}


// Run the function when the page loads
loadIncludes();