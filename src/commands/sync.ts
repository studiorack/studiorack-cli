import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';
import { output, OutputType } from '../utils.js';

export function sync(command: Command, manager: ManagerLocal) {
  command
    .command('sync')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Sync remote packages into cache')
    .action(async (options: CliOptions) => {
      const message = `Sync ${manager.type}`;
      output(OutputType.START, message, options, manager);
      try {
        await manager.sync();
        const payload = options && options.json ? { type: manager.type, status: 'synced' } : `Synced ${manager.type}`;
        output(OutputType.SUCCESS, payload, options, manager);
      } catch (err: any) {
        output(OutputType.ERROR, err, options, manager);
        process.exit(1);
      }
    });
}
