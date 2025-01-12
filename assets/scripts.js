$( function() {
    $( ".work-list" ).draggable();
    $( ".about" ).draggable();
} );

const p = document.getElementById('see-work');
const container = document.querySelector('.container');

container.addEventListener('scroll', () => {
    let scrollY = container.scrollTop; // Use container's scroll position

    p.style.transform = `translateX(${scrollY * 1}px) rotate(15deg)`; // 
});

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");

    slides.forEach(slide => {
        const randomDuration = (Math.random() * 5 + 20).toFixed(2); // Random duration between 4-7 seconds
        const randomDelay = (Math.random() * 4).toFixed(2);       // Random delay between 0-2 seconds

        slide.style.animationDuration = `${randomDuration}s`;
        slide.style.animationDelay = `${randomDelay}s`;
    });
});

