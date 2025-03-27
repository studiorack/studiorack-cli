import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';

export function create(command: Command, manager: ManagerLocal) {
  command
    .command('create <path>')
    .option('-l, --log', 'Enable logging')
    .description('Create a new package locally')
    .action(async (path: string, options: CliOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      console.log(await manager.create());
      console.log(path);
    });
}
