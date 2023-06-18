const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'o'
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

const cellElements = document.getElementsByClassName('cell')
const boardElement = document.getElementById('board')
const winCount = document.getElementById('winCount')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
const playerTurnMessage = document.getElementById('playerTurn')
const XWins = document.getElementById('x_wins')
const OWins = document.getElementById('o_wins')

let playerTurn = PLAYER_X_CLASS
let x_wins = 0
let o_wins = 0

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
	winningMessageTextElement.innerHTML = ''
	for (let cell of cellElements){
		cell.classList.remove(PLAYER_X_CLASS)
		cell.classList.remove(PLAYER_O_CLASS)
		cell.addEventListener('click', handleCellClick, { once: true })
	}
	setBoardHoverClass()
}

function handleCellClick(e) {
	const cell = e.target
	const currentClass = playerTurn
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}

function endGame(draw){
    if (draw)
        winningMessageTextElement.innerHTML = "It's a Draw"
    else
        winningMessageTextElement.innerHTML = `Winner ${playerTurn}!`
        if (playerTurn == PLAYER_X_CLASS)
            x_wins ++;
        else
            o_wins ++;
    updateWinnnerText();
    }

function updateWinnnerText(){
    XWins.innerHTML = x_wins
    OWins.innerHTML = o_wins
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
	})
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	playerTurn = playerTurn==PLAYER_X_CLASS ? PLAYER_O_CLASS:PLAYER_X_CLASS
    playerTurnMessage.innerHTML = `${playerTurn}'s Turn`
}

function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X_CLASS)
	boardElement.classList.remove(PLAYER_O_CLASS)
    boardElement.classList.add(playerTurn)
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}