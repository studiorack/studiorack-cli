import { Command } from 'commander';
import ora from 'ora';
import { CliOptions } from '../types/options.js';
import { inputGetParts, ManagerLocal, isTests } from '@open-audio-stack/core';

export function uninstall(command: Command, manager: ManagerLocal) {
  command
    .command('uninstall <input>')
    .option('-l, --log', 'Enable logging')
    .description('Uninstall a package locally by slug/version')
    .action(async (input: string, options: CliOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      const [slug, version] = inputGetParts(input);
      const spinner = ora(`Uninstalling ${slug}${version ? `@${version}` : ''}...`).start();
      try {
        await manager.uninstall(slug, version);
        spinner.succeed(`Uninstalled ${slug}${version ? `@${version}` : ''}`);
        if (isTests()) console.log(`Uninstalled ${slug}${version ? `@${version}` : ''}`);
      } catch (error) {
        spinner.fail(`Failed to uninstall ${slug}${version ? `@${version}` : ''}`);
        if (isTests()) console.log(`Failed to uninstall ${slug}${version ? `@${version}` : ''}`);
        throw error;
      }
    });
}
