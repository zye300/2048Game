function update(num){
    var new_score = document.createElement("p");
    new_score.innerHTML = num;
    document.body.append(new_score);
}

var scores = JSON.parse(window.localStorage.getItem("scores"));
console.log(window.localStorage.getItem("scores"));
console.log(scores);
scores.forEach(element => {
    update(element);
});
