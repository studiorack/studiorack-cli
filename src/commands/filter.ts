import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal, PackageVersion } from '@open-audio-stack/core';

export function filter(command: Command, manager: ManagerLocal) {
  command
    .command('filter <field> <value>')
    .option('-l, --log', 'Enable logging')
    .description('Filter the by field and matching value')
    .action((field: keyof PackageVersion, value: string, options: CliOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      console.log(manager.filter(pkgVersion => pkgVersion[field] === value));
    });
}
