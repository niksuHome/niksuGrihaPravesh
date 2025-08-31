const track = document.getElementById('carousel-track');
const images = Array.from(track.children);
const leftBtn = document.getElementById('btn-left');
const rightBtn = document.getElementById('btn-right');
let idx = 0;

function show(idx) {
  track.style.transform = `translateX(-${idx * 100}vw)`;
}

function next() {
  idx = (idx + 1) % images.length;
  show(idx);
}

function prev() {
  idx = (idx - 1 + images.length) % images.length;
  show(idx);
}

// Auto-scroll every 3.5 seconds
let autoScroll = setInterval(next, 3500);

track.addEventListener('mouseenter', () => clearInterval(autoScroll));
track.addEventListener('mouseleave', () => autoScroll = setInterval(next, 3500));

rightBtn.onclick = next;
leftBtn.onclick = prev;

// Swipe Support
let startX = 0;
track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
track.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) prev();
  else if (startX - endX > 50) next();
});

show(idx);