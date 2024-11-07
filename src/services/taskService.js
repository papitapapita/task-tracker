import fs from 'node:fs/promises';
import path from 'node:path';
const PATH = path.resolve('./');
const DIRECTORY_PATH = path.join(PATH, 'src/data');
const FILE_PATH = path.join(DIRECTORY_PATH, 'tasks.json');

async function initializeStorage() {
  try {
    await fs.access(FILE_PATH);
  } catch (error) {
    if (error.code === 'ENOENT') {  
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

async function deleteTask(id) {
  try {
    const tasks = await loadTasks();
    const newTasks = tasks.filter((task) => task.id != id);
    saveTasks(newTasks);
  } catch (error) {
    throw new Error(`Failed to delete task: ${error.message}`);
  }
}

async function getTasksByStatus(status) {
  try {
    const tasks = await loadTasks();
    if (status === undefined) return tasks;
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
