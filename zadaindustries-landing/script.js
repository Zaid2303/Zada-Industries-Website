// script.js - Zada Industries Landing Page

document.addEventListener("DOMContentLoaded", function() {
    const mainContainer = document.querySelector(".main-container");
    mainContainer.style.opacity = "0";
    mainContainer.style.transition = "opacity 1s ease-in-out";

    setTimeout(() => {
        mainContainer.style.opacity = "1";
    }, 100);

    const socialLinks = document.querySelectorAll(".social-links a");

    socialLinks.forEach(link => {
        link.addEventListener("mouseenter", () => {
            link.styl...
}
