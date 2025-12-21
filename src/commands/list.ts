import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';
import { formatOutput, output, OutputType } from '../utils.js';

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
      const message = `List ${manager.type}`;
      output(OutputType.START, message, options, manager);
      try {
        const result = await manager.listPackages(options.installed, options.incompatible);
        const payload = options && options.json ? result : formatOutput(result);
        output(OutputType.SUCCESS, payload, options, manager);
      } catch (err: any) {
        output(OutputType.ERROR, err, options, manager);
        process.exit(1);
      }
    });
}
