// script.js - Zada Industries Landing Page

document.addEventListener("DOMContentLoaded", function() {
    // Fade-in animation for the main landing container
    const mainContainer = document.querySelector(".landing-container");
    if (mainContainer) {
        mainContainer.style.opacity = "0";
        mainContainer.style.transition = "opacity 1s ease-in-out";
        setTimeout(() => {
            mainContainer.style.opacity = "1";
        }, 100);
    }

    // Dark mode toggle functionality
    const toggleBtn = document.querySelector(".theme-toggle");
    if (toggleBtn) {
        // Load saved theme or use system preference
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

        if (currentTheme === "dark") {
            document.body.classList.add("dark-mode");
        }
        toggleBtn.textContent = currentTheme === "dark" ? "Light Mode" : "Dark Mode";

        // Toggle on button click
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const newTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            toggleBtn.textContent = newTheme === "dark" ? "Light Mode" : "Dark Mode";
        });
    }
});
