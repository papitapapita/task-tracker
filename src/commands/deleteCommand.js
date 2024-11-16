import { deleteController } from '../controllers/deleteController.js';

export async function deleteCommand(args) {
    try {
        const [id] = args;
        await deleteController(parseInt(id));
        console.log('Task deleted succesfully.');
    } catch (error) {
        console.error(`Error deleting task: ${error.message}`);
    }
}