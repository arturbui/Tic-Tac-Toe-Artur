const boxes = document.querySelectorAll(".size");
const turnDisplay = document.querySelector(".turn");
const reset = document.querySelector(".reset");
let currentPlayer = "X";
let gameActive = true;
let board = Array(9).fill("");
if (turnDisplay) turnDisplay.textContent = `Current Player: ${currentPlayer}`;
const winningComb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const checkWinner = () => {
  for (const [a, b, c] of winningComb) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      if (turnDisplay) turnDisplay.textContent = `Player ${board[a]} Wins!`;
      return;
    }
  }
  if (!board.includes("")) {
    gameActive = false;
    if (turnDisplay) turnDisplay.textContent = "It's a Draw!";
  }
};
const handleMove = (index, button) => {
  if (!gameActive || board[index] !== "") return;
  board[index] = currentPlayer;
  button.textContent = currentPlayer;
  button.classList.remove("hover-x", "hover-o");
  setTimeout(checkWinner, 50);
  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (turnDisplay) turnDisplay.textContent = `Current Player: ${currentPlayer}`;
  }
};
boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleMove(index, box));
  box.addEventListener("mouseenter", () => {
    if (gameActive && board[index] === "") {
      box.classList.add(currentPlayer === "X" ? "hover-x" : "hover-o");
    }
  });
  box.addEventListener("mouseleave", () => {
    box.classList.remove("hover-x", "hover-o");
  });
});
const resetGame = () => {
  board = Array(9).fill("");
  gameActive = true;
  currentPlayer = "X";
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("hover-x", "hover-o");
  });
  if (turnDisplay) turnDisplay.textContent = `Current Player: ${currentPlayer}`;
};
reset?.addEventListener("click", resetGame);
//# sourceMappingURL=main.js.map
