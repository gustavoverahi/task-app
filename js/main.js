const navBarMenu = document.querySelector(".nav-links");
const cardDescription = document.querySelector(".description-app");
const linkLogin = document.querySelector(".nav-link");

//get user
let user = JSON.parse(localStorage.getItem("user"));
if (user != null) {
  linkLogin.parentElement.remove();
  navBarMenu.innerHTML = `
    <li>
      <a class="nav-link" href="./task.html">${user[0].username}</a>
    </li>
    `;
} else {
  navBarMenu.innerHTML = `
  <li>
    <a class="nav-link" href="./login.html">log in</a>
  </li>
  `;
}
