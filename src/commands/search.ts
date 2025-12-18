import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';
import { formatOutput, withSpinner } from '../utils.js';

export function search(command: Command, manager: ManagerLocal) {
  command
    .command('search <query>')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Search using a lazy matching query')
    .action(async (query: string, options: CliOptions) => {
      await withSpinner(
        options,
        manager,
        `Search ${manager.type}`,
        async () => {
          return manager.search(query);
        },
        (result: any, useJson: boolean) => {
          if (useJson) console.log(JSON.stringify(result, null, 2));
          else console.log(formatOutput(result as any));
        },
      );
    });
}
