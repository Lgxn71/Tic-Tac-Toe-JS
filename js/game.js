function startNewGame() {
  const nameRegex = /^[0-9_.%$*&#@!,]+$/;

  for (let player of players) {
    if (
      player.name == null ||
      player.name === "" ||
      nameRegex.test(player.name) ||
      player.name === "Player Name" ||
      players[0].name === players[1].name
    ) {
      alert("Please set a valid player names");
      return;
    }

    resetGameStatus();
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
  gameField.style.display = "block";
}

function resetGameStatus() {
  gameIsOver = false;
  activePlayer = 0;
  currentRound = 1;

  gameOverElement.innerHTML =
    "<h2>You won, <span id='winner-name'>PLAYER NAME</span>!</h2><p>Click  'Start New Game' above, to start a new game!</p>";
  gameOverElement.style.display = "none";
  for (let i = 0; i < gameData.length; i++) {
    for (let j = 0; j < gameData.length; j++) {
      gameData[i][j] = 0;
    }
  }
  for (let gameFieldElement of gameFieldElements) {
    gameFieldElement.textContent = "";
    gameFieldElement.classList.remove("disabled");
  }
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (gameIsOver) {
    return;
  }
  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Select empty field");
    return;
  }
  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();
  if (winnerId !== 0) {
    gameEnd(winnerId);
  }
  currentRound++;
  switchPlayer();
}
function checkForGameOver() {
  //columns
  for (let i = 0; i < gameData.length; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
      break;
    }
  }
  //r0ws
  for (let i = 0; i < gameData.length; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  //top left bottom rigth
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }
  //top right left bootom
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}
function gameEnd(winnerId) {
  gameIsOver = true;

  gameOverElement.style.display = "block";
  if (winnerId > 0) {
    gameOverElement.firstElementChild.firstElementChild.textContent =
      players[winnerId - 1].name;
  } else {
    gameOverElement.firstElementChild.textContent = " It's a draw!";
  }
}
