// newGame button
let button = document.getElementById("button");
console.log(button);
// listen newGame button
button.addEventListener("click", initGame);
// init array of empty cells
    // ========= var name changed for explicitness =========
gridCells = new Array(16).fill(false);


// Initialization board
function initGame(){
    for (let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            // init grid cells in 4*4 board
            document.getElementById("grid-" + i +"-" +j).innerHTML=null;
        }
    }
    // indices of init nums on board
    num1 = Math.floor(Math.random() * 16);
    num2 = Math.floor(Math.random() * 16);
    // ensure different cells
    while(num2 == num1) {
        num2 = Math.floor(Math.random() * 16);
    }
    document.getElementById("grid-" + Math.floor(num1 / 4) + "-" +num1 % 4).innerHTML = (Math.random() < 0.5) ? 2 : 4;
    document.getElementById("grid-" + Math.floor(num2 / 4) + "-" +num2 % 4).innerHTML = (Math.random() < 0.5) ? 2 : 4;
    
    /*
    if(Math.random() < 0.5) {
        document.getElementById("grid-" + Math.floor(num1/4) + "-" +num1%4).innerHTML = 2;
    }
    else{
        document.getElementById("grid-" + Math.floor(num1/4) + "-" +num1%4).innerHTML = 4;
    }
    if(Math.random() < 0.5) {
        document.getElementById("grid-" + Math.floor(num2/4) + "-" +num2%4).innerHTML = 2;
    }
    else{
        document.getElementById("grid-" + Math.floor(num2/4) + "-" +num2%4).innerHTML = 4;
    }
    */

    gridCells[num1] = true;
    gridCells[num2] = true;
}


// generate one number
function generate_number() {
    console.log("Call generate");
    // check game condition
    if(!check_game_over()) {
        num = Math.floor(Math.random() * 16);
        // find an empty cell
        while(gridCells[num] == true) {
            num = Math.floor(Math.random() * 16);
        }
        document.getElementById("grid-" + Math.floor(num / 4) + "-" +num % 4).innerHTML = (Math.random() < 0.5) ? 2 : 4;
        /*
        if(Math.random() < 0.5) {
            document.getElementById("grid-" + Math.floor(num/4) + "-" +num%4).innerHTML = 2;
        }
        else{
            document.getElementById("grid-" + Math.floor(num/4) + "-" +num%4).innerHTML = 4;
        }
        */
        gridCells[num] = true;
    }
}


// check game condition
function check_game_over() {
    console.log("call check game over");
    for(let i = 0; i < 16; i++) {
        if(!gridCells[i]) {
            console.log("Not Game over");
            return false;
        }
    }
    // ================== TODO: add a gameover screen =================
        // return true if gameover
    console.log("Game over");
    return true;
}

function moveLeft() {
    if (!canMoveLeft(gridCells)) {
        // cannot move
        return false;
    }
    // can move
    for (let i = 0; i < 4; i++) {
        // ignore column 1
        for (let j = 1; j < 4; j++) {
            if (gridCells[4 * i + j]) {
                // non-empty cell
                for (let k = 0; k < j; k++) {
                    // check all left cells
                    if (!gridCells[4 * i + k] && clearBetween(i, j, k, gridCells)) {   // ======= vals in between ======
                        // has an empty left cell & all clear in between
                            // move to left
                        // ================ TODO: animation ================
                        document.getElementById("grid-" + i + "-" + k).innerHTML = document.getElementById("grid-" + i + "-" + j).innerHTML;
                        document.getElementById("grid-" + i + "-" + j).innerHTML = '';
                    } else if ((document.getElementById("grid-" + i + "-" + j).innerHTML
                                == document.getElementById("grid-" + i + "-" + k).innerHTML)
                            && clearBetween(i, j, k, gridCells)  // ======= vals in between ======
                            ) {

                    }
                }
            }
        }
    }

    return true;
}

function canMoveLeft(grid) {
    for (let i = 0; i < 4; i++) {
        // ignore column 1
        for (let j = 1; j < 4; j++) {
            if (grid[4 * i + j]) {
                // left empty
                if (grid[4 * i + j - 1]
                        // left equal
                        && document.getElementById("grid-" + i + "-" + j).innerHTML
                            == document.getElementById("grid-" + i + "-" + (j - 1)).innerHTML) {
                    return true;
                }
            }
        }
    }
    return false;
}

function clearBetween(row, col, iterCol, grid) {
    for (let i = iterCol + 1; i < col; i++) {
        if (grid[4 * row + i]) {
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
        if (moveLeft()) {
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
  }, true);

  // ==========================TODO LIST========================
  // 1. move logic
  // 2. unique color for numbers
    // array of colors corresponding to powers
    // or switch block
  // 3. resize 
    // （CSS什么苟b东西永远写不对了woc）
  // 4. animation (optional)
    // 怎么别人写的那么丝滑啊
