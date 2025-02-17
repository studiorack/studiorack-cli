import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';

export function list(command: Command, manager: ManagerLocal) {
  command
    .command('list')
    .option('-l, --log', 'Enable logging')
    .description('List all packages synced from remote registries')
    .action(async (options: CliOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      console.log(manager.listPackages());
    });
}
