import fs from 'node:fs/promises';
import { Task } from '../src/models/task.js';
import path from 'node:path';
const PATH = path.resolve('./');
const DIRECTORY_PATH = path.join(PATH, 'src/data');
const FILE_PATH = path.join(DIRECTORY_PATH, 'tasks.json');

import {
    initializeStorage,
    loadTasks,
    addTask,
    updateTask,
} from '../src/services/taskService.js';

jest.mock('node:fs/promises');

describe('initializeStorage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should not create a new file if it already exists', async () => {
        fs.access.mockResolvedValue();

        await initializeStorage();

        expect(fs.mkdir).not.toHaveBeenCalled();
        expect(fs.writeFile).not.toHaveBeenCalled();
    });

    it('should create directory and file if they do not exist', async () => {
        fs.access.mockRejectedValue({ code: 'ENOENT' });
        fs.mkdir.mockResolvedValue();
        fs.writeFile.mockResolvedValue();

        await initializeStorage();

        expect(fs.mkdir).toHaveBeenCalledWith(DIRECTORY_PATH, { recursive: true });
        expect(fs.writeFile).toHaveBeenCalledWith(FILE_PATH, JSON.stringify([]));
    });

    it('should throw an error if there is an unexpected issue accessing the file', async () => {
        const error = new Error('Unexpected error');
        fs.access.mockRejectedValue(error);

        await expect(initializeStorage()).rejects.toThrow(`Failed to initialize storage: ${error.name}`);
    });
});

describe('loadTasks', () => {
    it('should load tasks from the file', async () => {
        const mockTasks = [new Task('run'), new Task('climb')];
        fs.readFile.mockResolvedValue(JSON.stringify(mockTasks));

        const tasks = await loadTasks();
        expect(tasks).toEqual(JSON.parse(JSON.stringify(mockTasks)));
    });

    it('should throw an error if loading fails', async () => {
        fs.readFile.mockRejectedValue(new Error('Read error'));
        await expect(loadTasks()).rejects.toThrow('Failed to read storage: Read error');
    });
});

describe('addTask', () => {
    it('should add a new task and save it', async () => {
        const task = new Task('New task');
        const tasks = [];

        fs.readFile.mockResolvedValue(JSON.stringify(tasks));
        fs.writeFile.mockResolvedValue();

        await addTask(task);
        expect(fs.writeFile).toHaveBeenCalledWith(FILE_PATH, JSON.stringify([task]));
    });
});

describe('updateTask', () => {
    it('should update task by id', async () => {
        const mockTasks = [new Task('Test task'), new Task('Test task 2')];
        const updates = { description: 'Updated task' };

        fs.readFile.mockResolvedValue(JSON.stringify(mockTasks));
        fs.writeFile.mockResolvedValue();

        const updatedTask = await updateTask(3, updates);
        expect(updatedTask.description).toBe('Updated task');
        expect(fs.writeFile).toHaveBeenCalled();
    });
});