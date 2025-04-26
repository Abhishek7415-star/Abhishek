const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let cells = Array(9).fill(null);
let xIsNext = true;
let gameOver = false;

function createBoard() {
  board.innerHTML = "";
  cells = Array(9).fill(null);
  xIsNext = true;
  gameOver = false;
  status.textContent = "Next Player: X";

  cells.forEach((_, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
  });
}

function handleClick(index) {
  if (cells[index] || gameOver) return;

  cells[index] = xIsNext ? "X" : "O";
  board.children[index].textContent = cells[index];

  const winner = checkWinner();
  if (winner) {
    status.textContent = `🎉 Winner: ${winner}`;
    gameOver = true;
  } else if (cells.every(cell => cell)) {
    status.textContent = "It's a draw!";
    gameOver = true;
  } else {
    xIsNext = !xIsNext;
    status.textContent = `Next Player: ${xIsNext ? "X" : "O"}`;
  }
}

function checkWinner() {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a, b, c] of combos) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

resetBtn.addEventListener("click", createBoard);

createBoard();
