// contact.js - Zada Industries Contact Us Page

document.addEventListener("DOMContentLoaded", () => {
// Fade-in animation for the contact container
const contactContainer = document.querySelector(".contact-container");
if (contactContainer) {
    contactContainer.style.opacity = "0";
    contactContainer.style.transition = "opacity 0.8s ease-in-out";
    setTimeout(() => {
    contactContainer.style.opacity = "1";
    }, 100);
}

// Initialize theme based on saved preference or system
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const currentTheme = savedTheme || (prefersDark ? "dark" : "light");
document.body.classList.toggle("dark-mode", currentTheme === "dark");

// Back button logic
const backBtn = document.querySelector(".back-button");
if (backBtn) {
    backBtn.addEventListener("click", () => {
    history.back();
    });
}

// Form submission via Formspree
const form = document.querySelector(".contact-form");
const feedback = document.querySelector(".feedback");
if (form) {
    form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
        const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
            Accept: "application/json",
        },
        });

        if (res.ok) {
        feedback.style.color = "green";
        feedback.textContent = "Message sent successfully!";
        form.reset();
        } else {
        const data = await res.json();
        feedback.style.color = "red";
        feedback.textContent = data?.errors?.[0]?.message || "Something went wrong.";
        }
    } catch (err) {
        feedback.style.color = "red";
        feedback.textContent = "Failed to send. Please check your connection.";
    }
    });
}
});
