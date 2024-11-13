import { markController } from '../controllers/markController.js';

export async function markCommand(args) {
    try {
        const [status, id] = args;
        await markController(status, id);
        console.log('Status changed succesfully.');
    } catch (error) {
        console.error(`Error changing status of task: ${error.message}`);
    }
}