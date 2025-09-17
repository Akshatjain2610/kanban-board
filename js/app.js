import { TaskManager } from './taskManager.js';
import { enableDragAndDrop } from './dragDrop.js';

// Initialize TaskManager
const taskManager = new TaskManager();
enableDragAndDrop(taskManager);

// Initial render
taskManager.renderTasks();

// ------------------------
// Save form data temporarily
// ------------------------
document.addEventListener('DOMContentLoaded', () => {
    const savedTitle = localStorage.getItem('task-title');
    const savedDesc = localStorage.getItem('task-desc');
    const savedSearch = localStorage.getItem('task-search');

    if (savedTitle) document.getElementById('task-title').value = savedTitle;
    if (savedDesc) document.getElementById('task-desc').value = savedDesc;
    if (savedSearch) {
        document.getElementById('search-box').value = savedSearch;
        taskManager.searchQuery = savedSearch.toLowerCase();
    }
});

// ------------------------
// Form input listeners
// ------------------------
document.getElementById('task-title').addEventListener('input', e => {
    localStorage.setItem('task-title', e.target.value);
});

document.getElementById('task-desc').addEventListener('input', e => {
    localStorage.setItem('task-desc', e.target.value);
});

// ------------------------
// Add Task
// ------------------------
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

// ------------------------
// Debounce helper function
// ------------------------
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ------------------------
// Search functionality with 500ms debounce
// ------------------------
const searchInput = document.getElementById('search-box');

searchInput.addEventListener(
    'input',
    debounce(e => {
        const query = e.target.value.toLowerCase();
        taskManager.searchQuery = query;
        localStorage.setItem('task-search', query); // persist search query
        taskManager.renderTasks();
    }, 500)
);
