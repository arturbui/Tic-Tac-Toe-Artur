const boxes = document.querySelectorAll<HTMLButtonElement>(".size");
const turnDisplay = document.querySelector(".turn");
const reset = document.querySelector(".reset");

let currentPlayer: string = "X";
let gameActive: boolean = true;
let board: string[] = Array(9).fill("");

const loadGame = () => {
    const savedState = localStorage.getItem("ticTacToeGame");
    if (savedState) {
        const { savedBoard, savedPlayer, savedGameActive } = JSON.parse(savedState);
        board = savedBoard;
        currentPlayer = savedPlayer;
        gameActive = savedGameActive;

        board.forEach((mark, index) => {
            boxes[index].textContent = mark;
        });

        if (turnDisplay) turnDisplay.textContent = `Current Player: ${currentPlayer}`;
    }
};

const saveGame = () => {
    localStorage.setItem("ticTacToeGame", JSON.stringify({
        savedBoard: board,
        savedPlayer: currentPlayer,
        savedGameActive: gameActive
    }));
};

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
            saveGame();
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        if (turnDisplay) turnDisplay.textContent = "It's a Draw!";
        saveGame();
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

    saveGame();
};

boxes.forEach((box, index) => {
    box.addEventListener("mouseenter", () => {
        if (!board[index]) {
            box.textContent = currentPlayer;
            box.style.opacity = "0.5";
        }
    });

    // Remove hover effect when mouse leaves
    box.addEventListener("mouseleave", () => {
        if (!board[index]) {
            box.textContent = "";
            box.style.opacity = "1";
        }
    });

    // Handle Click Event
    box.addEventListener("click", () => handleMove(index, box));
});

const resetGame = () => {
    board = Array(9).fill("");
    gameActive = true;
    currentPlayer = "X";

    boxes.forEach((box) => {
        box.textContent = "";
        box.style.opacity = "1";
    });

    if (turnDisplay) turnDisplay.textContent = `Current Player: ${currentPlayer}`;

    localStorage.removeItem("ticTacToeGame");
};

reset?.addEventListener("click", resetGame);

loadGame();
