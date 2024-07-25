Please see the first draft of my final project here:
https://html-preview.github.io/?url=https://raw.githubusercontent.com/Johanna206/connectFour/main/index.html
And please see the code here: 
https://github.com/Johanna206/connectFour/blob/main/index.html 

remaining items to address: 
<!-- 1) handle the case where the column is full (error: could not drop piece) -->
2) the hover should change colors when the next player goes
<!-- 3) handle the case in the event of a draw and the board is full  -->
<!-- 4) add a plink sound for dropping the pieces -->
<!-- 5) add a cheers sound for a winning move -->

overall process for each turn: 
1) dropPiece - calculates which row to place the piece in 
    -> columnFull
2) displayPiece - draws the piece on the board
3) checkForWin - checks at the end of every turn to see if the game has been won or if it is still going
    -> endGame - displays a congratulations message to the winner and stops clicks from functioning
4) nextPlayer - switches between the two colors

