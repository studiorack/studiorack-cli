import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { inputGetParts, ManagerLocal } from '@open-audio-stack/core';
import { output, OutputType } from '../utils.js';

export function open(command: Command, manager: ManagerLocal) {
  command
    .command('open <input> [options...]')
    .option('-l, --log', 'Enable logging')
    .description('Open a package by slug/version')
    .action(async (input: string, options: string[], cliOptions: CliOptions) => {
      const message = `Open ${input}`;
      output(OutputType.START, message, cliOptions, manager);
      try {
        const [slug, version] = inputGetParts(input);
        await manager.open(slug, version, options);
        output(OutputType.SUCCESS, `Opened ${input}`, cliOptions, manager);
      } catch (err: any) {
        output(OutputType.ERROR, err, cliOptions, manager);
        process.exit(1);
      }
    });
}
