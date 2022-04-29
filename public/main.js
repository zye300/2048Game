
// newGame button
let button = document.getElementById("button");
let translateButton = document.getElementById("translate");

// listen newGame button
button.addEventListener("click", initGame);
translateButton.addEventListener("click", translateAll);
// init array of empty cells
    // ========= var name changed for explicitness =========
gridCells = new Array(16).fill(false);
// user score
var score = 0;
if (window.localStorage.getItem("scores") == null) {
    var scores = []
}
else {
    var scores = JSON.parse(window.localStorage.getItem("scores"));
}



// ===========================================================
// gridCells = new Array(16).fill(false);
// ===========================================================


// initialize board
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
    var grid1 = document.getElementById("grid-" + Math.floor(num1 / 4) + "-" +num1 % 4);
    grid1.innerHTML = (Math.random() < 0.5) ? 2 : 4;
    var grid2 = document.getElementById("grid-" + Math.floor(num2 / 4) + "-" +num2 % 4);
    grid2.innerHTML = (Math.random() < 0.5) ? 2 : 4;
    // score = parseInt(grid1.innerHTML) + parseInt(grid2.innerHTML);
    gridCells[num1] = true;
    gridCells[num2] = true;
    show_score(score);
    change_color();
}



// generate one number
function generate_number() {
    console.log("Call generate");
    // check game condition
    if(!check_game_over()) {
        num = Math.floor(Math.random() * 16);
        // find an empty cell
        // ======= board[Math.floor(num / 4)][num % 4] != 0 ============
        while(gridCells[num] == true) {
            num = Math.floor(Math.random() * 16);
        }
        grid = document.getElementById("grid-" + Math.floor(num / 4) + "-" +num % 4);
        grid.innerHTML = (Math.random() < 0.5) ? 2 : 4;
        // score+=parseInt(grid.innerHTML);
        show_score(score);
        gridCells[num] = true;
        change_color();
    }
}

function show_score(num) {
    window.localStorage.setItem("score", num);
    document.getElementById("score").innerHTML = num;
}

function update_gridCells() {
    for (let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            // init grid cells in 4*4 board
            if (document.getElementById("grid-" + i +"-" +j).innerHTML.length != 0) {
                gridCells[4*i + j] = true;
            }
            else {
                gridCells[4*i + j] = false;
            }

        }
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
    scores.push(score);
    window.localStorage.setItem("scores", JSON.stringify(scores));
    gameover();
    window.location.href = "gameover.html"
    return true;
}


function gameover(){
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)
    query='score=' + score;
    url = `/gameover`
    xhr.responseType = "json";   
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    xhr.send(query)
}
function responseHandler(){
    
}

function change_color() {
    for(let i = 0; i < 16; i++) {
        var grid = document.getElementById("grid-" + Math.floor(i/4) + "-" + i % 4);
        var gridCell = document.getElementById("grid_cell-" + Math.floor(i/4) + "-" + i % 4);
        if(grid.innerHTML.length == 0) {
            gridCell.style.backgroundColor = "rgb(245, 245, 220)";
        }
        else if(grid.innerHTML == 2) {
            gridCell.style.backgroundColor = "rgb(245, 243, 162)"; 
        }
        else if (grid.innerHTML == 4) {
            gridCell.style.backgroundColor = "rgb(255, 222, 122)";
        }
        else if(grid.innerHTML == 8) {
            gridCell.style.backgroundColor = "rgb(255, 205, 134)";
        }
        else if(grid.innerHTML == 16) {
            gridCell.style.backgroundColor = "rgb(255, 176, 134)";
        }
        else if(grid.innerHTML == 32) {
            gridCell.style.backgroundColor = "rgb(246, 137, 104)";
        }
        else if(grid.innerHTML == 64) {
            gridCell.style.backgroundColor = "rgb(255, 111, 104)";
        }
    }
}

function moveLeftHelper(move) {
    for (let i = 0; i < 4; i++) {
        let j = -1;
        do{
            j++;
            grid = document.getElementById("grid-" + i + "-" + j);
        }while(j < 4 && grid.innerHTML.length != 0)
        empty = j;
        // ignore column 1
        for (let n = j + 1; n < 4; n++) {
            grid = document.getElementById("grid-" + i + "-" + n);
            if (grid.innerHTML.length != 0) {
                document.getElementById("grid-" + i + "-" + empty).innerHTML = grid.innerHTML;
                grid.innerHTML = null;
                empty++;
                move = true;
                console.log("move numbers");
            }
        }
    }
    return move;
}

function moveLeft() {
    move = false;
    move = moveLeftHelper(move);

    for (let i = 0; i < 4; i++) {
        last_num = document.getElementById("grid-" + i + "-" + 0).innerHTML;
        if(last_num.length == 0) {
            continue;
        }
        for (let j = 1; j < 4; j++) {
            current_num = document.getElementById("grid-" + i + "-" + j).innerHTML;
            if(current_num.length == 0) {
                break;
            }
            else if(current_num === last_num) {
                num = j - 1;
                last_grid = document.getElementById("grid-" + i + "-" + num);
                last_grid.innerHTML = current_num * 2;
                score += current_num * 2;
                current_grid = document.getElementById("grid-" + i + "-" + j);
                current_grid.innerHTML = null;
                last_num = null;
                console.log("combine numbers");
                console.log("combine " + "grid-" + i + "-" + num + " and grid-" + i + "-" + j )
                move = true;
            }
            else {
                last_num = current_num
            }
        }
    }
    move = moveLeftHelper(move);

    if (move) {
        update_gridCells();
        change_color();
        generate_number();
    }
    else {
        check_game_over();
    }
}

function moveRightHelper(move) {
    for (let i = 0; i < 4; i++) {
        let j = 4;
        do{
            j--;
            grid = document.getElementById("grid-" + i + "-" + j);
        }while(j >=0 &&grid.innerHTML.length != 0)
        empty = j;
        // ignore column 1
        for (let n = j - 1; n >= 0; n--) {
            grid = document.getElementById("grid-" + i + "-" + n);
            if (grid.innerHTML.length != 0) {
                document.getElementById("grid-" + i + "-" + empty).innerHTML = grid.innerHTML;
                grid.innerHTML = null;
                empty--;
                move = true;
                console.log("move numbers");
            }
        }
    }
    return move;
}

function moveRight(){
    move = false;
    move = moveRightHelper(move);
    for (let i = 0; i < 4; i++) {
        last_num = document.getElementById("grid-" + i + "-" + 3).innerHTML;
        if(last_num.length == 0) {
            continue;
        }
        for (let j = 2; j >= 0; j--) {
            current_num = document.getElementById("grid-" + i + "-" + j).innerHTML;
            if(current_num.length == 0) {
                break;
            }
            else if(current_num === last_num) {
                num = j + 1;
                last_grid = document.getElementById("grid-" + i + "-" + num);
                last_grid.innerHTML = current_num * 2;
                score += current_num * 2;
                current_grid = document.getElementById("grid-" + i + "-" + j);
                current_grid.innerHTML = null;
                last_num = null;
                console.log("combine numbers");
                console.log("combine " + "grid-" + i + "-" + num + " and grid-" + i + "-" + j )
                move = true;
            }
            else {
                last_num = current_num
            }
        }
    }
    move = moveRightHelper(move);
    if (move) {
        update_gridCells();
        change_color();
        generate_number();
    }
    else {
        check_game_over();
    }
}

function moveUpHelper(move) {
    for (let j = 0; j < 4; j++) {
        let i = -1;
        do{
            i++;
            grid = document.getElementById("grid-" + i + "-" + j);
        }while(i < 4 && grid.innerHTML.length != 0)
        empty = i;
        // ignore column 1
        for (let n = i + 1; n < 4; n++) {
            grid = document.getElementById("grid-" + n + "-" + j);
            if (grid.innerHTML.length != 0) {
                document.getElementById("grid-" + empty + "-" + j).innerHTML = grid.innerHTML;
                grid.innerHTML = null;
                empty++;
                move = true;
                console.log("move numbers");
            }
        }
    }
    return move;
}

function moveUp() {
    move = false;
    move = moveUpHelper(move);
    for (let j = 0; j < 4; j++) {
        last_num = document.getElementById("grid-" + 0 + "-" + j).innerHTML;
        if(last_num.length == 0) {
            continue;
        }
        for (let i = 1; i < 4; i++) {
            current_num = document.getElementById("grid-" + i + "-" + j).innerHTML;
            if(current_num.length == 0) {
                break;
            }
            else if(current_num === last_num) {
                num = i - 1;
                last_grid = document.getElementById("grid-" + num + "-" + j);
                last_grid.innerHTML = current_num * 2;
                score += current_num * 2;
                current_grid = document.getElementById("grid-" + i + "-" + j);
                current_grid.innerHTML = null;
                last_num = null;
                move = true;
            }
            else {
                last_num = current_num
            }
        }
    }
    move = moveUpHelper(move);
    if (move) {
        update_gridCells();
        change_color();
        generate_number();
    }
    else {
        check_game_over();
    }
}

function moveDownHelper(move) {
    for (let j = 0; j < 4; j++) {
        let i = 4;
        do{
            i--;
            grid = document.getElementById("grid-" + i + "-" + j);
        }while(i >= 0 && grid.innerHTML.length != 0)
        empty = i;
        // ignore column 1
        for (let n = i - 1; n >= 0; n--) {
            grid = document.getElementById("grid-" + n + "-" + j);
            if (grid.innerHTML.length != 0) {
                document.getElementById("grid-" + empty + "-" + j).innerHTML = grid.innerHTML;
                grid.innerHTML = null;
                empty--;
                move = true;
                console.log("move numbers");
            }
        }
    }
    return move;
}

function moveDown() {
    move = false;
    move = moveDownHelper(move);
    for (let j = 0; j < 4; j++) {
        last_num = document.getElementById("grid-" + 3 + "-" + j).innerHTML;
        if(last_num.length == 0) {
            continue;
        }
        for (let i = 2; i >= 0; i--) {
            current_num = document.getElementById("grid-" + i + "-" + j).innerHTML;
            if(current_num.length == 0) {
                break;
            }
            else if(current_num === last_num) {
                num = i + 1;
                last_grid = document.getElementById("grid-" + num + "-" + j);
                last_grid.innerHTML = current_num * 2;
                score += current_num * 2;
                current_grid = document.getElementById("grid-" + i + "-" + j);
                current_grid.innerHTML = null;
                last_num = null;
                move = true;
            }
            else {
                last_num = current_num
            }
        }
    }
    move = moveDownHelper(move);
    if (move) {
        update_gridCells();
        change_color();
        generate_number();
    }
    else {
        check_game_over();
    }
}

// update game

document.addEventListener("keydown", function (event) {
    // Do nothing if the event was already processed
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
        event.preventDefault();
    }
    console.log("keydown detected")
    // if (event.defaultPrevented) {
    //   return;
    // }
    // handle 
    switch (event.key) {
      case "ArrowDown":
        // if successfully move to left, and move to left
        moveDown();
        break;
      case "ArrowUp":
        // code for "up arrow" key press.
        moveUp();
        break;
      case "ArrowLeft":
        // code for "left arrow" key press.
        moveLeft();
        break;
      case "ArrowRight":
        // code for "right arrow" key press.
        moveRight();
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, false);

function translateAll() {
    translateMain();
    translateHistory();
    translateNG();
}

function translateMain() {
    let text = document.getElementById("mainBtn").innerHTML;
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("load", handleMain);
    // let apiKey = "e0b6949dbfmsh5b51f951e165f81p143143jsne9c6d689d56f";
    xhr.open("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("X-RapidAPI-Host", "google-translate1.p.rapidapi.com");
    xhr.setRequestHeader("X-RapidAPI-Key", "65f5b18969msh81dcb0c5a531164p1ccaf3jsn04868a3a53a8");
    /* if it shows "translation error" when you test the code,
        thats probably because it exceeds the max num of requests.
        Please go to https://rapidapi.com/googlecloud/api/google-translate1/pricing
        so that you can apply for a new free API key and paste it into the API key field above
        and those in translateHistory() and translateNG().
    */
    let data = "q=" + text + "&target=de"
    xhr.send(data);
}
    
function handleMain() {
    let text = document.getElementById("mainBtn");
    if (this.status === 200) {
        object = JSON.parse(this.responseText)
        text.innerHTML = object.data.translations[0].translatedText;
    } else {
        text.innerHTML = "Translation Error";
    }
}

function translateHistory() {
    let text = document.getElementById("historyBtn").innerHTML;
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("load", handleHistory);
    // let apiKey = "e0b6949dbfmsh5b51f951e165f81p143143jsne9c6d689d56f";
    xhr.open("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("X-RapidAPI-Host", "google-translate1.p.rapidapi.com");
    xhr.setRequestHeader("X-RapidAPI-Key", "65f5b18969msh81dcb0c5a531164p1ccaf3jsn04868a3a53a8");

    let data = "q=" + text + "&target=de"
    xhr.send(data);
}
function handleHistory() {
    let text = document.getElementById("historyBtn");
    if (this.status === 200) {
        object = JSON.parse(this.responseText)
        text.innerHTML = object.data.translations[0].translatedText;
    } else {
        text.innerHTML = "Translation Error";
    }
}

function translateNG() {
    let text = document.getElementById("button").innerHTML;
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("load", handleNG);
    // let apiKey = "e0b6949dbfmsh5b51f951e165f81p143143jsne9c6d689d56f";
    xhr.open("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("X-RapidAPI-Host", "google-translate1.p.rapidapi.com");
    xhr.setRequestHeader("X-RapidAPI-Key", "65f5b18969msh81dcb0c5a531164p1ccaf3jsn04868a3a53a8");

    let data = "q=" + text + "&target=de"
    xhr.send(data);
}
function handleNG() {
    let text = document.getElementById("button");
    if (this.status === 200) {
        object = JSON.parse(this.responseText)
        text.innerHTML = object.data.translations[0].translatedText;
    } else {
        text.innerHTML = "Translation Error";
    }
}