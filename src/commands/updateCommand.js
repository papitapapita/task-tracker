import { updateController } from '../controllers/updateController.js';

export async function updateCommand(args) {
    try {
        const [id, update] = args;
        await updateController(id, update);
        console.log('Update completed succesfully.');
    } catch (error) {
        console.error(`Error updating task: ${error.message}`);
    }
}