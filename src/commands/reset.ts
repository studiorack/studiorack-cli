import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';
import { output, OutputType } from '../utils.js';

export function reset(command: Command, manager: ManagerLocal) {
  command
    .command('reset')
    .option('-l, --log', 'Enable logging')
    .description('Reset the synced package cache')
    .action((options: CliOptions) => {
      const message = `Reset ${manager.type}`;
      output(OutputType.START, message, options, manager);
      try {
        manager.reset();
        const payload =
          options && options.json ? { type: manager.type, status: 'reset' } : `Reset complete ${manager.type}`;
        output(OutputType.SUCCESS, payload, options, manager);
      } catch (err: any) {
        output(OutputType.ERROR, err, options, manager);
        process.exit(1);
      }
    });
}
