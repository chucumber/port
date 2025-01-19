// close iframe
window.addEventListener("message", (event) => {
    if (event.data === "closeIframe") {
        iframe.style.display = "none";
    }
});

document.getElementById("close-btn").addEventListener("click", () => {
    // Send a message to the parent page to close the iframe
    window.parent.postMessage("closeIframe", "*");
});

// navigate corridor
const corridorImages = document.querySelectorAll(".corridor-image");
const imageCounter = document.getElementById("image-counter");

let current = 0;

function updateImageCounter() {
    // Update the counter text
    imageCounter.textContent = `[${current + 1}/${corridorImages.length}]`;
}

function nextStep() {
    corridorImages[current].classList.remove("active");
    current = (current + 1) % corridorImages.length;
    corridorImages[current].classList.add("active");

    updateImageCounter();
}

updateImageCounter();

document.getElementById("corridor").addEventListener("click", nextStep);
