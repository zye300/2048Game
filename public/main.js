// newGame button
let button = document.getElementById("button");
console.log(button);

// listen newGame button
button.addEventListener("click", initGame);
// init array of empty cells
    // ========= var name changed for explicitness =========
var board = new Array();


// ===========================================================
// gridCells = new Array(16).fill(false);
// ===========================================================


// initialize board
function initGame(){
    for (let i = 0; i < 4; i++) {
        board[i] = new Array();
        for(let j = 0; j < 4; j++) {
            // init grid cells in 4*4 board
            board[i][j] = 0;
            document.getElementById("grid-" + i + "-" + j).innerHTML = '';
        }
    }

    // indices of init nums on board
    num1 = Math.floor(Math.random() * 16);
    num2 = Math.floor(Math.random() * 16);
    // ensure different cells
    while(num2 == num1) {
        num2 = Math.floor(Math.random() * 16);
    }
    board[Math.floor(num1 / 4)][num1 % 4] = (Math.random() < 0.5) ? 2 : 4;
    board[Math.floor(num2 / 4)][num2 % 4] = (Math.random() < 0.5) ? 2 : 4;
    // document.getElementById("grid-" + Math.floor(num1 / 4) + "-" + num1 % 4).innerHTML = (Math.random() < 0.5) ? 2 : 4;
    // document.getElementById("grid-" + Math.floor(num2 / 4) + "-" + num2 % 4).innerHTML = (Math.random() < 0.5) ? 2 : 4;
    /*
    gridCells[num1] = true;
    gridCells[num2] = true;
    */
   updateBoard(board);
}


// generate one number
function generate_number() {
    console.log("Call generate");
    // check game condition
    if(!check_game_over()) {
        num = Math.floor(Math.random() * 16);
        // find an empty cell
        // ======= board[Math.floor(num / 4)][num % 4] != 0 ============
        while(!document.getElementById("grid-" + (num / 4) + "-" + (num % 4)).innerHTML) {
            num = Math.floor(Math.random() * 16);
        }
        board[Math.floor(num / 4)][num % 4] = (Math.random() < 0.5) ? 2 : 4;
        // document.getElementById("grid-" + Math.floor(num / 4) + "-" + num % 4).innerHTML = (Math.random() < 0.5) ? 2 : 4;
        
        // gridCells[num] = true;
    }
}


// check game condition
function check_game_over() {
    console.log("call check game over");
    for(let i = 0; i < 16; i++) {
        if(board[Math.floor(i / 4)][i % 4] == 0) {
            console.log("Not Game over");
            return false;
        }
    }
    // ================== TODO: add a gameover screen =================
        // return true if gameover
    console.log("Game over");
    return true;
}

function moveLeft(board) {
    if (!canMoveLeft(board)) {
        // cannot move
        return false;
    }
    // each row
    for (let i = 0; i < 4; i++) {
        // ignore column 1
        for (let j = 1; j < 4; j++) {
            // non-empty cell
            if (board[i][j] != 0) {    
                for (let k = 0; k < j; k++) {
                    // check all left cells
                    if (board[i][k] == 0 && clearBetween(i, j, k, board)) {   // ======= vals in between ======
                        // has an empty left cell & all clear in between
                            // move to left
                        // ================ TODO: animation ================
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    } else if ((board[i][j] == board[i][k]) && clearBetween(i, j, k, board)) {
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                    }
                }
            }
        }
    }

    return true;
}

function canMoveLeft(board) {
    for (let i = 0; i < 4; i++) {
        // ignore column 1
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                // left empty
                if (board[i][j - 1] == 0
                        // left equal
                        && board[i][j] == board[i][j - 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function clearBetween(row, col, iterCol, board) {
    for (let i = iterCol + 1; i < col; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}

// update game
window.addEventListener("keydown", function (event) {
    // Do nothing if the event was already processed
    if (event.defaultPrevented) {
      return;
    }
    // handle 
    switch (event.key) {
      case "ArrowDown":
        // if successfully move to left, and move to left
        if (moveLeft(board)) {
            // generate a num
            generate_number();
            // check game conditon
            check_game_over();
        }
        break;
      case "ArrowUp":
        // code for "up arrow" key press.
        generate_number();

        break;
      case "ArrowLeft":
        // code for "left arrow" key press.
        generate_number();
        break;
      case "ArrowRight":
        // code for "right arrow" key press.
        generate_number();
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();

    updateBoard();
    
  }, true);

function updateBoard(board) {
    // update board
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                document.getElementById("grid-" + i + "-" + j).innerHTML = board[i][j];  
            }
                      
        }
    }
}

  // ==========================TODO LIST========================
  // 1. move logic
  // 2. unique color for numbers
    // array of colors corresponding to powers
    // or switch block
  // 3. resize 
    // （CSS什么苟b东西永远写不对了woc）
  // 4. animation (optional)
    // 怎么别人写的那么丝滑啊

