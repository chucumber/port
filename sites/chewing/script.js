var isPickedUp = false;
var longPressTimer;
var longPressDuration = 800;

$(document).ready(function () {
  $("#drive").draggable({
    cursor: "grabbing",
    containment: "window",
    start: function (event, ui) {
      $(this).css("cursor", "grabbing");
      clearTimeout(longPressTimer); // Clear timer if dragging starts
    },
    stop: function (event, ui) {
      $(this).css("cursor", "grab");
    }
  });

  // long press for mobile
  $("#drive").on('touchstart', function (e) {
    e.preventDefault();

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    longPressTimer = setTimeout(function () {
      pickup();
    }, longPressDuration);
  });

  $("#drive").on('touchend touchcancel', function (e) {
    e.preventDefault();
    clearTimeout(longPressTimer);
    if (navigator.vibrate) {
      navigator.vibrate(0);
    }
  });

  // double-click for desktop
  $("#drive").dblclick(function (e) {
    pickup();
    e.preventDefault();
  });


  // Paragraphs navigation
  $('#next, #prev').on('click', function (e) {
    e.preventDefault();
    pIndex = index;

    if ($(this).attr('id') === 'next') {
      if (index < paragraphs.length - 1) {
        index++;
      } else {
        index = 0;
      }
    } else {
      if (index > 0) {
        index--;
      } else {
        index = paragraphs.length - 1;
      }
    }

    // Update page counter
    $('#page').text(`${index + 1} / ${paragraphs.length}`);
    updateParagraphs();

  });

  // Info button toggle
  $('#info_btn').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('#info').toggleClass('show');
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('#info, #info_btn').length) {
      $('#info_btn').removeClass('active');
      $('#info').removeClass('show');
    }
  });
});

function pickup() {
  if (isPickedUp) return;

  isPickedUp = true;
  alert("The flash drive was picked up from the ground.");
  document.getElementById("ground").style.opacity = "0";
  document.getElementById("content").style.display = "flex";
  document.getElementById("ground").style.cursor = "wait";
  document.getElementById("drive-icon").style.filter = "invert(100%)";
  document.getElementById("icon-label").style.backgroundColor = "rgba(170, 220, 245, 0.7)";

  setTimeout(function () {
    document.getElementById("ground").style.display = "none";
    document.getElementById("content").style.opacity = "1";
  }, 2000);
}

//chapter moving 

window.addEventListener('load', load);

var index = 0; //new project count
var pIndex; //previous project count

function load() {
  var textElements = document.querySelectorAll('.words');
  pIndex = textElements.length - 1;

  textElements.forEach(element => {
    // Preserve HTML tags like <sup>
    element.innerHTML = element.innerHTML.replace(/(?![^<]+>)([\w'-]+)(?![^<]+>)/g, '<span>$1</span>');
  });

  // Initialize page counter
  $('#page').text(`1 / ${document.getElementsByClassName('paragraph').length}`);
}

function addSpan(str) {
  if (!str || typeof str !== 'string') return '';

  return str.trim()
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(word => `<span>${word}</span>`)
    .join(' ');
}

var paragraphs = document.getElementsByClassName("paragraph");
function updateParagraphs() {

  paragraphs[index].classList.add("active");
  paragraphs[pIndex].classList.remove("active");
  paragraphs[pIndex].classList.add("disappear");

  setTimeout(function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}, 100);

  setTimeout(function () {
    paragraphs[pIndex].classList.remove("disappear");
  }, 1100);
}
