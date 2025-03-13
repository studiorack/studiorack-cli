import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { inputGetParts, ManagerLocal } from '@open-audio-stack/core';
import { formatOutput } from '../utils.js';

export function get(command: Command, manager: ManagerLocal) {
  command
    .command('get <input>')
    .option('-l, --log', 'Enable logging')
    .description('Get package metadata from registry')
    .action((input: string, options: CliOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      const [slug, version] = inputGetParts(input);
      const pkg = manager.getPackage(slug);
      const versions = version ? [version] : Array.from(pkg?.versions.keys() || new Map().keys());
      console.log(formatOutput(pkg, versions));
    });
}
