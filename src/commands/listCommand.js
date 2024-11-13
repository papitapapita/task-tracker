import { listController } from '../controllers/listController.js';

export async function listCommand(args) {
    try {
        const [status] = args;
        await listController(status);
    } catch (error) {
        console.error(`Error listing tasks: ${error.message}`);
    }
}