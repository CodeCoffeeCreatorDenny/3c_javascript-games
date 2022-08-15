const cvs = document.getElementById('breakout');
const ctx = cvs.getContext('2d');
cvs.style.border = '1px solid #0ff';
ctx.lineWidth = 3;

const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;

let LIFE = 3;
let SCORE = 0;
const SCORE_UNIT = 10;

let LEVEL = 1;
const MAX_LEVEL = 3;

let GAME_OVER = false;
let leftArrow = false;
let rightArrow = false;

const paddle = {
  x: cvs.width / 2 - PADDLE_WIDTH / 2,
  y: cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  dx: 5,
};

function drawPaddle() {
  ctx.fillStyle = '#2e3548';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.strokeStyle = '#ffcd05';
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}
