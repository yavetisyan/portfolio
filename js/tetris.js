// Game structure

let main = document.querySelector(".tetris");
let nextBlockElem = document.querySelector(".nextBlock");
let gameOver = document.querySelector(".game__over");
let pauseTxt = document.querySelector(".pause");
let score = 0;
let scoreElem = document.querySelector(".score");
let levelElem = document.querySelector(".level");
const startBtn = document.querySelector(".start__btn");
const pausetBtn = document.querySelector(".pause__btn");
let movingBlockStyle = document.getElementsByClassName(".movingBlock");
let currentLevel = 1;
let isPaused = true;
let timerId;

let posLevel = {
  1: {
    scorePerLine: 10,
    speed: 1000,
    nextLevelScore: 500,
  },
  2: {
    scorePerLine: 15,
    speed: 900,
    nextLevelScore: 1500,
  },
  3: {
    scorePerLine: 30,
    speed: 800,
    nextLevelScore: 2500,
  },
  4: {
    scorePerLine: 40,
    speed: 700,
    nextLevelScore: 160,
  },
  5: {
    scorePerLine: 50,
    speed: 600,
    nextLevelScore: 2500,
  },
  6: {
    scorePerLine: 60,
    speed: 500,
    nextLevelScore: 3000,
  },
  7: {
    scorePerLine: 70,
    speed: 400,
    nextLevelScore: 3500,
  },
  8: {
    scorePerLine: 80,
    speed: 300,
    nextLevelScore: 4000,
  },
  9: {
    scorePerLine: 90,
    speed: 200,
    nextLevelScore: 4500,
  },
  10: {
    scorePerLine: 150,
    speed: 100,
    nextLevelScore: 5000,
  },
};
let playfield = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let figures = {
  O: [
    [1, 1],
    [1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  L: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  I: [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};
//
let activeBlock = randomBlocks();
let nextBlock = randomBlocks();

// create blocks
function drawBlock() {
  let mainInner = "";
  for (let column = 0; column < playfield.length; column++) {
    for (let row = 0; row < playfield[column].length; row++) {
      if (playfield[column][row] === 1) {
        mainInner += `<div class = "block movingBlock"></div>`;
      } else if (playfield[column][row] === 2) {
        mainInner += '<div class = "block fixedBlock"></div>';
      } else {
        mainInner += '<div class = "block"></div>';
      }
    }
  }

  main.innerHTML = mainInner;

  //if(main.className === 'fixedBlock'){
  //	main.classList.remove('movingBlock')
  //	main.classList.add('cGreen');
  //}else{
  //	main.classList.remove('cGreen');
  //}
}

// add Active blocks
function addActiveBlock() {
  removeActiveBlock();
  for (let column = 0; column < activeBlock.figur.length; column++) {
    for (let row = 0; row < activeBlock.figur[column].length; row++) {
      if (activeBlock.figur[column][row] === 1) {
        playfield[activeBlock.column + column][activeBlock.row + row] =
          activeBlock.figur[column][row];
      }
    }
  }
}

// rotate blocks

function rotateBlock() {
  const prevBlockState = activeBlock.figur;
  activeBlock.figur = activeBlock.figur[0].map((val, ind) =>
    activeBlock.figur.map((el) => el[ind]).reverse()
  );

  if (hasCollisions()) {
    activeBlock.figur = prevBlockState;
  }
}
// random color
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// random blocks

function randomBlocks() {
  const randomFigures = "IOLJTSZ";
  const rand = Math.floor(Math.random() * 7);
  const newBlock = figures[randomFigures[rand]];

  return {
    column: 0,
    row: Math.floor((10 - newBlock[0].length) / 2),
    figur: newBlock,
  };
}

// remove Active blocks
function removeActiveBlock() {
  for (let column = 0; column < playfield.length; column++) {
    for (let row = 0; row < playfield[column].length; row++) {
      if (playfield[column][row] === 1) {
        playfield[column][row] = 0;
      }
    }
  }
}

// check blocks
function hasCollisions() {
  for (let column = 0; column < activeBlock.figur.length; column++) {
    for (let row = 0; row < activeBlock.figur[column].length; row++) {
      if (
        activeBlock.figur[column][row] &&
        (playfield[activeBlock.column + column] == undefined ||
          playfield[activeBlock.column + column][activeBlock.row + row] ===
            undefined ||
          playfield[activeBlock.column + column][activeBlock.row + row] === 2)
      ) {
        return true;
      }
    }
  }
  return false;
}

// next block

function drowNextBlock() {
  let nextMainInner = "";
  for (let column = 0; column < nextBlock.figur.length; column++) {
    for (let row = 0; row < nextBlock.figur[column].length; row++) {
      if (nextBlock.figur[column][row]) {
        nextMainInner += '<div class = "block movingBlock"></div>';
      } else {
        nextMainInner += '<div class = "block"></div>';
      }
    }
    nextMainInner += "<br/>";
  }
  nextBlockElem.innerHTML = nextMainInner;
}
// fixing block
function fixedBlock() {
  for (let column = 0; column < playfield.length; column++) {
    for (let row = 0; row < playfield[column].length; row++) {
      if (playfield[column][row] === 1) {
        playfield[column][row] = 2;
      }
    }
  }

  checkLines();
}

// chekck lines
function checkLines() {
  let removeLine = true;
  let fieldLines = 0;
  for (let column = 0; column < playfield.length; column++) {
    for (let row = 0; row < playfield[column].length; row++) {
      if (playfield[column][row] !== 2) {
        removeLine = false;
        break;
      }
    }
    if (removeLine) {
      playfield.splice(column, 1);
      playfield.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      fieldLines += 1;
    }
    removeLine = true;
  }
  switch (fieldLines) {
    case 1:
      score += posLevel[currentLevel].scorePerLine;
      break;
    case 2:
      score += posLevel[currentLevel].scorePerLine * 2;
      break;
    case 3:
      score += posLevel[currentLevel].scorePerLine * 3;
      break;
    case 4:
      score += posLevel[currentLevel].scorePerLine * 4;
      break;
  }

  scoreElem.innerHTML = score;
  if (score >= posLevel[currentLevel].nextLevelScore) {
    currentLevel++;
    levelElem.innerHTML = currentLevel;
  }
}

function moveBlocksDown() {
  activeBlock.column += 1;
  if (hasCollisions()) {
    activeBlock.column -= 1;
    fixedBlock();
    removeActiveBlock();
    activeBlock = nextBlock;
    if (hasCollisions()) {
      gameOver.style.opacity = 1;
      reset();
    }
    nextBlock = randomBlocks();
  }
}

function reset() {
  isPaused = true;
  clearTimeout(timerId);
  playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  drawBlock();
}

function updateGame() {
  if (!isPaused) {
    addActiveBlock();
    drawBlock();
    drowNextBlock();
  }
}
// ArrowUp
// ArrowLeft
// ArrowRight
// ArrowDown

// arrow buttons
document.addEventListener("keydown", function (e) {
  if (!isPaused) {
    switch (e.key) {
      case "ArrowRight":
        console.log("Right");
        activeBlock.row += 1;
        if (hasCollisions()) {
          activeBlock.row -= 1;
        }
        break;

      case "ArrowLeft":
        console.log("Left");
        activeBlock.row -= 1;
        if (hasCollisions()) {
          activeBlock.row += 1;
        }
        break;

      case "ArrowDown":
        console.log("Down");
        moveBlocksDown();
        break;

      case "ArrowUp":
        console.log("Up");
        rotateBlock();
        break;

      case " ":
        console.log("Pause");
        break;

      case "Enter":
        startGame();
        break;
    }
    updateGame();
  }
});

// pause button
pausetBtn.addEventListener("click", (e) => {
  if (e.target.innerHTML === "Pause") {
    clearTimeout(timerId);
    pauseTxt.style.opacity = "1";
    e.target.innerHTML = "Play";
  } else {
    pauseTxt.style.opacity = "0";
    e.target.innerHTML = "Pause";
    timerId = setTimeout(startGame, posLevel[currentLevel].speed);
  }
  isPaused = !isPaused;
});

/// start button
startBtn.addEventListener("click", () => {
  gameOver.style.opacity = "0";
  isPaused = false;
  timerId = setTimeout(startGame, posLevel[currentLevel].speed);
});
scoreElem.innerHTML = score;
levelElem.innerHTML = currentLevel;

drawBlock();

// timer
let playPause;

function startGame() {
  moveBlocksDown();
  if (!isPaused) {
    addActiveBlock();
    drawBlock();
    drowNextBlock();

    timerId = setTimeout(startGame, posLevel[currentLevel].speed);
  }
}
