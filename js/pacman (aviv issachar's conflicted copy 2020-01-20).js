var gPacman;
var gEatenGhosts = 0;
var gEmptyCells = [];
const PACMAN = '&#9786;';

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
  gFoodCount--;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting superfood
  if (nextCell === SUPERFOOD) {
    if (gPacman.isSuper) return;
    gPacman.isSuper = true;
    hasSuper()
    setTimeout(function () {
      // debugger
      gPacman.isSuper = false;
      for (i = 0; i < gEatenGhosts; i++) {
        createGhost(gBoard);
      }
      gEatenGhosts = 0;
    }, 5000);
  }

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    gEmptyCells.push(nextLocation)
    gFoodCount--;
    updateScore(1);
    if (gFoodCount === 0) gameOver();
  }

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    gEmptyCells.push(nextLocation)
    gFoodCount--;
    updateScore(1);
    if (gFoodCount === 0) gameOver();
  }

  // currCellContent: FOOD,


  if (gPacman.isSuper) {
    if (nextCell === GHOST) {
      if (!nextCell.currCellContent === null) gFoodCount--;
      gGhosts.splice(0, 1)
      // console.log(gGhosts);
      gEatenGhosts++
    }
  } else if (nextCell === GHOST) {
    gameOver();
    renderCell(gPacman.location, EMPTY);
    return;
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }
  return nextLocation;
}

function hasSuper() {
  // var originalGhostColors = [] I HAVE TO DO WITH KEEPING THE GHOSTS COLOR
  if (gPacman.isSuper) {
    var elGhosts = document.querySelectorAll(".board-container .ghost")
    for (i = 0; i < elGhosts.length; i++) {
      // var currColor = [elGhosts[i].style.color] I HAVE TO DO WITH KEEPING THE GHOSTS COLOR
      // originalGhostColors.push(...currColor); I HAVE TO DO WITH KEEPING THE GHOSTS COLOR
      elGhosts[i].style.color = "blue"
    }

  }

}



