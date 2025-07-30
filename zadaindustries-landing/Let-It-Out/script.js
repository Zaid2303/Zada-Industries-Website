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
});
