import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal, PackageVersion } from '@open-audio-stack/core';
import { formatOutput, output, OutputType } from '../utils.js';

export function filter(command: Command, manager: ManagerLocal) {
  command
    .command('filter <field> <value>')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Filter the by field and matching value')
    .action(async (field: keyof PackageVersion, value: string, options: CliOptions) => {
      const message = `Filter ${manager.type} by ${String(field)}=${value}`;
      output(OutputType.START, message, options, manager);
      try {
        const predicate = (pkgVersion: PackageVersion) => {
          const fieldVal: any = pkgVersion[field];
          if (Array.isArray(fieldVal)) {
            return fieldVal.some((v: any) => String(v).toLowerCase() === value.toLowerCase());
          }
          if (typeof fieldVal === 'string') {
            return fieldVal.toLowerCase().includes(value.toLowerCase());
          }
          if (fieldVal === undefined || fieldVal === null) return false;
          return String(fieldVal) === value;
        };
        const result = await manager.filter(predicate);
        const payload = options && options.json ? result : formatOutput(result);
        output(OutputType.SUCCESS, payload, options, manager);
      } catch (err: any) {
        output(OutputType.ERROR, err, options, manager);
        process.exit(1);
      }
    });
}
