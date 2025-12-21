import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { inputGetParts, ManagerLocal } from '@open-audio-stack/core';
import { formatOutput, output, OutputType } from '../utils.js';

export function get(command: Command, manager: ManagerLocal) {
  command
    .command('get <input>')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Get package metadata from registry')
    .action((input: string, options: CliOptions) => {
      const message = `Get package ${input}`;
      output(OutputType.START, message, options, manager);
      try {
        const [slug, version] = inputGetParts(input);
        const pkg = manager.getPackage(slug);
        if (!pkg) throw new Error(`No package found with slug: ${slug}`);
        const payload =
          options && options.json
            ? { pkg, version }
            : formatOutput(pkg, version ? [version] : Array.from(pkg.versions.keys()), false);
        output(OutputType.SUCCESS, payload, options, manager);
      } catch (err: any) {
        output(OutputType.ERROR, err, options, manager);
        process.exit(1);
      }
    });
}
