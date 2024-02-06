'use strict'

const GHOST = '🐺'
var gGhosts = []
var gDeadGhosts = []
var gIdIdex = 0

var gIntervalGhosts

function createGhosts(board) {

    gGhosts = []
    gIdIdex = 0
    for (var i = 0; i < 3; i++) {
        createGhost(board)

    }

    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {

    var currColor = getRandomColor()
    const ghost = {
        id: gIdIdex++,
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: currColor
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {

    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {

    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === SUPER_FOOD) return
    if (nextCell === PACMAN) {
        if (!gPacman.isSuper) {
            gIsWIN = false
            gameOver()
            return
        } else
            return
    }

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    renderCell(ghost.location, ghost.currCellContent)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    renderCell(ghost.location, getGhostHTML(ghost))
    ghostColor(ghost)
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function removeGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j) {

            gDeadGhosts.push(gGhosts[i])
            gGhosts.splice(i, 1)
        }
    }
}

function ghostColor(ghost) {
    const elGhostColor = document.querySelector(`.cell-${ghost.location.i}-${ghost.location.j} span`)
    if (gPacman.isSuper === true) {
        elGhostColor.style.backgroundColor = 'blue'

    } else {
        elGhostColor.style.backgroundColor = ghost.color

    }
}

function getGhostHTML(ghost) {
    return `<span class = "${ghost.id}">${GHOST}</span>`
}