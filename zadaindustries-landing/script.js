let currentCard = 1;
const totalCards = 3;

function showCard(index) {
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.style.transform = `translateX(-${index * 100}vw)`;
    currentCard = index;
  }
}

function nextCard() {
  showCard((currentCard + 1) % totalCards);
}

function prevCard() {
  showCard((currentCard - 1 + totalCards) % totalCards);
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", () => {
  // Typewriter effect
  const sub = document.querySelector(".subtext");
  if (sub) {
    const full = sub.textContent;
    sub.textContent = "";
    let i = 0;
    function type() {
      if (i < full.length) {
        sub.textContent += full.charAt(i++);
        setTimeout(type, 50);
      } else {
        sub.style.borderRight = "none";
      }
    }
    setTimeout(type, 500);
  }

  // Dark mode on load
  const saved = localStorage.getItem("theme");
  const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefers ? "dark" : "light");
  document.body.classList.toggle("dark-mode", theme === "dark");
});
