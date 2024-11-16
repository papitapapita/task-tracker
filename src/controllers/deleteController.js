import { deleteTask } from "../services/taskService.js";

async function deleteController(id) {
    try {
        if (id == undefined) throw new Error('No arguments');
        if (Number.isNaN(id) || !Number.isInteger(parseInt(id))) throw new TypeError('id must be an integer number');
        await deleteTask(parseInt(id));
    } catch (error) {
        throw new Error(error.message);
    }
}

export {
    deleteController
};