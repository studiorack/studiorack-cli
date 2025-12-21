import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { inputGetParts, ManagerLocal } from '@open-audio-stack/core';
import { output, OutputType } from '../utils.js';

export function install(command: Command, manager: ManagerLocal) {
  command
    .command('install <input>')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Install a package locally by slug/version')
    .action(async (input: string, options: CliOptions) => {
      const [slug, version] = inputGetParts(input);
      const message = `Install ${slug}${version ? `@${version}` : ''}`;
      output(OutputType.START, message, options, manager);
      try {
        await manager.install(slug, version);
        const payload =
          options && options.json
            ? { slug, version: version || null, installed: true }
            : `Installed ${slug}${version ? `@${version}` : ''}`;
        output(OutputType.SUCCESS, payload, options, manager);
      } catch (err: any) {
        output(OutputType.ERROR, err, options, manager);
        process.exit(1);
      }
    });
}
