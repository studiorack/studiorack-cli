import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { inputGetParts, ManagerLocal, isTests } from '@open-audio-stack/core';
import { withSpinner } from '../utils.js';

export function install(command: Command, manager: ManagerLocal) {
  command
    .command('install <input>')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Install a package locally by slug/version')
    .action(async (input: string, options: CliOptions) => {
      const [slug, version] = inputGetParts(input);
      await withSpinner(
        options,
        manager,
        `Install ${slug}${version ? `@${version}` : ''}`,
        async () => {
          await manager.install(slug, version);
          return { slug, version: version || null, installed: true, isTests: isTests() };
        },
        (result: any, useJson: boolean) => {
          if (useJson)
            console.log(JSON.stringify({ slug: result.slug, version: result.version, installed: true }, null, 2));
          else if (result.isTests) console.log(`Installed ${result.slug}${result.version ? `@${result.version}` : ''}`);
        },
      );
    });
}
