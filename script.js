let tasks = [];

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