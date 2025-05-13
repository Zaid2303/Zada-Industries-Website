// script.js
document.addEventListener("DOMContentLoaded", function() {
    const mainContainer = document.querySelector(".main-container");
    mainContainer.style.opacity = "0";
    mainContainer.style.transition = "opacity 1s ease-in-out";

    setTimeout(() => {
        mainContainer.style.opacity = "1";
    }, 100);
});
