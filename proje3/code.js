document.getElementById("username").addEventListener('focus', function(){
    this.placeholder = "";
})

document.getElementById("username").addEventListener('blur', function(){
    this.placeholder = "Username";
})

document.getElementById("password").addEventListener('focus', function(){
    this.placeholder = "";
})

document.getElementById("password").addEventListener('blur', function(){
    this.placeholder = "Password";
})