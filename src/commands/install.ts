import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { inputGetParts, ManagerLocal } from '@open-audio-stack/core';
import { formatOutput } from '../utils.js';

export function install(command: Command, manager: ManagerLocal) {
  command
    .command('install <input>')
    .option('-l, --log', 'Enable logging')
    .description('Install a package locally by slug/version')
    .action(async (input: string, options: CliOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      const [slug, version] = inputGetParts(input);
      await manager.install(slug, version);
      console.log(formatOutput(manager.getPackage(slug), version));
    });
}
