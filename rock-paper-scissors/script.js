let userScore = 0,
  computerScore = 0;
const userScoreSpan = document.getElementById('user-score'),
  computerScoreSpan = document.getElementById('computer-score'),
  scoreBoardDiv = document.querySelector('.score-board'),
  resultP = document.querySelector('.result > p'),
  rockDiv = document.getElementById('r'),
  paperDiv = document.getElementById('p'),
  scissorsDiv = document.getElementById('s');

function getComputerChoice() {
  const choices = ['r', 'p', 's'];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function convertToWord(letter) {
  if (letter === 'r') return 'Rock';
  if (letter === 'p') return 'Papers';
  return 'Scissors';
}

function win(userChoice, computerChoice) {
  const smallUserWord = 'user'.fontsize(3).sub();
  const smallCompWord = 'comp'.fontsize(3).sub();
  const userChoiceDiv = document.getElementById(userChoice);
  userScore++;
  userScoreSpan.innerHTML = userScore;
  computerScoreSpan.innerHTML = computerScore;
  resultP.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} beats ${convertToWord(
    computerChoice
  )}${smallCompWord}. You win!`;
  userChoiceDiv.classList.add('green-glow');
  setTimeout(() => {
    userChoiceDiv.classList.remove('green-glow');
  }, 1000);
}

function lose(userChoice, computerChoice) {
  const smallUserWord = 'user'.fontsize(3).sub();
  const smallCompWord = 'comp'.fontsize(3).sub();
  const userChoiceDiv = document.getElementById(userChoice);
  computerScore++;
  userScoreSpan.innerHTML = userScore;
  computerScoreSpan.innerHTML = computerScore;
  resultP.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} loses to ${convertToWord(
    computerChoice
  )}${smallCompWord}. You lost...`;
  userChoiceDiv.classList.add('red-glow');
  setTimeout(() => {
    userChoiceDiv.classList.remove('red-glow');
  }, 1000);
}

function draw(userChoice, computerChoice) {
  const smallUserWord = 'user'.fontsize(3).sub();
  const smallCompWord = 'comp'.fontsize(3).sub();
  const userChoiceDiv = document.getElementById(userChoice);
  resultP.innerHTML = `${convertToWord(
    userChoice
  )}${smallUserWord} equals ${convertToWord(
    computerChoice
  )}${smallCompWord}. It's a draw.`;
  userChoiceDiv.classList.add('gray-glow');
  setTimeout(() => {
    userChoiceDiv.classList.remove('gray-glow');
  }, 1000);
}

function game(userChoice) {
  const computerChoice = getComputerChoice();
  switch (userChoice + computerChoice) {
    case 'rs':
    case 'pr':
    case 'sp':
      win(userChoice, computerChoice);
      break;
    case 'rp':
    case 'ps':
    case 'sr':
      lose(userChoice, computerChoice);
      break;
    case 'rr':
    case 'pp':
    case 'ss':
      draw(userChoice, computerChoice);
      break;
  }
}

function main() {
  rockDiv.addEventListener('click', () => {
    game('r');
  });
  paperDiv.addEventListener('click', () => {
    game('p');
  });
  scissorsDiv.addEventListener('click', () => {
    game('s');
  });
}

main();
