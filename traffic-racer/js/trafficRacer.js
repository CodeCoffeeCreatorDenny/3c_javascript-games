$(function () {
  let animId,
    gameOver = false,
    scoreCounter = 1,
    speed = 2,
    lineSpeed = 5,
    moveRight = false,
    moveLeft = false,
    moveUp = false,
    moveDown = false,
    container = $('#container'),
    car = $('#car'),
    car_1 = $('#car_1'),
    car_2 = $('#car_2'),
    car_3 = $('#car_3'),
    line_1 = $('#line_1'),
    line_2 = $('#line_2'),
    line_3 = $('#line_3'),
    restartDiv = $('#restart_div'),
    restartBtn = $('#restart'),
    score = $('#score'),
    highScore = localStorage.getItem('high_score'),
    containerWidth = +container.width(),
    containerHeight = +container.height(),
    carWidth = +car.width(),
    carHeight = +car.height();

  $('#high_score').text(highScore);

  $(document).on('keydown', function (e) {
    if (gameOver === false) {
      let key = e.keyCode;
      if (key === 37 && moveLeft === false) {
        moveLeft = requestAnimationFrame(left);
      } else if (key === 39 && moveRight === false) {
        moveRight = requestAnimationFrame(right);
      } else if (key === 38 && moveUp === false) {
        moveUp = requestAnimationFrame(up);
      } else if (key === 40 && moveDown === false) {
        moveDown = requestAnimationFrame(down);
      }
    }
  });

  $(document).on('keyup', function (e) {
    if (gameOver === false) {
      let key = e.keyCode;
      if (key === 37) {
        cancelAnimationFrame(moveLeft);
        moveLeft = false;
      } else if (key === 39) {
        cancelAnimationFrame(moveRight);
        moveRight = false;
      } else if (key === 38) {
        cancelAnimationFrame(moveUp);
        moveUp = false;
      } else if (key === 40) {
        cancelAnimationFrame(moveDown);
        moveDown = false;
      }
    }
  });

  function left() {
    if (gameOver === false && parseInt(car.css('left')) > 0) {
      car.css('left', parseInt(car.css('left')) - 5);
      moveLeft = requestAnimationFrame(left);
    }
  }

  function right() {
    if (
      gameOver === false &&
      parseInt(car.css('left')) < containerWidth - carWidth
    ) {
      car.css('left', parseInt(car.css('left')) + 5);
      moveRight = requestAnimationFrame(right);
    }
  }

  function up() {
    if (gameOver === false && parseInt(car.css('top')) > 0) {
      car.css('top', parseInt(car.css('top')) - 3);
      moveUp = requestAnimationFrame(up);
    }
  }

  function down() {
    if (
      gameOver === false &&
      parseInt(car.css('top')) < containerHeight - carHeight
    ) {
      car.css('top', parseInt(car.css('top')) + 3);
      moveDown = requestAnimationFrame(down);
    }
  }

  animId = requestAnimationFrame(repeat);

  function repeat() {
    if (
      collision(car, car_1) ||
      collision(car, car_2) ||
      collision(car, car_3)
    ) {
      stopTheGame();
      return;
    }

    scoreCounter++;

    if (scoreCounter % 20 == 0) {
      score.text(parseInt(score.text()) + 1);
    }
    if (scoreCounter % 200 == 0) {
      speed++;
      lineSpeed++;
    }

    carDown(car_1);
    carDown(car_2);
    carDown(car_3);
    lineDown(line_1);
    lineDown(line_2);
    lineDown(line_3);

    animId = requestAnimationFrame(repeat);
  }

  function carDown(car) {
    let carCurrentTop = parseInt(car.css('top'));
    if (carCurrentTop > containerHeight) {
      carCurrentTop = -200;
      let carLeft = parseInt(Math.random() * (containerWidth - carWidth));
      car.css('left', carLeft);
    }
    car.css('top', carCurrentTop + speed);
  }

  function lineDown(line) {
    let lineCurrentTop = parseInt(line.css('top'));
    if (lineCurrentTop > containerHeight) {
      lineCurrentTop = -300;
    }
    line.css('top', lineCurrentTop + lineSpeed);
  }

  restartBtn.click(function () {
    location.reload();
  });

  function stopTheGame() {
    gameOver = true;
    cancelAnimationFrame(animId);
    cancelAnimationFrame(moveRight);
    cancelAnimationFrame(moveLeft);
    cancelAnimationFrame(moveUp);
    cancelAnimationFrame(moveDown);
    restartDiv.slideDown();
    restartBtn.focus();
    setHighScore();
  }

  function setHighScore() {
    if (highScore < parseInt(score.text())) {
      highScore = parseInt(score.text());
      localStorage.setItem('high_score', parseInt(score.text()));
    }
    $('#high_score').text(highScore);
  }

  function collision($div1, $div2) {
    let x1 = $div1.offset().left;
    let y1 = $div1.offset().top;
    let h1 = $div1.outerHeight(true);
    let w1 = $div1.outerWidth(true);
    let b1 = y1 + h1;
    let r1 = x1 + w1;
    let x2 = $div2.offset().left;
    let y2 = $div2.offset().top;
    let h2 = $div2.outerHeight(true);
    let w2 = $div2.outerWidth(true);
    let b2 = y2 + h2;
    let r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
  }
});
