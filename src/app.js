#!/usr/bin/env node
import { commands } from "./index.js";
import { argv } from 'node:process';

async function main() {
    const [command, ...args] = argv.slice(2);

    console.log(args);

    if (!commands[command]) {
        console.error(`Unknown command: ${command}`);
        console.log('Available commands: add, delete, list, mark');
        return;
    }

    try {
        await commands[command](args);
    } catch (error) {
        console.error(`Error executing command: ${error.message}`);
    }
}

main();



