let registerButton = document.getElementById("register");
let username = document.getElementById("username");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm_password");

function register(event){
    event.preventDefault()
    console.log(password.value);
    console.log(confirmPassword.value);
    if (password.value === confirmPassword.value && isValid(password.value)){
        console.log("Password matches!");
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("load", responseHandler);
        query=`username=${username.value}&password=${password.value}`;
        // when submitting a GET request, the query string is appended to URL
        // but in a POST request, do not attach the query string to the url
        // instead pass it as a parameter in xhr.send()
        url = `/register`;
        xhr.responseType = "json";   
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // notice the query string is passed as a parameter in xhr.send()
        // this is to prevent the data from being easily sniffed
        console.log(query);
        xhr.send(query);
    } else{
        message.style.display = "block";
        message.innerText = "Invalid passwords or Passwords don't match";
    }
    
}

function responseHandler(){
    let message = document.getElementById("message")
    message.style.display = "block"
    if (this.response.success){    
        message.innerText = this.response.message
    }else{
        console.log(this.response.success)
        message.innerText = this.response.message
    }
}
console.log(username)
registerButton.addEventListener("click", register)


function isValid(str) {
    return (/[a-z]/.test(str) && /[A-Z]/.test(str) && /[0-9]/.test(str));
}

function checkPassword() {
    let password = document.getElementById("password");
    if (isValid(password.value)) {
        password.style.backgroundColor = "#00FF7F";
    } else {
        password.style.backgroundColor = "#F08080";
    }
    checkConfirm();
}

function checkConfirm() {
    let confirm = document.getElementById("confirm_password");
    let password = document.getElementById("password");
    if (confirm.value === password.value) {
        confirm.style.backgroundColor = "#00FF7F";
    } else {
        confirm.style.backgroundColor = "#F08080";
    } 
}

let passwordBox = document.getElementById("password");
passwordBox.addEventListener("input", checkPassword);

let confirmBox = document.getElementById("confirm_password");
confirmBox.addEventListener("input", checkConfirm);