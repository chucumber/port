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


