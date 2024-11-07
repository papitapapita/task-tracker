import { addController } from "../src/controllers/addController.js";
import { addTask } from "../src/services/taskService.js";

jest.mock('../src/services/taskService.js')

describe('addController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('should call addTask with a new Task when given a valid description', async () => {
        const description = 'Test Task';

        await addController(description);

        expect(addTask).toHaveBeenCalledTimes(1);
        expect(addTask).toHaveBeenCalledWith(expect.objectContaining({
            id: expect.any(Number),
            description
        }));
    });

    it('should throw an error if no arguments', async () => {
        await expect(addController()).rejects.toThrow('Something went wrong: No arguments');
    });

    it('should throw an error if description is an empty array', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await addController('');

        expect(consoleSpy).toHaveBeenCalledWith('Description cannot be empty');
        consoleSpy.mockRestore();
    });

/*
    it('add task to file', async () => {
        await addController('Run');
    });*/
});