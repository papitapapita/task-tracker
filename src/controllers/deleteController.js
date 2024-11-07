import { deleteTask } from "../services/taskService.js";

async function deleteController(id) {
    try {
        if (id == undefined) throw new Error('No arguments');
        if (Number.isNaN(id) || !Number.isInteger(id)) throw new TypeError('id must be an integer number');
        await deleteTask(id);
    } catch (error) {
        console.error(error.message);
    }
}

export {
    deleteController
};