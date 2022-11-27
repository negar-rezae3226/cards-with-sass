let allUsers;
let loginUserApi;
let login = document.getElementById("login-form");

//#region API
// loginSubmit();
getAllUsers();
// loginUsersAPI();

// console.log(username);

function getAllUsers() {
  fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((json) => {
      allUsers = json.users;
      console.log(allUsers);
    });
}

// function loginUsersAPI(){

// }

//#endregion

//#region login

function loginSubmit() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  
  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      loginUserApi = json.username;
      pass = json.password;
      console.log(loginUserApi);

      if (username === loginUserApi && password === pass) {
        alert("ورود شما با موفقیت انجام شد :) ");

        return;
      }
      if (username === "" && password === "") {
        alert("لطفا اطلاعات را وارد کنید");
        return;
      } else {
        alert("اطلاعات وارد شده صحیح نمی باشد");
        return;
      }
    });
}

//#endregion
