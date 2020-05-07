let gameState = {
  state: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};
let currentPlayer = "X"; //min
const changePlayer = (currPlayer) => (currPlayer === "X" ? "O" : "X"); //min
const squareTargets = document.querySelectorAll(".square");
const addListeners = (targets) =>
  targets.forEach((target) => registerListener(target));
const registerListener = (elem) => {
  elem.addEventListener("click", registerClick);
};
const registerClick = (e) => {
  const id = getID_H(e);
  registerClickInGameState(id);
  removeLister(getElementFromID(id));
  console.log(e, extractClickPosition(id), getElementFromID(id));
};
//
//
//
//
//
const getElementFromID = (id) => document.getElementById(id);
const removeLister = (elem) => elem.removeEventListener("click", registerClick);
const getID_H = (event) => event.target.id;
const extractClickPosition = (positionString) =>
  positionString.match(/^\d+|\d+\b|\d+(?=\w)/g).map(function (v) {
    return +v;
  });
const registerClickInGameState = (id) => {
  const xy = extractClickPosition(id);
  xy[0]--;
  xy[1]--;
  gameState.state[xy[0]][xy[1]] = currentPlayer;
  drawShap(id);
  if (checkGameState()) {
    endGame();
  }
  currentPlayer = changePlayer(currentPlayer);
};
const checkGameState = function () {
  const game = [...gameState.state];
  for (let i = 0; i < game.length; i++) {
    if (
      checkWinner(game[0][i], game[1][i], game[2][i]) ||
      checkWinner(game[i][0], game[i][1], game[i][2])
    ) {
      return true;
    }
  }
  if (
    checkWinner(game[0][0], game[1][1], game[2][2]) ||
    checkWinner(game[0][2], game[1][1], game[2][0])
  ) {
    return true;
  }
  return false;
};
const checkWinner = (x, y, z) => x === y && y === z && z != "";
//
const endGame = () => {
  removeListers();
  declareWinner();
  console.log("object");
};
const removeListers = () => {
  squareTargets.forEach((elem) => {
    removeLister(elem);
  });
};
const declareWinner = () => {
  document.getElementsByClassName(
    "winner"
  )[0].innerHTML = `Player ${currentPlayer} won the Game`;
};
// tests
const drawShap = (id) => {
  let s = document.createElement("img");
  s.setAttribute("src", `${currentPlayer.toLowerCase() + ".svg"}`);
  document.getElementById(id).appendChild(s);
};
//main
const main = () => {
  addListeners(squareTargets);
};
main();
//playground it here
// compare(x, y, z, currentPlayer);
// return x === "X" ? (y === "X" ? (z === "X" ? true : false) : false) : false;
