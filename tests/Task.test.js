import { Task } from '../src/models/task';

describe('Task Class', () => {
    test('should initialize with a unique ID', () => {
        const task1 = new Task('First task');
        const task2 = new Task('First task');
        expect(task1.id).toBe(0);
        expect(task2.id).toBe(1);
    });

    test('should throw an error for non-string descriptions', () => {
        expect(() => new Task(123)).toThrow(TypeError);
        expect(() => new Task(null)).toThrow(TypeError);
    });

    test('should throw an error for empty descriptions', () => {
        expect(() => new Task('').toThrow(Error));
    });

    test('should switch status correctly', () => {
        const task = new Task('Test task');
        expect(task.updatedAt).toEqual(task.createdAt);
        const initialStatus = task.status;
        task.switchStatus();
        expect(task.status).toBe(!initialStatus);
        expect(task.updatedAt).not.toEqual(task.createdAt);
    });

    test('should update the description', () => {
        const task = new Task('Initial Descriptor');
        task.description = 'Updated description';
        expect(taks.description).toBe('Updated description');
    });

    test('should validate description updates', () => {
        const task = new Task('Valid description');
        expect(() => task.description = '').toThrow(Error);
        expect(() => task.description = 123).toThrow(TypeError);
    });
});