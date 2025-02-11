const boxes = document.querySelectorAll<HTMLButtonElement>(".size");
const turnDisplay = document.querySelector(".turn");
const reset = document.querySelector(".reset");

let currentPlayer: string = "X";
let gameActive: boolean = true;
let board: string[] = Array(9).fill("");

if (turnDisplay) turnDisplay.textContent = `Current Player: ${currentPlayer}`;

const winningComb = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
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

const handleMove = (index: number, button: HTMLButtonElement) => {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    button.textContent = currentPlayer;

    setTimeout(checkWinner, 50);

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (turnDisplay) turnDisplay.textContent = `Current Player: ${currentPlayer}`;
    }
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleMove(index, box));
});

const resetGame = () => {
    board = Array(9).fill("");
    gameActive = true;
    currentPlayer = "X";

    boxes.forEach((box) => {
        box.textContent = "";
    });

    if (turnDisplay) turnDisplay.textContent = `Current Player: ${currentPlayer}`;
};

reset?.addEventListener("click", resetGame);

const handleMove = (index: number, button: HTMLButtonElement) => {
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
