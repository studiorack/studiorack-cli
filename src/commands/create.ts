import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';
import { withSpinner } from '../utils.js';

export function create(command: Command, manager: ManagerLocal) {
  command
    .command('create')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Create a new package locally')
    .action(async (path: string, options: CliOptions) => {
      await withSpinner(
        options,
        manager,
        `Create package at ${path}`,
        async () => {
          const result = await manager.create();
          return result;
        },
        (result: any, useJson: boolean) => {
          if (useJson) console.log(JSON.stringify(result, null, 2));
          else console.log(result);
        },
      );
    });
}
