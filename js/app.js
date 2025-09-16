import { TaskManager } from './taskManager.js';
import { enableDragAndDrop } from './dragDrop.js';

const taskManager = new TaskManager();
enableDragAndDrop(taskManager);

// Initial render
taskManager.renderTasks();

// Save form data temporarily
document.addEventListener('DOMContentLoaded', () => {
    const savedTitle = localStorage.getItem('task-title');
    const savedDesc = localStorage.getItem('task-desc');
    if (savedTitle) document.getElementById('task-title').value = savedTitle;
    if (savedDesc) document.getElementById('task-desc').value = savedDesc;
});

document.getElementById('task-title').addEventListener('input', e => {
    localStorage.setItem('task-title', e.target.value);
});

document.getElementById('task-desc').addEventListener('input', e => {
    localStorage.setItem('task-desc', e.target.value);
});

document.getElementById('add-task-btn').addEventListener('click', () => {
    const title = document.getElementById('task-title').value.trim();
    const description = document.getElementById('task-desc').value.trim();

    if (title && description) {
        taskManager.addTask(title, description);
        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
        localStorage.removeItem('task-title');
        localStorage.removeItem('task-desc');
    }
});
