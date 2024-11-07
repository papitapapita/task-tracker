import { deleteController } from "../src/controllers/deleteController.js";
import { deleteTask } from "../src/services/taskService.js";

jest.mock('../src/services/taskService.js');

describe('deleteController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a task with a valid id', async () => {
        const id = 1;

        await deleteController(id);

        expect(deleteTask).toHaveBeenCalledWith(id)
    });

    it('should log error if no arguments', async () => {
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        await deleteController();

        expect(consoleSpy).toHaveBeenCalledWith('No arguments');
        consoleSpy.mockRestore();
    });

    it('should log error if no type integer number', async () => {
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        await deleteController('a');
        expect(consoleSpy).toHaveBeenCalledWith('id must be an integer number');

        await deleteController('1.2');
        expect(consoleSpy).toHaveBeenCalledWith('id must be an integer number');

        consoleSpy.mockRestore();
    });

    it('should log error if deleteTask fails', async () => {
        const id = 1;
        const errorMessage = "Deletion failed";
        deleteTask.mockRejectedValueOnce(new Error(errorMessage));
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await deleteController(id);

        expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
        consoleSpy.mockRestore();
    });
});