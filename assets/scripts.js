//when gallery is opened
const detailsElement = $("#gallery");

detailsElement.on("toggle", function () {
    if (this.open) {

        $("#about, #work").each(function () {
            this.open = false;
        });

        $("html, body").animate(
            {
                scrollTop: $("#undersea-gallery").offset().top,
            },
            2000
        );
    }
});

$("#back-to-top").on("click", function (e) {
    e.preventDefault();

    $("html, body").animate(
        {
            scrollTop: 0,
        },
        2000,
        function() {
            $("#gallery").prop("open", false);
        }
    );
});

//lightbox
const images = [
    "pages/slides/slides.png",
    "pages/slides/slides1.png",
    "pages/slides/slides2.png",
    "pages/slides/slides3.png",
    "pages/slides/slides4.png",
    "pages/slides/slides5.png",
    "pages/slides/slides6.png",
    "pages/slides/slides7.png",
    "pages/slides/slides8.png",
    "pages/slides/slides9.png",
    "pages/slides/slides10.png",
    "pages/slides/slides11.png",
    "pages/slides/slides12.png",
    "pages/slides/slides13.png",
    "pages/slides/slides14.png",
    "pages/slides/slides15.png",
    "pages/slides/slides16.png",
    "pages/slides/slides17.png",
    "pages/slides/slides18.png",
    "pages/slides/slides19.png",
    "pages/slides/slides20.png",
    "pages/slides/slides21.png",
    "pages/slides/slides22.png",
    "pages/slides/slides23.png",
    "pages/slides/slides24.png"
];

let currentIndex = 0;

const galleryImage = document.getElementById("slide");
const counter = document.getElementById("counter");

// counter
updateCounter();

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length; // Loop back to the first image
    galleryImage.src = images[currentIndex];
    updateCounter();
}

function updateCounter() {
    counter.textContent = `[${currentIndex + 1}/${images.length}]`;
}

//cursor follower in the undersea-gallery
$(document).ready(function () {
    var mouseX = 0, mouseY = 0;

    $("#undersea-gallery").on("mousemove", function (e) {
        $("#follower").show();

        var offset = $(this).offset();
        mouseX = e.pageX - offset.left;
        mouseY = e.pageY - offset.top;
    });

    $("#undersea-gallery").on("mouseleave", function () {
        $("#follower").hide();
    });

    $("#undersea-gallery img, #undersea-gallery a").on("mouseenter", function () {
        $("#follower").css("background-color", "#dedede");
    });
    $("#undersea-gallery img, #undersea-gallery a").on("mouseleave", function () {
        $("#follower").css("background-color", "transparent");
    });

    var follower = $("#follower");
    var xp = 0, yp = 0;

    var loop = function () {
        xp += (mouseX - xp) / 15;
        yp += (mouseY - yp) / 15;
        follower.css({ left: xp, top: yp });
        requestAnimationFrame(loop);
    };
    loop();
});

