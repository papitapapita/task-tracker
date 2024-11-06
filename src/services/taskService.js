import fs from 'node:fs/promises';
import path from 'node:path';
import { Task } from '../models/task.js';
const PATH = path.resolve('./');
const DIRECTORY_PATH = path.join(PATH, 'src/data');
const FILE_PATH = path.join(DIRECTORY_PATH, 'tasks.json');

async function initializeStorage() {
    try {
        await fs.access(FILE_PATH);
    } catch (error) {
        console.log(error);
        if (error.code === 'ENOENT') {
            console.log("Directory or file missing; creating new directory and file."); // Debug log
            await fs.mkdir(DIRECTORY_PATH, { recursive: true });
            await fs.writeFile(FILE_PATH, JSON.stringify([]));
        } else {
            throw new Error(`Failed to initialize storage: ${error.name}`);
        }
    }
}

async function loadTasks() {
  try {
    const data = await fs.readFile(FILE_PATH);
    const tasks = await JSON.parse(data);
    console.log(tasks);
    return tasks;
  } catch (error) {
    throw new Error(`Failed to read storage: ${error.message}`);
  }
}

async function saveTasks(tasks) {
  try {
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks));
  } catch (error) {
    throw new Error(`Failed to save tasks: ${error.message}`);
  }
}

async function addTask(task) {
  try {
    const tasks = await loadTasks();
    tasks.push(task);
    await saveTasks(tasks);
    return task;
  } catch (error) {
    throw new Error(`Failed to add task: ${error.message}`);
  }
}

async function updateTask(id, updates) {
  try {
    const tasks = await loadTasks();
    const index = tasks.findIndex((task) => task.id == id);

    if (index === -1) throw new Error(`Task with id:${id} not found`);

    tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date() };
    await saveTasks(tasks);
    return tasks[index];
  } catch (error) {
    throw new Error(`Failed to update task: ${error.message}`);
  }
}

updateTask

async function deleteTask(id) {
  try {
    const tasks = await loadTasks();
    const index = tasks.findIndex((task) => task.id == id);

    if (index === -1) throw new Error(`Task with id: ${id} not found`);

    const task = tasks.slice(index, 1);

    saveTasks(tasks);
    return task;
  } catch (error) {
    throw new Error(`Failed to delete task: ${error.message}`);
  }
}

async function getTasksByStatus(status) {
  try {
    const tasks = await loadTasks();
    return tasks.filter((task) => task.status === status);
  } catch (error) {
    throw new Error(`Failed to get tasks by status: ${error.message}`);
  }
}

export {
  initializeStorage,
  loadTasks,
  saveTasks,
  addTask,
  updateTask,
  deleteTask,
  getTasksByStatus,
};
