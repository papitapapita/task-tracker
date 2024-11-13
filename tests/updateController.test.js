import { updateController } from "../src/controllers/updateController.js";
import { updateTask } from "../src/services/taskService.js";

jest.mock('../src/services/taskService.js');

describe('updateController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should log error if no arguments', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await updateController(1, undefined);
        expect(consoleSpy).toHaveBeenCalledWith('No arguments');

        await updateController(undefined, 'update task');
        expect(consoleSpy).toHaveBeenCalledWith('No arguments');

        consoleSpy.mockRestore();
    });

    it('should log error if wrong id type', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await updateController('123gs', 'done');
        expect(consoleSpy).toHaveBeenCalledWith('id must be an integer number');

        await updateController(1.2, 'done');
        expect(consoleSpy).toHaveBeenCalledWith('id must be an integer number');

        consoleSpy.mockRestore();
    });

    it('should update the task', async () => {
        const description = 'test update';
        const id = 1;

        await updateController(id, description);
        expect(updateTask).toHaveBeenCalledWith(id, { description });
    });

    it('should log an error if updateTask throws an unexpected error', async () => {
        const status = 'in-progress';
        const id = 2;
        const unexpectedErrorMessage = 'Service failure';

        updateTask.mockRejectedValueOnce(new Error(unexpectedErrorMessage));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await expect(updateController(id, status)).rejects.toThrow(
            new Error(`Something went wrong: ${unexpectedErrorMessage}`)
        );

        expect(consoleSpy).not.toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});