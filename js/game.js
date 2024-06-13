document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const spanPlayer = document.querySelector('.player');
  const timer = document.querySelector('.timer');

  const characters = [
    'card1',
    'card2',
    'card3',
    'card4',
    'card5',
  ]; // List of characters or card images

  const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  };

  let firstCard = '';
  let secondCard = '';

  const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === characters.length * 2) { // 5 pairs of cards, so 10 cards in total
      clearInterval(timerInterval);
      alert(`Parabéns, ${spanPlayer.textContent}! Seu tempo foi de: ${timer.textContent} segundos`);
    }
  };

  const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
      firstCard.firstChild.classList.add('disabled-card');
      secondCard.firstChild.classList.add('disabled-card');
      firstCard = '';
      secondCard = '';
      checkEndGame();
    } else {
      setTimeout(() => {
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');
        firstCard = '';
        secondCard = '';
      }, 500);
    }
  };

  const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
      return;
    }

    if (firstCard === '') {
      target.parentNode.classList.add('reveal-card');
      firstCard = target.parentNode;
    } else if (secondCard === '') {
      target.parentNode.classList.add('reveal-card');
      secondCard = target.parentNode;
      checkCards();
    }
  };

  const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/bio.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
  };

  const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters]; // Duplicate the cards
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
      const card = createCard(character);
      grid.appendChild(card);
    });
  };

  // Timer
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let timerInterval;

  const startTimer = () => {
    timerInterval = setInterval(updateTimer, 1000); // Call updateTimer every second
  };

  const stopTimer = () => {
    clearInterval(timerInterval); // Stop the timer update interval
  };

  const updateTimer = () => {
    seconds++; // Increment seconds

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }

    if (minutes === 60) {
      minutes = 0;
      hours++;
    }

    const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    timer.textContent = formattedTime;
  };

  const playerName = localStorage.getItem('playerName');
  const gameLevel = localStorage.getItem('gameLevel');

  if (!playerName || !gameLevel) {
    alert('Informações do jogador não encontradas. Redirecionando para a página de login.');
    window.location.href = '../index.html';
    return;
  }

  spanPlayer.textContent = `Jogador: ${playerName}`;
  document.getElementById('difficulty-level').textContent = `Nível Selecionado: ${gameLevel}`;

  // Load the game
  startTimer();
  loadGame();
});
