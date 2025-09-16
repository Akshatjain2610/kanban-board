import { storage } from './storage.js';
import { createTaskCard } from './domUtils.js';

export class TaskManager {
    constructor() {
        this.tasks = storage.loadTasks();
        this.taskToDelete = null;
    }

    addTask(title, description) {
        const task = { id: Date.now().toString(), title, description, status: 'todo' };
        this.tasks.push(task);
        this.saveAndRender();
        this.showSuccess('Task added successfully!');
    }

    moveTask(id, newStatus) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.status = newStatus;
            this.saveAndRender();
        }
    }

    editTask(id, newTitle, newDescription) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            task.description = newDescription;
            this.saveAndRender();
            this.showSuccess('Task updated successfully!');
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveAndRender();
        this.showSuccess('Task deleted successfully!');
    }

    saveAndRender() {
        storage.saveTasks(this.tasks);
        this.renderTasks();
    }

    showSuccess(message) {
        const msgEl = document.getElementById('success-msg');
        msgEl.textContent = message;
        msgEl.classList.remove('hidden');
        setTimeout(() => msgEl.classList.add('hidden'), 2000);
    }

    renderTasks() {
        ['todo', 'inprogress', 'done'].forEach(status => {
            const container = document.getElementById(`${status}-list`);
            container.innerHTML = '';

            const filteredTasks = this.tasks.filter(task => task.status === status);

            // Render tasks
            filteredTasks.forEach(task => {
                const card = createTaskCard(
                    task,
                    () => this.onEdit(task),
                    taskId => this.onDelete(taskId)
                );
                container.appendChild(card);
            });

            // ✅ Update count for this column
            const column = container.closest('.column');
            const countEl = column.querySelector('.task-count');
            if (countEl) {
                countEl.textContent = `(${filteredTasks.length})`;
            }
        });
    }

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
