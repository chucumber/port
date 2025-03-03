var isPickedUp = false;
var longPressTimer;
var longPressDuration = 1000; // 1 second for long press

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

  // Add touch event listeners for long press
  $("#drive").on('touchstart', function(e) {
    e.preventDefault();
    longPressTimer = setTimeout(function() {
      pickup();
    }, longPressDuration);
  });

  $("#drive").on('touchend touchcancel', function(e) {
    e.preventDefault();
    clearTimeout(longPressTimer);
  });

  // Keep existing double-click for desktop
  $("#drive").dblclick(function(e) {
    pickup();
    e.preventDefault();
  });

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
// window.addEventListener('wheel',throttle(scroll,2000));


var index=0; //new project count
var pIndex; //previous project count

function load() {
  var textElements = document.querySelectorAll('.words:not(.page)');
  var pageElements = document.getElementsByClassName("page");
  pIndex = textElements.length - 1;
  
  // Process main text paragraphs
  textElements.forEach(element => {
    let textContent = element.textContent;
    element.innerHTML = addSpan(textContent);
  });

  // Handle page numbers with spans
  Array.from(pageElements).forEach((page, pageIndex) => {
    let text = page.textContent.trim();
    let parts = text.split(/(\d+)\s*\/\s*(\d+)/).filter(part => part.trim());
    
    let newHTML = '';
    parts.forEach((part, i) => {
      if (i === 0) { // First number
        newHTML += `<span>${part}</span><span>&ensp;/&ensp;</span>`;
      } else if (i === 1) { // Second number
        newHTML += `<span>${part}</span><span>&ensp;</span>`;
      }
    });
    
    const linkText = pageIndex === pageElements.length - 1 ? 'recollect' : 'continue';
    newHTML += `<span>-</span>&ensp;<span>[</span><span><a class="next">${linkText}</a></span><span>]</span>`;
    page.innerHTML = newHTML;
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
