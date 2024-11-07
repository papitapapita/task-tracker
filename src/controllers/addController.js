import { Task } from "../models/task.js";
import { addTask } from "../services/taskService.js";

let idCounter = 0;

async function addController(description) {
    try {
        if (description == undefined) {
            throw new Error('No arguments');
        }

        const task = new Task(description, idCounter++);
        await addTask(task);
    } catch (error) {
        if (error.name !== 'TypeError' &&
            error.message !== 'Description cannot be empty') {
            throw new Error(`Something went wrong: ${error.message}`);
        }

        console.error(error.message);
    }
}

export {
    addController
};