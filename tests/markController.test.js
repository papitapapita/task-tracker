import { markController } from "../src/controllers/markController.js";
import { updateTask } from "../src/services/taskService.js";

jest.mock('../src/services/taskService.js');

describe('markController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should log error if no arguments', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await markController(undefined, 1);
        expect(consoleSpy).toHaveBeenCalledWith('No arguments');

        await markController('done', undefined);
        expect(consoleSpy).toHaveBeenCalledWith('No arguments');

        consoleSpy.mockRestore();
    });

    it('should log error if unexpected status', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await markController('completed', 1);
        expect(consoleSpy).toHaveBeenCalledWith('Unexpected status');

        consoleSpy.mockRestore();
    });

    it('should log error if wrong id type', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await markController('done', '123gs');
        expect(consoleSpy).toHaveBeenCalledWith('id must be an integer number');

        await markController('done', 1.2);
        expect(consoleSpy).toHaveBeenCalledWith('id must be an integer number');

        consoleSpy.mockRestore();
    });

    it('should update the status', async () => {
        const status = 'done';
        const id = 1;

        await markController(status, id);
        expect(updateTask).toHaveBeenCalledWith(id, { status });
    });

    test('should log an error if updateTask throws an unexpected error', async () => {
        const status = 'in-progress';
        const id = 2;
        const unexpectedErrorMessage = 'Service failure';

        updateTask.mockRejectedValueOnce(new Error(unexpectedErrorMessage));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await expect(markController(status, id)).rejects.toThrow(
            new Error(`Something went wrong: ${unexpectedErrorMessage}`)
        );

        expect(consoleSpy).not.toHaveBeenCalled();

        consoleSpy.mockRestore();
    });
});