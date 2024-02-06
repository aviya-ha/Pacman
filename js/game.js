'use strict'

const WALL = '⛓️'
const FOOD = '🏵️'
const EMPTY = ' '
const SUPER_FOOD = '🍄'
const CHERRY = '🍒'


const gGame = {
    score: 0,
    isOn: false
}
var gIntervalCherry
var gIsWIN
var gBoard

function onInit() {
    updateScore(0)
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    clearInterval(gIntervalCherry)
    gIntervalCherry = setInterval(renderCherry, 6000)
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = SUPER_FOOD
    board[1][8] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    board[8][8] = SUPER_FOOD
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            var cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className} ${cell}">${cell} </td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
        console.log('diff:', diff)
    }
    document.querySelector('span.score').innerText = gGame.score
}

function gameOver() {
    const elModal = document.querySelector('.play-again-modal')
    checkVictory(elModal)
    elModal.style.display = 'block'
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    gGame.isOn = false
}

function playAgain() {
    const elModal = document.querySelector('.play-again-modal')
    elModal.style.display = 'none'
    onInit()
}

function isThereFood() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) return true
        }
    }
    return false
}

function checkVictory(elModal) {
    if (gIsWIN) {
        const elModalH1 = document.querySelector('.play-again-modal h1')
        elModalH1.innerText = 'you won!'
        elModal.style.backgroundColor = 'rgb(56, 213, 56)'
        renderCell(gPacman.location, '👑')
    } else {
        const elModalH1 = document.querySelector('.play-again-modal h1')
        elModalH1.innerText = 'you lost!'
        elModal.style.backgroundColor = '#ED5565'
        renderCell(gPacman.location, '🪦')
    }

}

function renderCherry() {
    if (!getEmptyPos()) return
    const currEmptyCell = getEmptyPos()
    gBoard[currEmptyCell.i][currEmptyCell.j] = CHERRY
    const elCell = document.querySelector(`.cell-${currEmptyCell.i}-${currEmptyCell.j}`)
    elCell.innerText = CHERRY
}

function superMode() {
    gPacman.isSuper = true
    gDeadGhosts = []
    setTimeout(() => {
        gPacman.isSuper = false
        gGhosts = gGhosts.concat(gDeadGhosts)
    }, 5000)
}

