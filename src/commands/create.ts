import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';
import { output, OutputType } from '../utils.js';

export function create(command: Command, manager: ManagerLocal) {
  command
    .command('create')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Create a new package locally')
    .action(async (options: CliOptions) => {
      const message = `Create package`;
      output(OutputType.START, message, options, manager);
      try {
        const result = await manager.create();
        // For JSON mode return the object; for textual mode, stringify objects
        const payload =
          options && options.json ? result : typeof result === 'string' ? result : JSON.stringify(result, null, 2);
        output(OutputType.SUCCESS, payload, options, manager);
      } catch (err: any) {
        output(OutputType.ERROR, err, options, manager);
        process.exit(1);
      }
    });
}
