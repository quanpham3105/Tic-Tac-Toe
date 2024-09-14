const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartButton = document.getElementById("restart-button");
const nameButton = document.getElementById("start-button");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let options2 = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let currentPlayerName;
let playerOneNameOutside;
let playerTwoNameOutside;
let running = false;

// nameButton.addEventListener("click", () => {
//     const playerOneName = document.getElementById("playerOneName").value.toString();
//     const playerTwoName = document.getElementById("playerTwoName").value.toString();
//     if (typeof playerOneName === 'string' && typeof playerTwoName === 'string') {
//         initializeGame();
//     }
//     else {
//         return;
//     }
// });

nameButton.addEventListener("click", () => {
    const playerOneName = document.getElementById("playerOneName").value.trim();
    const playerTwoName = document.getElementById("playerTwoName").value.trim();

    playerOneNameOutside = playerOneName;
    playerTwoNameOutside = playerTwoName;

    if (running === false) {
        for (let i = 0; i < options.length; i++) {
            if (options[i] !== options2[i]) {
                restartGame();
                return;
            }
        }
    }
    if (playerOneName && playerTwoName) {
        currentPlayerName = playerOneNameOutside; // Set the first player as the current player
        initializeGame(playerOneName, playerTwoName);
    } else {
        return;
    }
});

function initializeGame() {
    cells.forEach((cell) => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayerName}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) { //does nothing if there is already a tic tac toe there
        return
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

    changePlayer();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        changePlayer();
        statusText.textContent = `${currentPlayerName} wins!`
        running = false;
    }
    else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    }
    // else {
    //     changePlayer();
    // }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayerName}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    currentPlayerName = (currentPlayerName == playerOneNameOutside) ? playerTwoNameOutside
        : playerOneNameOutside;
    statusText.textContent = `${currentPlayerName}'s turn`;
}

