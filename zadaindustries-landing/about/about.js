// about.js - Zada Industries About Page

document.addEventListener("DOMContentLoaded", () => {
    // 1. Apply saved/theme preference
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    document.body.classList.toggle("dark-mode", theme === "dark");
  
    // 2. Fade-in container
    const container = document.querySelector(".about-container");
    if (container) {
      container.style.opacity = "0";
      container.style.transition = "opacity 0.8s ease-in-out";
      setTimeout(() => (container.style.opacity = "1"), 100);
    }
  
    // 3. Back button
    const backBtn = document.querySelector(".back-button");
    if (backBtn) {
      backBtn.addEventListener("click", () => history.back());
    }
});
  