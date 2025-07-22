function releaseThoughts() {
    const textarea = document.querySelector("textarea");
    const released = document.getElementById("released");
  
    released.innerText = "Your thoughts have been released. 💨";
    textarea.value = "";
  
    // Add animation or fading effect here
  }

