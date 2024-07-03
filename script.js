const X_CLASS = 'x';
const O_CLASS = 'o';
let currentPlayerClass = X_CLASS;
let gameActive = true;
const board = document.getElementById('board');
const statusMessage = document.getElementById('status-message');
const restartButton = document.getElementById('restart-button');
const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    statusMessage.textContent = `${currentPlayerClass.toUpperCase()}'s turn`;
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = currentPlayerClass;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
   
    cell.textContent = currentClass.toUpperCase();
}

function swapTurns() {
    currentPlayerClass = currentPlayerClass === X_CLASS ? O_CLASS : X_CLASS;
    statusMessage.textContent = `${currentPlayerClass.toUpperCase()}'s turn`;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    board.classList.add(currentPlayerClass);
}

function checkWin(currentClass) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        statusMessage.textContent = 'It\'s a Draw!';
    } else {
        statusMessage.textContent = `${currentPlayerClass.toUpperCase()} Wins!`;
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
    restartButton.style.display = 'block';
    restartButton.addEventListener('click', () => {
        gameActive = true;
        restartButton.style.display = 'none';
        cells.forEach(cell => {
            cell.textContent = ''; 
        });
        startGame();
    });
}
