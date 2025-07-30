document.addEventListener('DOMContentLoaded', () => {
const chatContainer = document.getElementById('chatContainer') || document.getElementById('chat-container');
const userInput = document.getElementById('userInput') || document.getElementById('user-input');
  const sendBtn = document.getElementById('sendBtn') || document.getElementById('send-btn');
  const releaseContainer = document.getElementById('releaseContainer') || document.getElementById('release-container');
const inputContainer = document.querySelector('.input-container') || document.getElementById('inputContainer');
  const inputContainer = document.querySelector('.input-container');
  const app = document.getElementById('app');

  // Fix layout
  if (app) {
    app.style.display = 'flex';
    app.style.flexDirection = 'column';
    app.style.height = '100vh';
  }
  if (chatContainer) {
    chatContainer.style.flex = '1';
    chatContainer.style.overflow = 'auto';
    chatContainer.style.maxHeight = '70vh';
  }
  if (inputContainer) {
    inputContainer.style.position = 'sticky';
    inputContainer.style.bottom = '0';
    inputContainer.style.width = '100%';
    inputContainer.style.backgroundColor = '#fff';
    inputContainer.style.padding = '1rem';
    inputContainer.style.borderTop = '1px solid #ddd';
  }
  if (userInput) {
    userInput.style.fontSize = '1rem';
    userInput.style.padding = '0.75rem';
  }
  if (sendBtn) {
    sendBtn.style.fontSize = '1rem';
    sendBtn.style.padding = '0.75rem 1rem';
  }
  if (releaseBtn) {
    releaseBtn.style.fontSize = '1.2rem';
    releaseBtn.style.padding = '1rem';
  }

  const prompts = [
    "Hello! What's your name?",
    "How are you feeling today?",
    "What's something that made you smile recently?",
    "Is there anything that's been bothering you?",
    "Okay, now tell me everything—just let it all out."
  ];
  let stage = 0;
  let ventText = '';
  let userName = '';

  function typeMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', 'bot');
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    msgDiv.appendChild(bubble);
    chatContainer.appendChild(msgDiv);
    let i = 0;
    const interval = setInterval(() => {
      bubble.textContent += text[i];
      chatContainer.scrollTop = chatContainer.scrollHeight;
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 25);
  }

  function appendUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', 'user');
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.textContent = text;
    msgDiv.appendChild(bubble);
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function checkDanger(text) {
    const dangerWords = ['kill myself','suicide','self harm','end my life','die','harm myself'];
    const lower = text.toLowerCase();
    for (const w of dangerWords) {
      if (lower.includes(w)) return w;
    }
    return null;
  }

  function askNextPrompt() {
    if (stage < prompts.length) {
      typeMessage(prompts[stage]);
    }
  }

  // Start conversation
  askNextPrompt();

  function handleEnhancedInput() {
    const text = userInput.value.trim();
    if (!text) return;
    appendUserMessage(text);
    userInput.value = '';
    if (stage === 0) {
      userName = text.split(' ')[0];
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
      // Show release container for venting
      if (releaseContainer) releaseContainer.style.display = 'block';
      if (sendBtn) sendBtn.style.display = 'none';
      typeMessage("Whenever you're ready, let everything out below then press the button.");
    } else if (stage >= 4) {
      // Venting stage
      ventText = (ventText ? ventText + ' ' : '') + text;
      const danger = checkDanger(text);
      if (danger) {
        typeMessage(`It seems you've mentioned \"${danger}\". Please consider talking to a professional if you're in distress.`);
        alert(`I noticed you mentioned \"${danger}\". Please consider talking to a professional if you're in distress.`);
      } else {
        typeMessage("Thanks for sharing.");
      }
    }
  }

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

  if (releaseBtn) {
    releaseBtn.addEventListener('click', () => {
      // hide input and release container
      if (releaseContainer) releaseContainer.style.display = 'none';
      if (inputContainer) inputContainer.style.display = 'none';
      chatContainer.innerHTML = '';
      typeMessage("Thank you for sharing. You're stronger than you know. Remember to seek help if you feel overwhelmed.");
      // Add back button
      const backBtn = document.createElement('button');
      backBtn.textContent = 'Back to Home';
      backBtn.style.marginTop = '1rem';
      backBtn.style.padding = '1rem';
      backBtn.style.fontSize = '1rem';
      backBtn.style.cursor = 'pointer';
      backBtn.addEventListener('click', () => {
        window.location.href = '../index.html';
      });
      const msgDiv = document.createElement('div');
      msgDiv.style.textAlign = 'center';
      msgDiv.appendChild(backBtn);
      chatContainer.appendChild(msgDiv);
    });
  }
});
