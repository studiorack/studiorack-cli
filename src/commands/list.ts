import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';
import { formatOutput } from '../utils.js';

interface ListOptions extends CliOptions {
  incompatible: boolean;
  installed: boolean;
}

export function list(command: Command, manager: ManagerLocal) {
  command
    .command('list')
    .option('-c, --incompatible', 'List incompatible packages')
    .option('-i, --installed', 'Only list installed packages')
    .option('-l, --log', 'Enable logging')
    .description('List packages')
    .action(async (options: ListOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      console.log(formatOutput(manager.listPackages(options.installed, options.incompatible)));
    });
}
