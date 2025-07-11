const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");

let currentPlayer = 'X';
let isGameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.dataset.index);

  if (gameState[index] !== "" || !isGameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  playSound(clickSound);

  checkResult();
}

function checkResult() {
  let roundWon = false;
  let winningIndices = [];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] === "" ||
      gameState[b] === "" ||
      gameState[c] === ""
    ) continue;

    if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      winningIndices = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    playSound(winSound);
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    highlightWin(winningIndices);
    isGameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "🤝 It's a draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function highlightWin(indices) {
  indices.forEach(index => {
    const cell = document.querySelector(`[data-index='${index}']`);
    cell.classList.add("win-glow");
  });
}

function playSound(sound) {
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

function createBoard() {
  board.innerHTML = "";
  gameState = ["", "", "", "", "", "", "", "", ""];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

restartBtn.addEventListener("click", () => {
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
});

createBoard(); // Initialize board on load


