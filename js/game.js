function startNewGame() {
  const nameRegex = /^[0-9_.%$*&#@!,]+$/;

  for (let player of players) {
    console.log(player);
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
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
  gameField.style.display = "block";
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
  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("select empty field");
    return;
  }
  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  console.log(gameData);

  switchPlayer();
}
