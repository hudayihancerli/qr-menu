const openMenu = () => {
    document.getElementById('navbar').style.width = "100vw";
    document.getElementById('navbar').style.height = "100vh";
}

const closeMenu = () => {
    document.getElementById('navbar').style.width = "0";
}

// scroll top
var mybutton = document.getElementById("myBtn");

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};