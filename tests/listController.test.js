import { listController } from "../src/controllers/listController.js";
import { getTasksByStatus } from "../src/services/taskService.js";
import { Task } from "../src/models/task.js";

jest.mock('../src/services/taskService.js');

describe('listController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call getTasksByStatus and log tasks when status is valid', async () => {
        const status = 'todo';
        const mockTasks = [
            new Task('Test task 1', 1),
            new Task('Test task 2', 2)
        ];

        getTasksByStatus.mockResolvedValue(mockTasks);

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        await listController(status);

        expect(getTasksByStatus).toHaveBeenCalledWith(status);
        expect(consoleSpy).toHaveBeenCalledWith(`Tasks ${status}`);
        expect(consoleSpy).toHaveBeenCalledWith(`1, Test task 1`);
        expect(consoleSpy).toHaveBeenCalledWith(`2, Test task 2`);

        consoleSpy.mockRestore();
    });

    it('should call getTasksByStatus without arguments and log all tasks', async () => {
        const mockTasks = [
            new Task('Test task 1', 1),
            new Task('Test task 2', 2)
        ];

        mockTasks[1].status = 'in-progress';

        getTasksByStatus.mockResolvedValue(mockTasks);

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        await listController();

        expect(getTasksByStatus).toHaveBeenCalledWith(undefined);
        expect(consoleSpy).toHaveBeenCalledWith(`Tasks `);
        expect(consoleSpy).toHaveBeenCalledWith(`1, Test task 1`);
        expect(consoleSpy).toHaveBeenCalledWith(`2, Test task 2`);

        consoleSpy.mockRestore();
    })

    it('should log "No tasks to show" when no tasks are returned', async () => {
        const status = 'done';
        getTasksByStatus.mockResolvedValue([]);

        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
        
        await listController(status);

        expect(consoleSpy).toHaveBeenCalledWith('No tasks to show');

        consoleSpy.mockRestore();
    });

    it('should log error for unexpected status', async () => {
        const invalidStatus = 'invalid-status';

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await listController(invalidStatus);

        expect(consoleSpy).toHaveBeenCalledWith('Unexpected command');

        consoleSpy.mockRestore();
    });

    it('should log error if getTasksByStatus throws an error', async () => {
        const status = 'todo';
        const errorMessage = 'Service error';
        getTasksByStatus.mockRejectedValueOnce(new Error(errorMessage));
        
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await listController(status);

        expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
        
        consoleSpy.mockRestore();
    });
});