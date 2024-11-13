import { updateTask } from "../services/taskService.js";

const statuses = ['todo', 'in-progress', 'done'];
const errorMessages = ['No arguments', 'Unexpected status', 'id must be an integer number'];

async function markController(status, id) {
    try {
        if (status == undefined || id == undefined) {
             throw new Error(errorMessages[0]);
        }
        if (!statuses.includes(status)) {
            throw new Error(errorMessages[1]);
        }
        if (Number.isNaN(id) || !Number.isInteger(id)) {
            throw new TypeError(errorMessages[2]);
        }

        await updateTask(id, {status});
    } catch (error) {
        if ( !errorMessages.includes(error.message) ) {
            throw new Error(`Something went wrong: ${error.message}`);
        }

        console.error(error.message);
    }
}

export {markController}