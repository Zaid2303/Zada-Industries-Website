// This is a re‑implementation of the Let It Out chat logic with added
// instructional overlay and detailed comments.  The goal of this file is
// to provide a gentle, guided experience for the user to express
// themselves.  The overlay gives context and disappears once the user
// begins typing their first message.

document.addEventListener('DOMContentLoaded', () => {
  /*
   * Grabbing references to various DOM elements.  Many of the IDs used
   * throughout the site exist in two forms (camelCase and hyphenated)
   * because the markup has evolved over time.  To be robust against
   * naming differences we attempt to retrieve both variations.
   */
  const chatContainer = document.getElementById('chat-container') ||
                        document.getElementById('chatContainer');
  const userInput     = document.getElementById('user-input') ||
                        document.getElementById('userInput');
  const sendBtn       = document.getElementById('send-btn') ||
                        document.getElementById('sendBtn');
  const releaseBtn    = document.getElementById('release-btn') ||
                        document.getElementById('releaseBtn');
  const releaseContainer = document.getElementById('release-container') ||
                           document.getElementById('releaseContainer');
  const inputContainer   = document.querySelector('.input-container') ||
                           document.getElementById('inputContainer');
  const app = document.getElementById('app');

  // Layout adjustments so the chat fills the viewport nicely.  This is
  // important when embedding the chat inside another page.
  if (app) {
    app.style.display       = 'flex';
    app.style.flexDirection = 'column';
    app.style.height        = '100vh';
  }
  if (chatContainer) {
    chatContainer.style.flex       = '1';
    chatContainer.style.overflowY  = 'auto';
    chatContainer.style.maxHeight  = '70vh';
  }
  if (inputContainer) {
    // Keep the input stuck to the bottom when the user scrolls.
    inputContainer.style.position       = 'sticky';
    inputContainer.style.bottom         = '0';
    inputContainer.style.width          = '100%';
    inputContainer.style.backgroundColor= '#fff';
    inputContainer.style.padding        = '1rem';
    inputContainer.style.borderTop      = '1px solid #ddd';
  }
  if (userInput) {
    userInput.style.fontSize  = '1rem';
    userInput.style.padding   = '0.75rem';
  }
  if (sendBtn) {
    sendBtn.style.fontSize = '1rem';
    sendBtn.style.padding  = '0.75rem 1rem';
  }
  if (releaseBtn) {
    releaseBtn.style.fontSize = '1.2rem';
    releaseBtn.style.padding  = '1rem';
    // Hide the release button initially; it appears only after venting.
    releaseBtn.style.display  = 'none';
  }
  // Ensure the release container is hidden until needed.
  if (releaseContainer) {
    releaseContainer.style.display = 'none';
  }

  /*
   * Create an instructional overlay.  This overlay sits on top of
   * everything else and contains welcoming text and guidance.  It
   * disappears after the user responds to the first prompt.  Inline
   * styles are used for brevity; in a production system these would
   * likely live in a dedicated CSS file.
   */
  const instructionsOverlay = document.createElement('div');
  instructionsOverlay.id = 'instructions-overlay';
  instructionsOverlay.style.position = 'fixed';
  instructionsOverlay.style.top      = '0';
  instructionsOverlay.style.left     = '0';
  instructionsOverlay.style.width    = '100%';
  instructionsOverlay.style.height   = '100%';
  instructionsOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
  instructionsOverlay.style.display  = 'flex';
  instructionsOverlay.style.flexDirection = 'column';
  instructionsOverlay.style.alignItems    = 'center';
  instructionsOverlay.style.justifyContent= 'center';
  instructionsOverlay.style.padding  = '20px';
  instructionsOverlay.style.zIndex   = '999';
  instructionsOverlay.innerHTML = `
    <h2 style="margin-bottom: 1rem;">Welcome to Let&nbsp;It&nbsp;Out</h2>
    <p style="max-width: 600px; text-align: center; margin-bottom: 1rem;">
      This is a safe space where you can talk freely.  Follow the prompts
      from the chat bot and let your thoughts flow.  When you're ready,
      start typing below and these instructions will gently fade away.
    </p>
    <p style="max-width: 600px; text-align: center; font-size: 0.9rem;">
      Note: Your messages are not stored.  If you need urgent help,
      please contact local support services.
    </p>
  `;
  // Make the overlay ignore pointer events so underlying inputs remain interactive.
  instructionsOverlay.style.pointerEvents = 'none';
  document.body.appendChild(instructionsOverlay);

  // Function to hide the instructional overlay.  Called when the
  // conversation begins.
  function hideInstructions() {
    const overlay = document.getElementById('instructions-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  }

  // Chat prompts.  Each entry either contains a plain string (question) or
  // an object with `message` and `placeholder` to customise the input.
  const prompts = [
    { message: "Hey I'm L.O... what's your name?", placeholder: 'Your name' },
    { message: 'How are you feeling today?',         placeholder: 'Feeling description' },
    { message: "What's something that made you smile recently?", placeholder: 'Recent happy memory' },
    { message: "Is there anything that's been bothering you?",  placeholder: 'Something on your mind' },
    { message: 'Okay, now tell me everything—just let it all out.' }
  ];
  let stage    = 0;
  let ventText = '';
  let userName = '';

  /**
   * Simulates typing by gradually revealing characters.  This helper
   * function appends a bubble to the chat with a bot message.  It
   * automatically scrolls the chat container so the latest message is
   * visible.
   * @param {string} text The full message to display.
   */
  function typeMessage(text) {
    const msgDiv  = document.createElement('div');
    msgDiv.classList.add('message', 'bot');
    const bubble  = document.createElement('div');
    bubble.classList.add('bubble');
    msgDiv.appendChild(bubble);
    if (chatContainer) chatContainer.appendChild(msgDiv);
    let i = 0;
    const interval = setInterval(() => {
      bubble.textContent += text[i];
      if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 25);
  }

  /**
   * Appends a user message to the chat.  This does not animate
   * character by character since user messages appear instantly.
   * @param {string} text The user’s input.
   */
  function appendUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', 'user');
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.textContent = text;
    msgDiv.appendChild(bubble);
    if (chatContainer) {
      chatContainer.appendChild(msgDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  /**
   * Checks a message for certain high‑risk phrases.  If found, the
   * dangerous word is returned.  Otherwise null is returned.
   * @param {string} text The text to analyse.
   * @returns {string|null} The dangerous phrase if matched.
   */
  function checkDanger(text) {
    const dangerWords = ['kill myself', 'suicide', 'self harm', 'end my life', 'die', 'harm myself'];
    const lower = text.toLowerCase();
    for (const w of dangerWords) {
      if (lower.includes(w)) return w;
    }
    return null;
  }

  /**
   * Sends the next prompt based on the stage of the conversation.  If
   * there are no more prompts it means we are in the venting stage and
   * the user can continue typing freely.
   */
  function askNextPrompt() {
    if (stage < prompts.length) {
      const current = prompts[stage];
      // If the prompt provides a placeholder, update the input box.
      if (userInput && current.placeholder) {
        userInput.placeholder = current.placeholder;
      }
      typeMessage(current.message);
    }
  }

  // Kick off the conversation.
  askNextPrompt();

  /**
   * Handles user input and advances the conversation through its
   * different stages.  During the first user response it hides the
   * instructions overlay.  After the predefined prompts are done, all
   * subsequent input is collected into `ventText` until the user clicks
   * the release button.
   */
  function handleEnhancedInput() {
    if (!userInput) return;
    const text = userInput.value.trim();
    if (!text) return;
    appendUserMessage(text);
    userInput.value = '';
    if (stage === 0) {
      // Capture the user's name and greet them.  Also hide the overlay.
      userName = text.split(' ')[0];
      hideInstructions();
      stage++;
      typeMessage(`Nice to meet you, ${userName}.`);
      setTimeout(askNextPrompt, 800);
    } else if (stage === 1) {
      stage++;
      setTimeout(askNextPrompt, 300);
    } else if (stage === 2) {
      stage++;
      setTimeout(askNextPrompt, 300);
    } else if (stage === 3) {
      stage++;
      setTimeout(askNextPrompt, 300);
    } else {
      // Venting stage: accumulate the text.
      ventText = ventText ? `${ventText} ${text}` : text;
      // Check for dangerous content.
      const danger = checkDanger(text);
      if (danger) {
        typeMessage(`It seems you've mentioned \"${danger}\". Please consider talking to a professional if you're in distress.`);
        alert(`I noticed you mentioned \"${danger}\". Please consider talking to a professional if you're in distress.`);
      } else {
        typeMessage('Thanks for sharing.');
      }
      // Show the release container and hide send button so the user can
      // release their feelings when ready.
      if (releaseContainer) releaseContainer.style.display = 'block';
      if (releaseBtn) releaseBtn.style.display = 'block';
      if (sendBtn) sendBtn.style.display = 'none';
    }
  }

  // Attach event listeners to handle sending messages.
  if (sendBtn) {
    sendBtn.addEventListener('click', handleEnhancedInput);
  }
  if (userInput) {
    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleEnhancedInput();
      }
    });
  }

  // When the release button is clicked we clear the chat and show a
  // supportive message.  We also add a simple back button to return to
  // the main page (index.html).
  if (releaseBtn) {
    releaseBtn.addEventListener('click', () => {
      // Hide input and release controls.
      if (releaseContainer) releaseContainer.style.display = 'none';
      if (inputContainer) inputContainer.style.display = 'none';
      // Remove existing messages.
      if (chatContainer) chatContainer.innerHTML = '';
      typeMessage('Thank you for sharing. You’re stronger than you know. Remember to seek help if you feel overwhelmed.');
      // Create a back button to return to home.
      const backBtn = document.createElement('button');
      backBtn.textContent = 'Back Home';
      backBtn.style.marginTop = '1rem';
      backBtn.style.padding   = '1rem';
      backBtn.style.fontSize  = '1rem';
      backBtn.style.cursor    = 'pointer';
      backBtn.addEventListener('click', () => {
        window.location.href = '../index.html';
      });
      const msgDiv = document.createElement('div');
      msgDiv.style.textAlign = 'center';
      msgDiv.appendChild(backBtn);
      if (chatContainer) chatContainer.appendChild(msgDiv);
    });
  }
});