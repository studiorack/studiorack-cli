import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { inputGetParts, ManagerLocal } from '@open-audio-stack/core';
import { formatOutput } from '../utils.js';

export function uninstall(command: Command, manager: ManagerLocal) {
  command
    .command('uninstall <input>')
    .option('-l, --log', 'Enable logging')
    .description('Uninstall a package locally by slug/version')
    .action(async (input: string, options: CliOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      const [slug, version] = inputGetParts(input);
      await manager.uninstall(slug, version);
      console.log(formatOutput(manager.getPackage(slug), [version]));
    });
}
