function addTask() {
  let input = document.getElementById("taskInput");
  let category = document.getElementById("taskCategory");
  let list = document.getElementById("taskList");

  list.innerHTML += `
    <li>
      [${category.value}] ${input.value}
      <button onclick="completeTask(this)">Complete</button>
      <button onclick="deleteTask(this)">Delete</button>
    </li>
  `;

  input.value = "";
}

function deleteTask(btn) {
  btn.parentElement.remove();
}

function completeTask(btn) {
  btn.parentElement.style.textDecoration = "line-through";
}