const screens = document.querySelectorAll('.screen'),
  choose_champion_btns = document.querySelectorAll('.choose-champion-btn'),
  start_btn = document.getElementById('start-btn'),
  game_container = document.getElementById('game-container'),
  timeEl = document.getElementById('time'),
  scoreEl = document.getElementById('score'),
  message = document.getElementById('message');

let seconds = 0,
  score = 0,
  selected_champion = {};

start_btn.addEventListener('click', () => {
  screens[0].classList.add('up');
});

choose_champion_btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    selected_champion = { src, alt };
    screens[1].classList.add('up');
    setTimeout(createChampion, 1000);
    startGame();
  });
});

function createChampion() {
  const champion = document.createElement('div');
  champion.classList.add('champion');
  const { x, y } = getRandomLocation();
  champion.style.top = `${y}px`;
  champion.style.left = `${x}px`;
  champion.innerHTML = `
    <img src="${selected_champion.src}" alt="${
    selected_champion.alt
  }" style="transform: rotate(${Math.random() * 360}deg)" />
  `;

  champion.addEventListener('click', catchChampion);

  game_container.appendChild(champion);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

function catchChampion() {
  increaseScore();
  this.classList.add('caught');
  setTimeout(() => this.remove(), 2000);
  addChampions();
}

function addChampions() {
  setTimeout(createChampion, 1000);
  setTimeout(createChampion, 1500);
}

function increaseScore() {
  score++;
  if (score > 19) {
    message.classList.add('visible');
  }
  scoreEl.innerHTML = `Score: ${score}`;
}

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}
