let button = document.getElementById("button");
console.log(button);
button.addEventListener("click", init);

function init(){
    for (i = 0; i < 4; i++) {
        for(j = 0; j < 4; j++) {
            document.getElementById("grid-" + i +"-" +j).innerHTML=null;
        }
    }
    num1 = Math.floor(Math.random() * 15);
    num2 = Math.floor(Math.random() * 15);
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
}