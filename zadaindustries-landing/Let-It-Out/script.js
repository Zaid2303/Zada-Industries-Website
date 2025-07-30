document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.getElementById('chatContainer');
  const userInput = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');
  const releaseContainer = document.getElementById('releaseContainer');
  const releaseBtn = document.getElementById('releaseBtn');
  const app = document.getElementById('app');

  let name = '';
  let state = 'askName';
  let ventText = '';
  const dangerWords = ['kill myself','suicide','self harm','end my life','die','harm myself'];

  function appendMessage(text, sender='bot', isWarning=false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    if (isWarning) msgDiv.classList.add('warning');
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.textContent = text;
    msgDiv.appendChild(bubble);
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function checkDanger(text) {
    const lower = text.toLowerCase();
    for (let word of dangerWords) {
      if (lower.includes(word)) {
        return word;
      }
    }
    return null;
  }

  appendMessage("Hello! What's your name?");

  function handleUserInput() {
    const text = userInput.value.trim();
    if (!text) return;
    appendMessage(text, 'user');
    userInput.value = '';
    if (state === 'askName') {
      name = text.split(' ')[0];
      appendMessage('Nice to meet you, ' + name + '. How are you feeling today?', 'bot');
      state = 'askFeel';
    } else if (state === 'askFeel') {
      appendMessage("Thank you for sharing how you're feeling. Is there something specific that's on your mind?", 'bot');
      state = 'askTopic';
    } else if (state === 'askTopic') {
      appendMessage("Thanks for letting me know. When you're ready, feel free to let it all out.", 'bot');
      releaseContainer.style.display = 'block';
      state = 'venting';
    } else if (state === 'venting') {
      ventText += (ventText ? ' ' : '') + text;
      const danger = checkDanger(text);
      if (danger) {
        alert("I noticed you mentioned \"" + danger + "\". Please consider talking to a professional if you're feeling overwhelmed.");
        appendMessage("It seems you've mentioned \"" + danger + "\". That sounds heavy; please consider reaching out to a professional.", 'warning', true);
      } else {
        appendMessage('Thanks for sharing.', 'bot');
      }
    }
  }

  sendBtn.addEventListener('click', handleUserInput);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserInput();
    }
  });

  releaseBtn.addEventListener('click', () => {
    app.style.display = 'none';
    const effect = document.createElement('div');
    effect.id = 'effect';
    effect.style.position = 'relative';
    effect.style.width = '100%';
    effect.style.height = '300px';
    effect.style.display = 'flex';
    effect.style.justifyContent = 'center';
    effect.style.alignItems = 'center';
    effect.style.overflow = 'hidden';
    document.body.appendChild(effect);

    const textEl = document.createElement('div');
    textEl.id = 'ventText';
    textEl.textContent = ventText || userInput.value;
    textEl.style.fontSize = '24px';
    textEl.style.textAlign = 'center';
    textEl.style.whiteSpace = 'pre-wrap';
    effect.appendChild(textEl);

    const animations = [fallingLetters, rocketExplosion, waveWash];
    const random = Math.floor(Math.random() * animations.length);
    animations[random](textEl, effect);
  });

  function fallingLetters(textEl, container) {
    const content = textEl.textContent;
    textEl.textContent = '';
    for (let i = 0; i < content.length; i++) {
      const span = document.createElement('span');
      span.textContent = content[i];
      span.classList.add('falling-letter');
      span.style.setProperty('--delay', (Math.random() * 1.5).toFixed(2) + 's');
      textEl.appendChild(span);
    }
    setTimeout(() => {
      container.innerHTML = '<p style="font-size:24px;">Feel lighter now? Your words have been released.</p>';
    }, 2500);
  }

  function rocketExplosion(textEl, container) {
    container.style.position = 'relative';
    const rocket = document.createElement('div');
    rocket.classList.add('rocket');
    rocket.textContent = '';
    container.appendChild(rocket);
    setTimeout(() => {
      textEl.classList.add('explode');
    }, 1200);
    setTimeout(() => {
      container.innerHTML = '<p style="font-size:24px;">Your words have gone into space!</p>';
    }, 2500);
  }

  function waveWash(textEl, container) {
    const wave = document.createElement('div');
    wave.classList.add('wave');
    container.appendChild(wave);
    setTimeout(() => {
      textEl.classList.add('explode');
    }, 1200);
    setTimeout(() => {
      container.innerHTML = '<p style="font-size:24px;">All washed away like waves.</p>';
    }, 3000);
  }


// Enhanced chat flow - appended duplicate code allowed
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const releaseContainer = document.getElementById('releaseContainer');
    const releaseBtn = document.getElementById('releaseBtn');
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
      chatContainer.style.overflowY = 'auto';
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

    function typeMessage(text, cssClass = 'bot') {
      const msgDiv = document.createElement('div');
      msgDiv.classList.add('message', cssClass);
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
        // Show release button for venting
        if (releaseContainer) releaseContainer.style.display = 'block';
        if (sendBtn) sendBtn.style.display = 'none';
        typeMessage("Whenever you're ready, let everything out below then press the button.");
      } else if (stage >= 4) {
        // Venting stage
        ventText += (ventText ? ' ' : '') + text;
        const danger = checkDanger(text);
        if (danger) {
          typeMessage(`It seems you've mentioned \"${danger}\". Please consider talking to a professional.`, 'warning');
          alert(`I noticed you mentioned \"${danger}\". Please consider talking to a professional if you're feeling overwhelmed.`);
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
        typeMessage("Thank you for sharing. You're stronger than you know. Remember to seek help if you need it.");
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
})();
});
