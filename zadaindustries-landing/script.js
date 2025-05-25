// script.js - Zada Industries Landing Page

document.addEventListener("DOMContentLoaded", () => {
    // Fade-in for main container
    const main = document.querySelector(".landing-container");
    if (main) {
      main.style.opacity = "0";
      main.style.transition = "opacity 1s ease-in-out";
      setTimeout(() => (main.style.opacity = "1"), 100);
    }
  
    // Typewriter effect for the tagline
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
      setTimeout(type, 1000);
    }
  
    // Dark mode toggle
    const btn = document.querySelector(".theme-toggle");
    if (btn) {
      const saved = localStorage.getItem("theme");
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      let theme = saved || (prefers ? "dark" : "light");
      document.body.classList.toggle("dark-mode", theme === "dark");
      btn.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
  
      btn.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        btn.textContent = isDark ? "Light Mode" : "Dark Mode";
      });
    }
  });
  