import { storage } from './storage.js';
import { createTaskCard } from './domUtils.js';

export class TaskManager {
    constructor() {
        this.tasks = storage.loadTasks();
        this.taskToDelete = null;
        this.searchQuery = ''; // ✅ store search query for filtering
    }

    // ------------------------
    // Add a new task
    // ------------------------
    addTask(title, description) {
        const task = { id: Date.now().toString(), title, description, status: 'todo' };
        this.tasks.push(task);
        this.saveAndRender();
        this.showSuccess('Task added successfully!');
    }

    // ------------------------
    // Move task to new status
    // ------------------------
    moveTask(id, newStatus) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.status = newStatus;
            this.saveAndRender();
        }
    }

    // ------------------------
    // Edit a task
    // ------------------------
    editTask(id, newTitle, newDescription) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            task.description = newDescription;
            this.saveAndRender();
            this.showSuccess('Task updated successfully!');
        }
    }

    // ------------------------
    // Delete a task
    // ------------------------
    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveAndRender();
        this.showSuccess('Task deleted successfully!');
    }

    // ------------------------
    // Save tasks to storage and render
    // ------------------------
    saveAndRender() {
        storage.saveTasks(this.tasks);
        this.renderTasks();
    }

    // ------------------------
    // Show temporary success message
    // ------------------------
    showSuccess(message) {
        const msgEl = document.getElementById('success-msg');
        msgEl.textContent = message;
        msgEl.classList.remove('hidden');
        setTimeout(() => msgEl.classList.add('hidden'), 2000);
    }

    // ------------------------
    // Render tasks
    // ------------------------
    renderTasks() {
        ['todo', 'inprogress', 'done'].forEach(status => {
            const container = document.getElementById(`${status}-list`);
            container.innerHTML = '';

            // ✅ Filter by status and search query
            const filteredTasks = this.tasks.filter(task => {
                const matchesStatus = task.status === status;
                const matchesSearch =
                    task.title.toLowerCase().includes(this.searchQuery) ||
                    task.description.toLowerCase().includes(this.searchQuery);
                return matchesStatus && matchesSearch;
            });

            // Render each task
            filteredTasks.forEach(task => {
                const card = createTaskCard(
                    task,
                    () => this.onEdit(task),
                    taskId => this.onDelete(taskId)
                );
                container.appendChild(card);
            });

            // Update task count
            const column = container.closest('.column');
            const countEl = column.querySelector('.task-count');
            if (countEl) {
                countEl.textContent = `(${filteredTasks.length})`;
            }
        });
    }

    // ------------------------
    // Edit task modal
    // ------------------------
    onEdit(task) {
        const modal = document.getElementById('edit-modal');
        const editTitle = document.getElementById('edit-title');
        const editDescription = document.getElementById('edit-description');
        modal.classList.remove('hidden');

        editTitle.value = task.title;
        editDescription.value = task.description;

        const saveBtn = document.getElementById('save-edit-btn');
        const cancelBtn = document.getElementById('cancel-edit-btn');

        const handleSave = () => {
            const newTitle = editTitle.value.trim();
            const newDesc = editDescription.value.trim();
            if (newTitle && newDesc) {
                this.editTask(task.id, newTitle, newDesc);
                modal.classList.add('hidden');
                cleanup();
            }
        };

        const handleCancel = () => {
            modal.classList.add('hidden');
            cleanup();
        };

        function cleanup() {
            saveBtn.removeEventListener('click', handleSave);
            cancelBtn.removeEventListener('click', handleCancel);
        }

        saveBtn.addEventListener('click', handleSave);
        cancelBtn.addEventListener('click', handleCancel);
    }

    // ------------------------
    // Delete task modal
    // ------------------------
    onDelete(taskId) {
        this.taskToDelete = taskId;
        const modal = document.getElementById('delete-modal');
        modal.classList.remove('hidden');

        const confirmBtn = document.getElementById('confirm-delete-btn');
        const cancelBtn = document.getElementById('cancel-delete-btn');

        const handleConfirm = () => {
            this.deleteTask(this.taskToDelete);
            modal.classList.add('hidden');
            cleanup();
        };

        const handleCancel = () => {
            modal.classList.add('hidden');
            cleanup();
        };

        function cleanup() {
            confirmBtn.removeEventListener('click', handleConfirm);
            cancelBtn.removeEventListener('click', handleCancel);
        }

        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', handleCancel);
    }
}
