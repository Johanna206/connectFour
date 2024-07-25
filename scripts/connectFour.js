// define variable for the game state
let gameOver = false;
// create prototype column of six rows
const Column = {
    row1: 'empty',
    row2: 'empty',
    row3: 'empty',
    row4: 'empty',
    row5: 'empty',
    row6: 'empty',
}
// create empty board array
const board = [];
// add seven columns to empty board object
function createNewBoard(board) {
    for (i = 0; i < 7; i++) {
        let column = Object.create(Column);
        board.push(column);
    }
}
// board[column][row]
// calls the create function 
createNewBoard(board);
// creates a player variable to keep track of whose turn it is
let player = 'red';
// alternate turn, changes the turn variable from red to blue and back
function nextPlayer() {
    if (player == 'red') {
        player = 'blue';
        console.log('blue player goes next');
        document.getElementById('nextPlayer').innerHTML = "It's the blue player's turn."
    } else if (player == 'blue') {
        player = 'red';
        console.log('red player goes next');
        document.getElementById('nextPlayer').innerHTML = "It's the red player's turn."
    } else {
        console.log('error - could not find which turn it is');
    }
}
// two functions to animate the color of the drop down arrows when hovering over them
function hover(id) {
    if (!gameOver) {
        document.getElementById(id).setAttribute('src', "images/" + player + "Arrow.svg.png");
    } else {
        unhover(id);
    }
}
function unhover(id) {
    document.getElementById(id).setAttribute('src', "images/greyArrow.svg.png");
}
// define the sound effect that plays when a piece is dropped
let dropSound = new Audio('audio/dropSound.mp3');
/* function to display piece on the board
row should be a number 0 - 5
col should be a number 0 - 6
color should be 'red' or 'blue' (same as the player variable) */
function displayPiece(row, col, color) {
    let image = document.createElement("img");
    if (color == 'red') {
        image.setAttribute("src", "images/red.png"); 
        image.setAttribute("alt", "red"); 
        console.log('dropping red piece');
    } else if (color == 'blue') {
        image.setAttribute("src", "images/blue.png");
        image.setAttribute("alt", "blue");
        console.log('dropping blue piece');
    } else {
        console.log("can't display piece, no color specified");
    }
    let location = 'row' + (row + 1) + '_col' + (col + 1);
    console.log('into the location: ' + location);
    board[col]['row' + (row + 1)] = color;
    document.getElementById(location).appendChild(image);
    dropSound.play();
}
// variable to keep track of if a piece was successfully dropped or not, only move to the next turn if a piece was dropped successfully
let droppedPiece = true;
// calculates which piece to put where, depending on which column it is placed in and whose turn it is
// col should be a number 0 - 6
// player should be 'red' or 'blue' 
function dropPiece(col) {
    if (board[col]['row6'] == 'empty') {
        displayPiece(5, col, player);
        droppedPiece = true;
        console.log(player + ' piece fell into row6');
    } else if (board[col]['row5'] == 'empty') {
        displayPiece(4, col, player);
        droppedPiece = true;
        console.log(player + ' piece fell into row5');
    } else if (board[col]['row4'] == 'empty') {
        displayPiece(3, col, player);
        droppedPiece = true;
        console.log(player + ' piece fell into row4');
    } else if (board[col]['row3'] == 'empty') {
        displayPiece(2, col, player);
        droppedPiece = true;
        console.log(player + ' piece fell into row3');
    } else if (board[col]['row2'] == 'empty') {
        displayPiece(1, col, player);
        droppedPiece = true;
        console.log(player + ' piece fell into row2');
    } else if (board[col]['row1'] == 'empty') {
        displayPiece(0, col, player);
        droppedPiece = true;
        console.log(player + ' piece fell into row1');
    } else if (board[col]['row1'] != 'empty') {
        console.log('column full');
        document.getElementById('nextPlayer').innerHTML = "Column full.";
        droppedPiece = false;
    } else {
        console.log('error: could not drop piece');
    }
}
// variable to keep track of if there is a winner (or if the game ended in a draw)
let winner = false;
// defines the cheering sound that plays when someone wins the game
let cheerSound = new Audio('audio/cheerSound.mp3');
// check to see if there are four in a row, horizontally, vertically, or diagonally
function checkForWin() {
    // check for horizontal wins (4 on the same row)
    // check every row (row1 - row6)
    for (r = 1; r < 7; r++) {
        // check the first three columns (numbers 0 - )
        for (c = 0; c < 4; c++) {
            //check if the space is empty
            if (board[c]['row' + r] != 'empty') {
                // if there is a piece there, check if 4 neighbors all have the same value
                let neighbors = [board[c]['row' + r], board[c + 1]['row' + r], board[c + 2]['row' + r], board[c + 3]['row' + r]];
                if (neighbors.every(val => val === neighbors[0])) {
                    console.log('four in a row');
                    console.log(board[c]['row' + r] + ' wins!');
                    gameOver = true;
                    winner = true;
                    cheerSound.play();
                }
            }
        }
    }
    // similarly check for vertical wins (4 on the same column)
    // check every column (numbers 0 - 6)
    for (c = 0; c < 7; c++) {
        // check the first 3 rows (row1 - row3)
        for (r = 1; r < 4; r++) {
            if (board[c]['row' + r] != 'empty') {
                neighbors = [board[c]['row' + r], board[c]['row' + (r + 1)], board[c]['row' + (r + 2)], board[c]['row' + (r + 3)]];
                // mini function to check that all values in the array are equal
                if (neighbors.every(val => val === neighbors[0])) {
                    console.log('four in a column');
                    console.log(board[c]['row' + r] + ' wins!');
                    gameOver = true;
                    winner = true;
                    cheerSound.play();
                }
            }
        }
    }
    // now check for diagonal wins topright to bottomleft
    // check top 3 rows (row1 - row3)
    for (r = 1; r < 4; r++) {
        // check right 4 columns (3 - 6)
        for (c = 3; c < 7; c++) {
            if (board[c]['row' + r] != 'empty') {
                neighbors = [board[c]['row' + r], board[c - 1]['row' + (r + 1)], board[c - 2]['row' + (r + 2)], board[c - 3]['row' + (r + 3)]];
                if (neighbors.every(val => val === neighbors[0])) {
                    console.log('four in a diagonal bottom left to top right');
                    console.log(board[c]['row' + r] + ' wins!');
                    gameOver = true;
                    winner = true;
                    cheerSound.play();
                }
            }
        }
    }
    // lastly check for diagon win topleft to bottom right
    // check left four columns (0 - 3)
    for (c = 0; c < 4; c++) {
        // check top 3 rows (row1 - row3)
        for (r = 1; r < 4; r++) {
            if (board[c]['row' + r] != 'empty') {
                neighbors = [board[c]['row' + r], board[c + 1]['row' + (r + 1)], board[c + 2]['row' + (r + 2)], board[c + 3]['row' + (r + 3)]];
                if (neighbors.every(val => val === neighbors[0])) {
                    console.log('four in a diagonal topleft to bottomright');
                    console.log(board[c]['row' + r] + ' wins!');
                    gameOver = true;
                    winner = true;
                    cheerSound.play();
                }
            }
        }
    }
    // check in the unlikely case that the game ends because whole board is full and the game is a draw
    if (![board[0]['row1'], board[1]['row1'], board[2]['row1'], board[3]['row1'], board[4]['row1'], board[5]['row1'], board[6]['row1']].includes('empty')) {
        console.log('board full!');
        gameOver = true;
    }
}
// Displays message and stops the game when it ends.
function endGame() {
    console.log('END GAME');
    if (winner) {
        document.getElementById('nextPlayer').innerHTML = "Congratulations! The " + player + " player won!"
    } else {
        document.getElementById('nextPlayer').innerHTML = "Board full - the game is drawn."
    }
}

/* overall process for each turn
1) dropPiece 
2) displayPiece 
3) checkForWin 
    -> endGame 
4) nextPlayer  */
function turn(col) {
    if (!gameOver) {
        dropPiece(col);
        if (droppedPiece) {
            checkForWin();
            if (gameOver) {
                endGame();
            } else {
                nextPlayer();
            }
        }
    }
}


// creates the html for the board, only use once to copy into the html file
// for (r = 1; r < 7; r++) {
//     let row = 'row' + r;
//   for (c = 1; c < 8; c++) {
//         let col = 'col' + c;
//         let id = row + '_' + col;
//         console.log('<div class="square" class="' + row + '" clas="' + col + '" id="' + id + '"></div>');
//   }
// }

