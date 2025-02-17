import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';

export function reset(command: Command, manager: ManagerLocal) {
  command
    .command('reset')
    .option('-l, --log', 'Enable logging')
    .description('Reset the synced package cache')
    .action((options: CliOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      manager.reset();
    });
}
