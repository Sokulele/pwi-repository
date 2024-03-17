const modeButtons = document.querySelector(".modeBtn");
const playersMode = document.getElementById("playersMode");
const computerMode = document.getElementById("computerMode");
const playersSec = document.querySelector(".playersChose");
const compSec = document.querySelector(".compChose");
const resetBtn = document.getElementById("resetBtn");

function playersModeGame() {
	playersSec.style.display = "";
	compSec.remove();
	modeButtons.style.display = "none";
	resetBtn.style.display = "";
}
playersMode.addEventListener("click", playersModeGame);

function computerModeGame() {
	compSec.style.display = "";
	playersSec.remove();
	modeButtons.style.display = "none";
	resetBtn.style.display = "";
}
computerMode.addEventListener("click", computerModeGame);

let currentPlayer = "X";
let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];
let gameOver = false;

function twoPMakeMove(row, col) {
	if (!gameOver && board[row][col] === "") {
		board[row][col] = currentPlayer;
		document.querySelector(
			`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1}`
		).textContent = currentPlayer;

		if (isWin()) {
			document.getElementById(
				"playersModeWinnerText"
			).textContent = `${currentPlayer} wygrywa!`;
			gameOver = true;
		} else if (isTie()) {
			document.getElementById("playersModeWinnerText").textContent = "Remis!";
			gameOver = true;
		} else {
			currentPlayer = currentPlayer === "X" ? "O" : "X";
		}
	}
}

function compMove(row, col) {
	if (!gameOver && board[row][col] === "") {
		board[row][col] = currentPlayer;
		document.querySelector(
			`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1}`
		).textContent = currentPlayer;

		if (isWin()) {
			document.getElementById(
				"compModeText"
			).textContent = `${currentPlayer} wygrywa!`;
			gameOver = true;
		} else if (isTie()) {
			document.getElementById("compModeText").textContent = "Remis!";
			gameOver = true;
		} else {
			currentPlayer = currentPlayer === "X" ? "O" : "X";

			if (!gameOver && currentPlayer === "O") {
				compTurn();
				// setTimeout(compTurn, 300);
			}
		}
	}
}

function compTurn() {
	if (!gameOver) {
		let row, col;
		do {
			row = Math.floor(Math.random() * 3);
			col = Math.floor(Math.random() * 3);
		} while (board[row][col] !== "");

		compMove(row, col);
	}
}

function isWin() {
	for (let i = 0; i < 3; i++) {
		if (
			(board[i][0] === currentPlayer &&
				board[i][1] === currentPlayer &&
				board[i][2] === currentPlayer) ||
			(board[0][i] === currentPlayer &&
				board[1][i] === currentPlayer &&
				board[2][i] === currentPlayer)
		) {
			return true;
		}
	}

	if (
		(board[0][0] === currentPlayer &&
			board[1][1] === currentPlayer &&
			board[2][2] === currentPlayer) ||
		(board[0][2] === currentPlayer &&
			board[1][1] === currentPlayer &&
			board[2][0] === currentPlayer)
	) {
		return true;
	}

	return false;
}

function isTie() {
	for (let row of board) {
		if (row.includes("")) {
			return false;
		}
	}
	return true;
}

function resetGame() {
	location.reload();
}
resetBtn.addEventListener("click", resetGame);
