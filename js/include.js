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
}


// Run the function when the page loads
loadIncludes();