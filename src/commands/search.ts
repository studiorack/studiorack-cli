import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';
import { formatOutput, output, OutputType } from '../utils.js';

export function search(command: Command, manager: ManagerLocal) {
  command
    .command('search <query>')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Search using a lazy matching query')
    .action(async (query: string, options: CliOptions) => {
      const message = `Search ${manager.type}`;
      output(OutputType.START, message, options, manager);
      try {
        const result = await manager.search(query);
        const payload = options && options.json ? result : formatOutput(result);
        output(OutputType.SUCCESS, payload, options, manager);
      } catch (err: any) {
        output(OutputType.ERROR, err, options, manager);
        process.exit(1);
      }
    });
}
