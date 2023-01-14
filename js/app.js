const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false

const players = [
  { name: "", symbol: "X" },
  { name: "", symbol: "O" },
];

let nameEditBtnElement = [];
nameEditBtnElement = document.querySelectorAll(
  "#game-configuration .btn-trans"
);
for (let i = 0; i < nameEditBtnElement.length; i++) {
  nameEditBtnElement[i].addEventListener("click", showHiddenOverlay);
}

const mainOverlay = document.querySelector("aside");
const hiddenOverlay = document.getElementById("overlay");
hiddenOverlay.addEventListener("click", hideHiddenOverlay);

const cancelBtn = document.getElementById("cancel-btn");
cancelBtn.addEventListener("click", hideHiddenOverlay);

const formElement = document.querySelector("form");
formElement.addEventListener("submit", savePlayerName);
const inputField = document.getElementById("playername");
const labelPlayerName = document.querySelector("#display-overlay label");
const errorMessageContainer = document.getElementById(
  "error-message-container"
);
const errorParagraph = document.createElement("p");
//game
const startNewGameBtn = document.getElementById("start-game-btn");
const gameField = document.getElementById("active-game");
startNewGameBtn.addEventListener("click", startNewGame);

const gameFieldElements = document.querySelectorAll("#game-board li");
for (let gameFieldElement of gameFieldElements) {
  gameFieldElement.addEventListener("click", selectGameField);
}

const activePlayerNameElement = document.getElementById("active-player-name");

const gameOverElement = document.getElementById("game-over");
