import { getTasksByStatus } from "../services/taskService.js";

const statuses = ['todo', 'in-progress', 'done'];

async function listController(status) {
    try {
        if (!statuses.includes(status) && status !== undefined) {
            throw new Error('Unexpected command');
        }

        const tasks = await getTasksByStatus(status);

        if (tasks.length === 0) {
            console.log('No tasks to show');
            return;
        }

        console.log(`Tasks ${status || ''}`);
        tasks.forEach(task => {
            console.log(`${task.id}, ${task.description}`);
        });
    } catch (error) {
        console.error(error.message);
    }
}

export {listController};