import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { inputGetParts, ManagerLocal, isTests } from '@open-audio-stack/core';
import { withSpinner } from '../utils.js';

export function uninstall(command: Command, manager: ManagerLocal) {
  command
    .command('uninstall <input>')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Uninstall a package locally by slug/version')
    .action(async (input: string, options: CliOptions) => {
      const [slug, version] = inputGetParts(input);
      await withSpinner(
        options,
        manager,
        `Uninstall ${slug}${version ? `@${version}` : ''}`,
        async () => {
          await manager.uninstall(slug, version);
          return { slug, version: version || null, installed: false, isTests: isTests() };
        },
        (result: any, useJson: boolean) => {
          if (useJson)
            console.log(JSON.stringify({ slug: result.slug, version: result.version, installed: false }, null, 2));
          else if (result.isTests)
            console.log(`Uninstalled ${result.slug}${result.version ? `@${result.version}` : ''}`);
        },
      );
    });
}
