let allUsers;
let login =  document.getElementById("login-form");
let username = document.getElementById("username").value;
let password = document.getElementById("password").value;
let email = document.getElementById("email").value;

getAllUsers();

function getAllUsers() {
    fetch('https://dummyjson.com/users')
      .then((res) => res.json())
      .then((json) => {
        allUsers = json.users;
        console.log(allUsers);
      });
  }

  login.addEventListener("submit", auth);

function auth() {


     console.log(username);
     allUsers.forEach((users) => {

     if (username == `${users.username}`  && password == "111" && email == "admin@gmail.com") {
        alert("login successful");
     }  
     if (username === "" && password === "") {
          alert("Please enter information");
     } 
     else{
         alert("Please enter valid information");
         return;
     }
    });
}