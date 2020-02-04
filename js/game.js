'use strict';
var WALL = '#';
var FOOD = '.';
var SUPERFOOD = '&#9749';
var CHERRY = '🍒';
var EMPTY = ' ';
var gFoodCount = 0;
var gCreatingCherrys;

var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  gFoodCount = 0;
  gGame.score = 0;
  document.querySelector('header h3 span').innerText = 0;
  gGame.isOn = true;
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  randomCherryFarm();
  renderMat(gBoard, '.board-container');
  var elModal = document.querySelector(".modal")
  var elReplayBtn = document.querySelector(".replay-btn")
  // console.dir(elModal);
  elReplayBtn.onclick = function () {
    elModal.style.display = "none"
    init()
  }
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gFoodCount++;
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
        gFoodCount--;
      }

      if (i === 1 && j === 1) board[i][j] = SUPERFOOD;
      if (i === 8 && j === 8) board[i][j] = SUPERFOOD;
      if (i === 1 && j === 8) board[i][j] = SUPERFOOD;
      if (i === 8 && j === 1) board[i][j] = SUPERFOOD;
    }
  }
  // board[1][1] = SUPERFOOD
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}


function gameOver() {
  // debugger
  gEatenGhosts = 0;
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gCreatingCherrys);
  gIntervalGhosts = null;
  var elModal = document.querySelector(".modal");
  elModal.style.display = "block";
  var elModalTxt = document.querySelector(".modal p")
  // console.dir(elModalTxt);
  if (gFoodCount > 0) {
    elModalTxt.innerHTML = `Your sweet tooth got you KILLED! 
    (your candy score was ${gGame.score})`
  } else (
    elModalTxt.innerHTML = `You got all the candys WITHOUT getting killed!
     (your candy score was ${gGame.score})`
  )

}


function randomCherryFarm() {
  gCreatingCherrys = setInterval(function () {
    shuffle(gEmptyCells);
    var randomEmptyCell = gEmptyCells.pop()
    if(!gBoard[randomEmptyCell.i][randomEmptyCell.j] === EMPTY) return;
    gBoard[randomEmptyCell.i][randomEmptyCell.j] = CHERRY;
    renderCell(randomEmptyCell, CHERRY)
    // gFoodCount++
  }, 15000);
}


