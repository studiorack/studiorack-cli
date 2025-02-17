import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';

export function sync(command: Command, manager: ManagerLocal) {
  command
    .command('sync')
    .option('-l, --log', 'Enable logging')
    .description('Sync remote registries and aggregate packages into cache')
    .action(async (options: CliOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      await manager.sync();
    });
}
