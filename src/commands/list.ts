import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';
import { formatOutput, withSpinner } from '../utils.js';

interface ListOptions extends CliOptions {
  incompatible: boolean;
  installed: boolean;
}

export function list(command: Command, manager: ManagerLocal) {
  command
    .command('list')
    .option('-c, --incompatible', 'List incompatible packages')
    .option('-i, --installed', 'Only list installed packages')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('List packages')
    .action(async (options: ListOptions) => {
      await withSpinner(
        options,
        manager,
        `List ${manager.type}`,
        async () => {
          return manager.listPackages(options.installed, options.incompatible);
        },
        (result: any, useJson: boolean) => {
          if (useJson) console.log(JSON.stringify(result, null, 2));
          else console.log(formatOutput(result as any));
        },
      );
    });
}
