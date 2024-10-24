# Task Tracker

## Description

**Task Tracker** is a simple command-line interface (CLI) application that allows users to manage their tasks. With this tool, you can track what you need to do, what you're currently working on, and what you've completed. Tasks are stored in a JSON file, making it easy to persist data between sessions.

## Features

- Add, update, and delete tasks.
- Mark tasks as in progress or done.
- List all tasks or filter tasks by their status (todo, in-progress, done).
- Tasks are stored in a JSON file in the current directory.
- The JSON file is automatically created if it does not exist.
- Easy-to-use command-line interface.

### Task Properties

Each task will have the following properties:

- `id`: A unique identifier for the task.
- `description`: A short description of the task.
- `status`: The status of the task (todo, in-progress, done).
- `createdAt`: The date and time when the task was created.
- `updatedAt`: The date and time when the task was last updated.
