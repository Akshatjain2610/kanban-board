export function createTaskCard(task, onEdit, onDelete) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.draggable = true;
    card.dataset.id = task.id;
    card.innerHTML = `
        <h4>${task.title}</h4>
        <p>${task.description}</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    card.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', task.id);
    });

    card.querySelector('.edit-btn').addEventListener('click', () => onEdit(task));
    card.querySelector('.delete-btn').addEventListener('click', () => onDelete(task.id));

    return card;
}
