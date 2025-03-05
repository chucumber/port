function initializeDescription() {
    let details = document.getElementById("description");
    if (!details) return;

    if (!details.hasAttribute("data-user-clicked")) {
        if (window.innerWidth > 768) {
            details.setAttribute("open", "");
        } else {
            details.removeAttribute("open");
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let details = document.getElementById("description");
    if (!details) return;

    details.addEventListener("click", function() {
        this.setAttribute("data-user-clicked", "true");
    });
});

initializeDescription();
window.addEventListener("resize", initializeDescription);