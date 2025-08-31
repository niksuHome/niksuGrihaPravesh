// Carousel Autoscroll with manual override and pause on hover/touch
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

let autoScroll = setInterval(next, 3000);
const pauseAutoscroll = () => clearInterval(autoScroll);
const resumeAutoscroll = () => autoScroll = setInterval(next, 3000);

track.addEventListener('mouseenter', pauseAutoscroll);
track.addEventListener('mouseleave', resumeAutoscroll);
track.addEventListener('touchstart', pauseAutoscroll);
track.addEventListener('touchend', resumeAutoscroll);

rightBtn.onclick = next;
leftBtn.onclick = prev;

let startX = 0;
track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
track.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) prev();
  else if (startX - endX > 50) next();
});

show(idx);

// Music toggle
// Elements
const music = document.getElementById("bg-music");
const musicVideo = document.getElementById("bg-music-video");
const toggle = document.getElementById("music-toggle");

// Show button only when music is actually playing
function showToggle() {
  toggle.style.display = "inline-flex"; // match CSS flex centering
}

// Try autoplay immediately (for browsers that allow it)
function tryPlay() {
  music.play().then(() => {
    music.muted = false;
    toggle.textContent = "🔇"; // playing sound
    showToggle();
  }).catch(() => {
    console.log("Autoplay blocked ❌ waiting for user interaction...");
    document.body.addEventListener("click", () => {
      music.play();
      music.muted = false;
      toggle.textContent = "🔇";
      showToggle();
    }, { once: true });
  });
}

// iOS Safari fallback: use hidden video as audio source
function iosHack() {
  musicVideo.play().then(() => {
    music.src = musicVideo.querySelector("source").src;
    music.play();
    music.muted = false;
    toggle.textContent = "🔇";
    showToggle();
  }).catch(() => {
    console.log("iOS video autoplay also blocked, waiting for user...");
    document.body.addEventListener("click", () => {
      musicVideo.play();
      music.src = musicVideo.querySelector("source").src;
      music.play();
      music.muted = false;
      toggle.textContent = "🔇";
      showToggle();
    }, { once: true });
  });
}

// Run both methods
tryPlay();
iosHack();

// Toggle button
toggle.addEventListener("click", () => {
  if (music.muted) {
    music.muted = false;
    music.play();
    toggle.textContent = "🔇";  // sound ON
  } else {
    music.muted = true;
    toggle.textContent = "🔊";  // sound OFF
  }
});
