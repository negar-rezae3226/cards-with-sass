let allUsers;
let login = document.getElementById("login-form");
// let username = document.getElementById("username").value;
// let password = document.getElementById("password").value;
// let email = document.getElementById("email");

//#region API

getAllUsers();

function getAllUsers() {
  fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((json) => {
      allUsers = json.users;
      console.log(allUsers);
    });
}

//#endregion

//#region login

function loginUser() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;

  for (let index = 0; index < allUsers.length; index++) {

    if (username === allUsers[index].username && password === allUsers[index].password && email === allUsers[index].email) {
      
      alert("ورود شما با موفقیت انجام شد :) ");

      return;
    } 
    if (username === "" ) {
      alert('fgbgfg')
    }
    else {
      alert("کاربر با این اطلاعات در سیستم ثبت نشده است");
      return;
    }
  }
}

//#endregion
