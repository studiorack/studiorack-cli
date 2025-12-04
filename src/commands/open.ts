import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { inputGetParts, ManagerLocal } from '@open-audio-stack/core';

export function open(command: Command, manager: ManagerLocal) {
  command
    .command('open <input> [options...]')
    .option('-l, --log', 'Enable logging')
    .description('Open a package by slug/version')
    .action(async (input: string, options: string[], cliOptions: CliOptions) => {
      if (cliOptions.log) manager.logEnable();
      else manager.logDisable();
      const [slug, version] = inputGetParts(input);
      try {
        await manager.open(slug, version, options);
      } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(errorMessage);
        process.exit(1);
      }
    });
}
