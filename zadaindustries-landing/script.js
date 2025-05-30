// script.js – Zada Industries Landing Page

document.addEventListener("DOMContentLoaded", () => {
// 1) Fade-in for main container
const main = document.querySelector(".landing-container");
if (main) {
    main.style.opacity = "0";
    main.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => (main.style.opacity = "1"), 100);
}

// 2) Typewriter effect
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

// 3) Dark mode toggle
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

// 4) Logo click-to-cycle
const logo = document.getElementById("logo");
if (logo) {
    const frames = [
    "images/logo1.png",
    "images/logo2.png",
    "images/logo3.png",
    "images/logo4.png"
    ];
    let idx = 0;
    logo.style.cursor = "pointer";
    logo.style.transition = "opacity 0.3s ease-in-out";

    logo.addEventListener("click", () => {
    // fade out
    logo.style.opacity = "0";
    setTimeout(() => {
        idx = (idx + 1) % frames.length;
        logo.src = frames[idx];
        // fade back in
        logo.style.opacity = "1";
    }, 100);
    });
}
});
