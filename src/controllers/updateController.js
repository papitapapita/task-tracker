import { updateTask } from '../services/taskService.js';

const errorMessages = ['No arguments', 'id must be an integer number'];

export async function updateController(id, update) {
    try {
        if (update == undefined || id == undefined) {
            throw new Error(errorMessages[0]);
        }
        if (Number.isNaN(id) || !Number.isInteger(id)) {
            throw new TypeError(errorMessages[1]);
        }

        await updateTask(parseInt(id), { description: update });
    } catch (error) {
        if ( !errorMessages.includes(error.message) ) {
            throw new Error(`Something went wrong: ${error.message}`);
        }

        console.error(error.message);
    }
}