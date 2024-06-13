let selectedLevel = ''; // Variável para armazenar o nível selecionado

// Adiciona eventos de clique para os botões de nível
document.getElementById('easy').addEventListener('click', () => {
  selectedLevel = 'Celula animal';
});

document.getElementById('medium').addEventListener('click', () => {
  selectedLevel = 'Celula vegetal';
});

document.getElementById('startGame').addEventListener('click', () => {
  const playerName = document.getElementById('playerName').value; // Obtém o nome do jogador

  if (!playerName) {
    alert('Por favor, insira seu nome.'); // Verifica se o nome do jogador foi inserido
    return;
  }

  if (!selectedLevel) {
    alert('Por favor, selecione um nível.'); // Verifica se um nível foi selecionado
    return;
  }

  // Armazena o nome do jogador e o nível selecionado no localStorage
  localStorage.setItem('playerName', playerName);
  localStorage.setItem('gameLevel', selectedLevel);

  // Redireciona para a página correspondente ao nível selecionado
  let gamePage = '';
  if (selectedLevel === 'Celula animal') {
    gamePage = './pages/facil.html';
  } else if (selectedLevel === 'Celula Vegetal') {
    gamePage = './pages/medio.html';
  } else if (selectedLevel === 'Difícil') {
    gamePage = './pages/hard.html';
  }

  window.location.href = gamePage; // Redireciona para a página do jogo
});
