let start = document.querySelector('#start'),
  game = document.querySelector('#game'),
  timeEl = document.querySelector('#time'),
  result = document.querySelector('#result'),
  timeHeader = document.querySelector('#time-header'),
  resultHeader = document.querySelector('#result-header'),
  gameTime = document.querySelector('#game-time'),
  score = 0,
  isGameStarted = false;

let colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'grey'];

start.addEventListener('click', startGame);
game.addEventListener('click', handleBoxClick);
gameTime.addEventListener('input', setGameTime);

function startGame() {
  score = 0;
  setGameTime();
  gameTime.setAttribute('disabled', 'true');
  isGameStarted = true;
  game.style.backgroundColor = '#fff';
  hide(start);

  let interval = setInterval(() => {
    let time = +timeEl.textContent;

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      timeEl.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  gameTime.removeAttribute('disabled');
  show(start);
  game.innerHTML = '';
  game.style.backgroundColor = 'rgba(255,255,255,.4)';
  hide(timeHeader);
  show(resultHeader);
}

function handleBoxClick(e) {
  if (!isGameStarted) return;

  if (e.target.dataset.box) {
    score++;
    renderBox();
  }
}

function setGameScore() {
  result.textContent = score.toString();
}

function setGameTime() {
  let time = +gameTime.value;
  timeEl.textContent = time.toFixed(1);
  show(timeHeader);
  hide(resultHeader);
}

function show(el) {
  el.classList.remove('hide');
}

function hide(el) {
  el.classList.add('hide');
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function renderBox() {
  game.innerHTML = '';
  let box = document.createElement('div');
  let boxSize = getRandom(30, 100);
  let gameSize = game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;
  let randomColorIndex = getRandom(0, colors.length);

  box.style.height = box.style.width = boxSize + 'px';
  box.style.position = 'absolute';
  box.style.backgroundColor = colors[randomColorIndex];
  box.style.top = getRandom(0, maxTop) + 'px';
  box.style.left = getRandom(0, maxLeft) + 'px';
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', 'true');

  game.insertAdjacentElement('afterbegin', box);
}
