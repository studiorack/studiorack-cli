import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';

export function scan(command: Command, manager: ManagerLocal) {
  command
    .command('scan')
    .option('-l, --log', 'Enable logging')
    .description('Scan local packages into cache')
    .action(async (options: CliOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      manager.scan();
      console.log(`${manager.type} scan has been completed`);
    });
}
