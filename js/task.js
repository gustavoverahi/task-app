// vars to select elements
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#input-task");
const taskList = document.querySelector(".task-list");
const taskFilter = document.querySelector("#input-search");
const taskBox = document.querySelector(".task");
const deleteBtn = document.querySelector(".delete-task");
const navBarUser = document.querySelector(".nav-link");
const logOut = document.querySelector(".log-out");

//get username in the task page

let user = JSON.parse(localStorage.getItem("user"));

if (user != null) {
  navBarUser.innerHTML = `<p class="link-user">${user[0].username}</p>`;
}

runEvents();

function runEvents() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  taskFilter.addEventListener("keyup", searchTask);
  logOut.addEventListener("click", logOutEvent);
}

function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    //create a new element
    const taskNew = document.createElement("div");

    //Add a classname
    taskNew.className = "task";

    //create a new element
    const taskContent = document.createElement("p");

    //Add a className
    taskContent.className = "box-content";

    //create a node text
    taskContent.appendChild(document.createTextNode(task));

    //Create a new element
    const deleteLink = document.createElement("a");

    //Add a className
    deleteLink.className = "delete-task";

    //Add a Icon
    deleteLink.innerHTML = '<i class="fas fa-times"></i>';

    //append the all elements to taskNew
    taskNew.appendChild(taskContent);
    taskContent.appendChild(deleteLink);

    //append the element taskNew to taskList
    taskList.appendChild(taskNew);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("give me a task please!!");
  } else {
    //create a new element
    const taskNew = document.createElement("div");

    //Add a classname
    taskNew.className = "task";

    //create a new element
    const taskContent = document.createElement("p");

    //Add a className
    taskContent.className = "box-content";

    //create a node text
    taskContent.appendChild(document.createTextNode(taskInput.value));

    //Create a new element
    const deleteLink = document.createElement("a");

    //Add a className
    deleteLink.className = "delete-task";

    //Add a Icon
    deleteLink.innerHTML = '<i class="fas fa-times"></i>';

    //append the all elements to taskNew
    taskNew.appendChild(taskContent);
    taskContent.appendChild(deleteLink);

    //append the element taskNew to taskList
    taskList.appendChild(taskNew);

    //Store in LS
    tasksLocalStorage(taskInput.value);

    //clear input
    taskInput.value = "";
  }

  e.preventDefault();
}

function tasksLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-task")) {
    e.target.parentElement.parentElement.parentElement.remove();
  }
  removeTasksFromLS(e.target.parentElement.parentElement.parentElement);
}

function removeTasksFromLS(taskItem) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function searchTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".task").forEach(function(task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function logOutEvent() {
  if (confirm("If you log out everything is gone, you wanna this ?")) {
    localStorage.clear();
    location.href = "main.html";
  }
}
