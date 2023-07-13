// Variables globales
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// Función para verificar si hay un ganador
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6] // Diagonales
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes("")) {
        return "tie"; // Empate si no hay casillas vacías
    }

    return null; // Si no hay ganador
}

// Función para procesar el turno del jugador
function processTurn(cellIndex) {
    if (gameBoard[cellIndex] === "") {
        gameBoard[cellIndex] = currentPlayer;
        renderBoard();
        const winner = checkWinner();
        if (winner) {
            if (winner === "tie") {
                alert("¡Es un empate!");
            } else {
                alert(`¡${winner} ha ganado!`);
            }
            resetGame();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

// Función para reiniciar el juego
function resetGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    renderBoard();
}

// Función para dibujar el tablero
function renderBoard() {
    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = ""; // Limpiar el contenido existente

    for (let i = 0; i < gameBoard.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.innerText = gameBoard[i];
        cell.addEventListener("click", () => processTurn(i));
        boardContainer.appendChild(cell);
    }
}

// Llamar a la función para dibujar el tablero inicial
renderBoard();
