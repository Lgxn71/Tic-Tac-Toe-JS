function showHiddenOverlay(event) {
  editedPlayer = +event.target.dataset.playerid;
  hiddenOverlay.style.display = "block";
  mainOverlay.style.display = "block";
}

function hideHiddenOverlay() {
  hiddenOverlay.style.display = "none";
  mainOverlay.style.display = "none";

  inputField.value = "";
  labelPlayerName.classList.remove("error-label");
  inputField.classList.remove("error-input");
  const errorParagraph = document.getElementById("error-message");
  errorParagraph.textContent = "";
}

function savePlayerName(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("playername");

  const nameRegex = /^[0-9_.%$*&#@!,]+$/;
  if (enteredPlayerName == null || nameRegex.test(enteredPlayerName)) {
    labelPlayerName.classList.add("error-label");
    inputField.classList.add("error-input");

    const errorParagraph = document.getElementById("error-message");
    errorParagraph.textContent = "Please enter a valid name!";

    return;
  }
  const updatedPlayerData = document.getElementById(
    "player-" + editedPlayer + "-data"
  );

  updatedPlayerData.children[1].textContent = enteredPlayerName;
  updatedPlayerData.children[1].classList.add("player-name");

  players[editedPlayer - 1].name = enteredPlayerName;
  hideHiddenOverlay();
}
