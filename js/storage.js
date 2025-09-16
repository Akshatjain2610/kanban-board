const STORAGE_KEY = 'kanban-tasks';

export const storage = {
    saveTasks: tasks => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)),
    loadTasks: () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
};
