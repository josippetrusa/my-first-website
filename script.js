document.addEventListener("DOMContentLoaded", () => {


    const steps = document.querySelectorAll(".story-step");
    const visuals = document.querySelectorAll(".visual");


    function setActiveVisual(visualNumber) {
        visuals.forEach(v => v.classList.remove("active"));


        const target = document.getElementById("visual-" + visualNumber);
        if (target) target.classList.add("active");
    }


    function onScroll() {
        const marker = window.scrollY + window.innerHeight * 0.5;


        steps.forEach(step => {
            const top = step.offsetTop;
            const bottom = top + step.offsetHeight;


            if (marker >= top && marker < bottom) {
                const visualNumber = step.getAttribute("data-visual");
                setActiveVisual(visualNumber);
            }
        });
    }


    window.addEventListener("scroll", onScroll);
    onScroll(); // run once at the start
});
