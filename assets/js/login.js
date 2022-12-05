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
      // loginSubmit();
    });
}

// function loginUsersAPI(){

// }

//#endregion

//#region login

function loginSubmit() {
  // event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  loginApi(username, password);
}

function loginApi(userName, password) {
  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: userName,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("login", "login successfull");
      window.location.replace("http://127.0.0.1:5500/index.html");
    });
}

//#endregion
