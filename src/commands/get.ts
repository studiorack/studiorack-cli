import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { inputGetParts, ManagerLocal } from '@open-audio-stack/core';
import { formatOutput, withSpinner } from '../utils.js';

export function get(command: Command, manager: ManagerLocal) {
  command
    .command('get <input>')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Get package metadata from registry')
    .action((input: string, options: CliOptions) => {
      return withSpinner(
        options,
        manager,
        `Get package ${input}`,
        async () => {
          const [slug, version] = inputGetParts(input);
          const pkg = manager.getPackage(slug);
          if (!pkg) throw new Error(`No package found with slug: ${slug}`);
          return { pkg, version };
        },
        (result: any, useJson: boolean) => {
          const { pkg, version } = result;
          const versions = version ? [version] : Array.from(pkg.versions.keys());
          console.log(formatOutput(pkg, versions, useJson));
        },
      );
    });
}
