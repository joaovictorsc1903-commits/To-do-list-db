class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }


    toggleComplete() {
        this.completed = !this.completed;
    }
}


class TaskManager {
    constructor() {
        this.taskList = document.getElementById('task-list');
        this.loadTasks();
    }


    async loadTasks() {
        const response = await fetch('/tasks');
        const tasks = await response.json();
        this.render(tasks);
    }


    async addTask(description) {
        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description })
        });
        this.loadTasks();
    }


    async removeTask(id) {
        await fetch(`/tasks/${id}`, { method: 'DELETE' });
        this.loadTasks();
    }


    async toggleTask(id) {
        await fetch(`/tasks/${id}/toggle`, { method: 'PATCH' });
        this.loadTasks();
    }


    render(tasks) {
        this.taskList.innerHTML = '';


        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';


            const span = document.createElement('span');
            span.textContent = task.description;
            span.addEventListener('click', () => this.toggleTask(task.id));


            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => this.removeTask(task.id));


            li.appendChild(span);
            li.appendChild(removeBtn);
            this.taskList.appendChild(li);
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');


    addTaskBtn.addEventListener('click', () => {
        const description = taskInput.value.trim();
        if (description) {
            taskManager.addTask(description);
            taskInput.value = '';
        }
    });


    taskInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') addTaskBtn.click();
    });
});

const addButton = document.querySelector('button');
const input = document.querySelector('input');
const taskList = document.createElement('ul');
document.querySelector('.container').appendChild(taskList);

addButton.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (taskText !== '') {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.background = '#dc3545';
    deleteBtn.style.color = 'white';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '4px';
    deleteBtn.style.padding = '4px 8px';
    deleteBtn.style.cursor = 'pointer';

    deleteBtn.addEventListener('click', () => {
      li.remove();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    input.value = '';
  }
});
