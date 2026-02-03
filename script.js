let scale = 1; // 👈 MUST be at top level
let slideIndex = 0;
let slideTimer;
let qi = 0;
const slides = document.querySelectorAll(".slide");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const popup = document.getElementById("lovePopup");
const music = document.getElementById("music");
const toggle = document.getElementById("themeToggle");
const quote = document.getElementById("quote");
const quotes = [
  "You are my today and all of my tomorrows 💕",
  "Every heartbeat whispers your name ❤️",
  "In your smile, I found my forever ✨",
  "Loving you is my favorite feeling 💖",
];

/* 💖 Floating Hearts Background */
const loveBg = document.querySelector(".love-bg");
const heartEmojis = ["❤️", "💖", "💕", "💘", "💗"];

function createFloatingHeart() {
  const heart = document.createElement("span");
  heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  const size = Math.random() * 18 + 14;
  heart.style.fontSize = size + "px";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 8 + 6 + "s";
  heart.style.animationDelay = Math.random() * 2 + "s";

  loveBg.appendChild(heart);

  setTimeout(() => heart.remove(), 14000);
}

/* continuous floating */
setInterval(createFloatingHeart, 600);

/* 😌 Angu tap / click heart reaction */
function heartBurst(x, y) {
  for (let i = 0; i < 6; i++) {
    const h = document.createElement("div");
    h.className = "tap-heart";
    h.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    h.style.left = x + (Math.random() * 40 - 20) + "px";
    h.style.top = y + (Math.random() * 40 - 20) + "px";

    document.body.appendChild(h);
    setTimeout(() => h.remove(), 900);
  }
}

/* desktop click */
document.addEventListener("click", (e) => {
  heartBurst(e.clientX, e.clientY);
});

/* mobile tap */
document.addEventListener(
  "touchstart",
  (e) => {
    const t = e.touches[0];
    heartBurst(t.clientX, t.clientY);
  },
  { passive: true },
);

/* DARK MODE */
toggle.onclick = () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
};

/* YES CLICK */
// yesBtn.onclick = () => {
//   scale = 1; // reset value
//   yesBtn.style.transform = `scale(${scale})`;

//   if (navigator.vibrate) navigator.vibrate([80, 60, 140]);
//   music.play().catch(() => {});
//   popup.classList.add("show");
//   startSlideshow();
//   confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
// };
/* 💍 Premium Proposal Reveal */
function yesClicked() {
  scale = 1; // reset value
  yesBtn.style.transform = `scale(${scale})`;
  if (navigator.vibrate) navigator.vibrate([120, 80, 160]);

  music.play().catch(() => {});
  popup.classList.add("show");
  startSlideshow();

  const ring = document.getElementById("ring");
  ring.classList.add("show");

  confetti({
    particleCount: 120,
    spread: 70,
    scalar: 0.8,
    origin: { y: 0.65 },
  });
}

/* NO RUN AWAY */
function moveNo() {
  const wrap = document.querySelector(".btn-wrap");
  const maxX = wrap.clientWidth - noBtn.offsetWidth;
  const maxY = wrap.clientHeight - noBtn.offsetHeight;

  const x = Math.random() * Math.max(0, maxX);
  const y = Math.random() * Math.max(0, maxY);

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
  noBtn.onmouseenter = moveNo;
  noBtn.ontouchstart = (e) => {
    e.preventDefault();
    moveNo();
  };
}

/* HEARTBEAT */
let beatInterval;
music.onplay = () => {
  beatInterval = setInterval(() => {
    document.querySelectorAll(".card").forEach((c) => {
      c.classList.add("beat");
      setTimeout(() => c.classList.remove("beat"), 500);
    });
  }, 520);
};

music.onpause = () => clearInterval(beatInterval);

/* SLIDESHOW */

function startSlideshow() {
  clearInterval(slideTimer);
  slideIndex = 0;
  slides.forEach((s, i) => s.classList.toggle("active", i === 0));

  slideTimer = setInterval(() => {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
  }, 2500);
}
/* quotes */

setInterval(() => {
  quote.classList.remove("show");
  setTimeout(() => {
    quote.innerText = quotes[++qi % quotes.length];
    quote.classList.add("show");
  }, 600);
}, 4000);

function stopSlideshow() {
  clearInterval(slideTimer);
}

function noClicked() {
  scale = Math.min(scale + 0.1);
  console.log(scale, "scale");
  yesBtn.style.transform = `scale(${scale} )`;
}
function closePopup() {
  popup.classList.remove("show");
  stopSlideshow();

  scale = 1.2; // reset value
  yesBtn.style.transform = `scale(${scale})`;
}
