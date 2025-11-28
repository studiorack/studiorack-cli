import { Command } from 'commander';
import ora from 'ora';
import { CliOptions } from '../types/options.js';
import { inputGetParts, ManagerLocal, isTests } from '@open-audio-stack/core';

export function install(command: Command, manager: ManagerLocal) {
  command
    .command('install <input>')
    .option('-l, --log', 'Enable logging')
    .description('Install a package locally by slug/version')
    .action(async (input: string, options: CliOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      const [slug, version] = inputGetParts(input);
      const spinner = ora(`Installing ${slug}${version ? `@${version}` : ''}...`).start();
      try {
        await manager.install(slug, version);
        spinner.succeed(`Installed ${slug}${version ? `@${version}` : ''}`);
        if (isTests()) console.log(`Installed ${slug}${version ? `@${version}` : ''}`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        spinner.fail(errorMessage);
        if (isTests()) console.log(errorMessage);
      }
    });
}
