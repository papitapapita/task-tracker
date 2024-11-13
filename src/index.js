import { addCommand } from './commands/addCommand.js';
import { deleteCommand } from './commands/deleteCommand.js';
import { listCommand } from './commands/listCommand.js';
import { markCommand } from './commands/markCommand.js';
import { updateCommand } from './commands/updateCommand.js';

export const commands = {
    add: addCommand,
    delete: deleteCommand,
    list: listCommand,
    mark: markCommand,
    update: updateCommand
};

