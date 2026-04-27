//Test comment

let tasks = [];
let users = JSON.parse(localStorage.getItem("users")) || [];

function checkAuth() {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

function addTask() {
  let input = document.getElementById("taskInput");
  let category = document.getElementById("taskCategory");

  if (input.value.trim() === "") return;

  let task = {
    text: input.value,
    category: category.value,
    completed: false
  };

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();

  input.value = "";
}

function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  let completed = 0;

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    if (task.completed) completed++;

    list.innerHTML += `
      <li style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
        [${task.category}] ${task.text}
        <button onclick="completeTask(${i})">Complete</button>
        <button onclick="deleteTask(${i})">Delete</button>
      </li>
    `;
  }

  let tracker = document.getElementById("taskTracker");
  tracker.textContent = `${completed}/${tasks.length} tasks completed`;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function completeTask(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

function loadTasks() {
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    displayTasks();
  }
}

function togglePassword(inputId, buttonId) {
  let input = document.getElementById(inputId);
  let button = document.getElementById(buttonId);
  if (input.type === "password") {
    input.type = "text";
    button.textContent = "Hide";
  } else {
    input.type = "password";
    button.textContent = "Show";
  }
}

function handleLogin(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password");
  }
}

function handleSignup(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  let existingUser = users.find(u => u.username === username);
  if (existingUser) {
    alert("Username already exists");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedIn", "true");
  window.location.href = "index.html";
}

if (window.location.pathname.endsWith("index.html")) {
  window.onload = function() {
    checkAuth();
    loadTasks();
  };
} else if (window.location.pathname.endsWith("login.html")) {
  window.onload = function() {
    document.getElementById("loginForm").addEventListener("submit", handleLogin);
    document.getElementById("togglePassword").addEventListener("click", () => togglePassword("password", "togglePassword"));
  };
} else if (window.location.pathname.endsWith("signup.html")) {
  window.onload = function() {
    document.getElementById("signupForm").addEventListener("submit", handleSignup);
    document.getElementById("togglePassword").addEventListener("click", () => togglePassword("password", "togglePassword"));
    document.getElementById("toggleConfirmPassword").addEventListener("click", () => togglePassword("confirmPassword", "toggleConfirmPassword"));
  };
}