const board = document.getElementById("board");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameOver = false;

// Función para crear una celda y manejar los clics del jugador
function createCell(row, col) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.row = row;
    cell.dataset.col = col;

    cell.addEventListener("click", () => {
        if (!gameOver && cell.textContent === "") {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);

            if (checkWinner(currentPlayer)) {
                message.textContent = `¡Jugador ${currentPlayer} ha ganado!`;
                gameOver = true;
            } else if (isTie()) {
                message.textContent = "¡Es un empate!";
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    });

    return cell;
}

// Función para verificar si un jugador ha ganado
function checkWinner(player) {
    const cells = document.querySelectorAll(".cell");
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player) {
            return true;
        }
    }

    return false;
}

// Función para verificar si el juego termina en empate
function isTie() {
    const cells = document.querySelectorAll(".cell");
    for (const cell of cells) {
        if (cell.textContent === "") {
            return false;
        }
    }
    return true;
}

// Función para reiniciar el juego
function resetGame() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });

    message.textContent = "";
    currentPlayer = "X";
    gameOver = false;
}

// Crear el tablero y añadir celdas
for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
        board.appendChild(createCell(row, col));
    }
}

// Escuchar el evento de reiniciar el juego
