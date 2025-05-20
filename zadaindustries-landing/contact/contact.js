document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");
    const feedback = document.querySelector(".feedback");
  
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
  });
  