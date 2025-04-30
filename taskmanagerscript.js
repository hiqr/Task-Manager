const form = document.getElementById('taskForm');
const taskManager = document.getElementById('taskmanager');

let tasks = []; // Array to store tasks

// Event listener for form submission
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get the task name, priority, and important checkbox information
  const name = document.getElementById('taskName').value.trim();
  const priority = document.getElementById('taskPriority').value;
  const isImportant = document.getElementById('taskImportant').checked;
  const date = new Date().toLocaleString();

  // If empty toggle alert and return
  if (!name) {
    alert("Task name cannot be empty.");
    return;
  }

  // Creating new task with the data collected
  const task = {
    id: Date.now(),
    name,
    priority,
    isImportant,
    isCompleted: false,
    date
  };

  tasks.push(task);
  renderTasks();
  form.reset();
});

// Function to render tasks
function renderTasks() {
  taskManager.innerHTML = '';

  // Loop through each task and create the HTML elements to display it
  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    // If the task is important, add 'important' class
    if (task.isImportant) taskDiv.classList.add('important');
    // If the task is completed, add the 'completed' class
    if (task.isCompleted) taskDiv.classList.add('completed');

    taskDiv.innerHTML = `
      <strong>${task.name}</strong> <br>
      Priority: <span class="priority-${task.priority.toLowerCase()}">${task.priority}</span> <br>
      Date: ${task.date} <br>
      <label><input type="checkbox" onchange="toggleComplete(${task.id})" ${task.isCompleted ? 'checked' : ''}> Completed</label>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    
    // Append the task div to the task manager container
    taskManager.appendChild(taskDiv);
  });

  console.log(JSON.stringify(tasks));
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
  );
  renderTasks();
}

// Function to delete a task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

const darkModeToggle = document.getElementById('darkModeToggle');

// Event listener for toggling dark mode on or off
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
