import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';
import { withSpinner } from '../utils.js';

export function scan(command: Command, manager: ManagerLocal) {
  command
    .command('scan')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Scan local packages into cache')
    .action(async (options: CliOptions) => {
      await withSpinner(
        options,
        manager,
        `Scan ${manager.type}`,
        async () => {
          await manager.scan();
          return { type: manager.type, status: 'scan completed' };
        },
        (result: any, useJson: boolean) => {
          if (useJson) console.log(JSON.stringify({ type: result.type, status: result.status }, null, 2));
        },
      );
    });
}
