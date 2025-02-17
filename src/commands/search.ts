import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';

export function search(command: Command, manager: ManagerLocal) {
  command
    .command('search <query>')
    .option('-l, --log', 'Enable logging')
    .description('Search using a lazy matching query')
    .action(async (query: string, options: CliOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      console.log(manager.search(query));
    });
}
