#!/usr/bin/env node

import process from 'node:process';
import fs from 'node:fs';

const currentDirectory = process.cwd();

/*if (!fs.stat(`${currentDirectory}/tasks.json`)) {
    console.log('Hello there')
}
console.log(fs);
//fs.readFile('./tasks.json');*/

const userInput = process.argv.slice(2);



//switch()


