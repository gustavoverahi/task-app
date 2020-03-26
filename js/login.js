//Selecting the input of the login
const form = document.querySelector(".login-form");
const userName = document.querySelector("#input-username");
const userPassword = document.querySelector("#input-pass");

loginAccess();

function loginAccess() {
  form.addEventListener("submit", createUser);
}

//Store the user in LS
function createUser(e) {
  e.preventDefault();
  let users = Array({
    username: userName.value,
    password: userPassword.value
  });


  localStorage.setItem("user", JSON.stringify(users));
  location.href = "task.html";
}
