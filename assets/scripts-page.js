function toggleDescription() {
    let details = document.getElementById("description");
    if (!details) return;

    if (window.innerWidth > 768) {
        details.setAttribute("open", "");
    } else {
        details.removeAttribute("open");
    }
}
toggleDescription();
window.addEventListener("resize", toggleDescription);