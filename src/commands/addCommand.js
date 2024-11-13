import { addController } from "../controllers/addController.js";

export async function addCommand(args) {
    try {
        const [description] = args;
        await addController(description);
        console.log('Task added succesfully.');
    } catch (error) {
        console.error(`Error adding task: ${error.message}`);
    }
}