import { Task } from "../models/task.js";
import { addTask, loadTasks } from "../services/taskService.js";

async function addController(description) {
    try {
        if (description == undefined) {
            throw new Error('No arguments');
        }

        const tasks = await loadTasks();
        const id = tasks.at(-1).id + 1;

        const task = new Task(description, id);
        await addTask(task);
    } catch (error) {
        /*if (error.name !== 'TypeError' &&
            error.message !== 'Description cannot be empty') {
            }*/
            throw new Error(`Something went wrong: ${error.message}`);

        //console.error(error.message);
    }
}

export {
    addController
};