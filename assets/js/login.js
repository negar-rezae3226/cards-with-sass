let allUsers;
let loginUserApi;
let login = document.getElementById("login-form");

//#region API

getAllUsers();

function getAllUsers() {
  fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((json) => {
      allUsers = json.users;
      console.log(allUsers);
      // loginSubmit();
    });
}
document.getElementById("login").addEventListener("click", function(event){
  event.preventDefault();
});

//#endregion

//#region login

function loginSubmit() {
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
    .then((res) =>
      res.json().then((data) => ({ status: res.status, body: data }))
    )
    .then((res) => {
      if (res.status == 200) {
        localStorage.setItem("login", "login successfull");
        window.location.replace("http://127.0.0.1:5500/index.html");
      } 
      else{
        addAttributeModal();
      }
    });
}

//#endregion


function addAttributeModal() {
  let setAttributeCard = document.getElementById("login");
  setAttributeCard.setAttribute("data-target", "#myModal");
  setAttributeCard.setAttribute("data-toggle", "modal");
}
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}