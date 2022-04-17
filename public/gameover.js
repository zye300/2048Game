function show_score() {
    document.getElementById("score").innerHTML = window.localStorage.getItem("score");
}

show_score();