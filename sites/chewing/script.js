var isPickedUp = false;
var longPressTimer;
var longPressDuration = 800; 

$(document).ready(function() {
  $("#drive").draggable({
    cursor: "grabbing",
    containment: "window",
    start: function(event, ui) {
      $(this).css("cursor", "grabbing");
      clearTimeout(longPressTimer); // Clear timer if dragging starts
    },
    stop: function(event, ui) {
      $(this).css("cursor", "grab");
    }
  });

    // long press for mobile
    $("#drive").on('touchstart', function(e) {
      e.preventDefault();

      if (navigator.vibrate) {
        navigator.vibrate(50);
      }

      longPressTimer = setTimeout(function() {
        pickup();
      }, longPressDuration);
    });

  $("#drive").on('touchend touchcancel', function(e) {
    e.preventDefault();
    clearTimeout(longPressTimer);
    if (navigator.vibrate) {
      navigator.vibrate(0); 
    }
  });

  // double-click for desktop
  $("#drive").dblclick(function(e) {
    pickup();
    e.preventDefault();
  });


  // chapter moving

  $(document).on('click', '.next', function(e) {
    e.preventDefault();
    pIndex = index;
    if (index < paragraphs.length - 1) {
        index++;
    } else {
        index = 0;
    }
    updateParagraphs();
});

});

function pickup() {
    if (isPickedUp) return;
    
    isPickedUp = true;
    alert("The flash drive was picked up from the ground.");
    document.getElementById("ground").style.opacity = "0";
    document.getElementById("ground").style.cursor = "wait";
    document.getElementById("content").style.display = "block";
    document.getElementById("drive-icon").style.filter = "invert(100%)";
    document.getElementById("icon-label").style.backgroundColor = "rgba(170, 220, 245, 0.7)";
}

//chapter moving 

window.addEventListener('load',load);

var index=0; //new project count
var pIndex; //previous project count

function load() {
  var textElements = document.querySelectorAll('.words');

  textElements.forEach(element => {
    // Preserve HTML tags like <sup>
    element.innerHTML = element.innerHTML.replace(/(?![^<]+>)([\w'-]+)(?![^<]+>)/g, '<span>$1</span>');
  });
}

function addSpan(str) {
  if (!str || typeof str !== 'string') return '';
  
  return str.trim()
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(word => `<span>${word}</span>`)
    .join(' ');
}

var paragraphs=document.getElementsByClassName("paragraph");
function updateParagraphs() {
  
  paragraphs[index].classList.add("active");
  paragraphs[pIndex].classList.remove("active");
  paragraphs[pIndex].classList.add("disappear");
  setTimeout(function() {
      paragraphs[pIndex].classList.remove("disappear");
  }, 1100);
}
