const playerA = 'X';
const playerB = 'O';
let origBoard;
const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];

const cells = document.querySelectorAll('.cell');

startGame();
origBoard = Array.from(Array(9).keys());
function startGame() {
   for (let i = 0; i < cells.length; i++) {
       const cell = cells[i];
       cell.innerText = '';
       cell.style.removeProperty('background-color');
       cell.addEventListener('click', turnClick);
   } 
}

function turnClick(e) {
    turn(e.target.id, playerA);
}

function turn(id, player) {
    origBoard[id] = player;
    document.getElementById(id).innerText = player;
    const gameWon = checkWin(origBoard, player);
    if (gameWon) {
        gameOver();
    }
}

function checkWin(origBoard, player) {
    
}