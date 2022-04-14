let button = document.getElementById("button");
console.log(button);
button.addEventListener("click", init);
array = new Array(16).fill(false);

function init(){
    for (i = 0; i < 4; i++) {
        for(j = 0; j < 4; j++) {
            document.getElementById("grid-" + i +"-" +j).innerHTML=null;
        }
    }
    num1 = Math.floor(Math.random() * 16);
    num2 = Math.floor(Math.random() * 16);
    while(num2 == num1) {
        num2 = Math.floor(Math.random() * 16);
    }
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
    array[num1] = true;
    array[num2] = true;
}

function generate_number() {
    console.log("Call generate")
    if(!check_game_over()) {
        num = Math.floor(Math.random() * 16);
        while(array[num] == true) {
            num = Math.floor(Math.random() * 16);
        }
        if(Math.random() < 0.5) {
            document.getElementById("grid-" + Math.floor(num/4) + "-" +num%4).innerHTML = 2;
        }
        else{
            document.getElementById("grid-" + Math.floor(num/4) + "-" +num%4).innerHTML = 4;
        }
        array[num] = true;

    }


}

function check_game_over() {
    console.log("call check game over")
    for(i = 0; i < 16; i++) {
        if(!array[i]) {
            console.log("Not Game over")
            return false;
        }
    }
// TODO: add a gameover screen
    console.log("Game over")
    return true;
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      case "ArrowDown":
        // code for "down arrow" key press.
        generate_number();
        
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