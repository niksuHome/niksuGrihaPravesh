// Simple horizontal carousel auto-scroll
const carousel = document.getElementById('carousel');
let scrollAmount = 0;
let scrollStep = 420; // match the image width

function autoScrollCarousel() {
  if (!carousel) return;
  scrollAmount += scrollStep;
  if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
    scrollAmount = 0;
  }
  carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
}

setInterval(autoScrollCarousel, 2500);