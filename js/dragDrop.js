export function enableDragAndDrop(taskManager) {
    document.querySelectorAll('.task-list').forEach(list => {
        list.addEventListener('dragover', e => e.preventDefault());
        list.addEventListener('drop', e => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData('text/plain');
            const newStatus = list.closest('.column').dataset.status;
            taskManager.moveTask(taskId, newStatus);
        });
    });

    const originalRender = taskManager.renderTasks.bind(taskManager);
    taskManager.renderTasks = () => {
        originalRender();
    };

    taskManager.renderTasks();
}