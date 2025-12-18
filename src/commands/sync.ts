import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal, isTests } from '@open-audio-stack/core';
import { withSpinner } from '../utils.js';

export function sync(command: Command, manager: ManagerLocal) {
  command
    .command('sync')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Sync remote packages into cache')
    .action(async (options: CliOptions) => {
      await withSpinner(
        options,
        manager,
        `Sync ${manager.type}`,
        async () => {
          await manager.sync();
          return { type: manager.type, status: 'sync completed', isTests: isTests() };
        },
        (result: any, useJson: boolean) => {
          if (useJson) console.log(JSON.stringify({ type: result.type, status: result.status }, null, 2));
          else if (isTests()) console.log(`${result.type} sync completed`);
        },
      );
    });
}
