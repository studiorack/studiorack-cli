import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal, PackageVersion } from '@open-audio-stack/core';
import { formatOutput, withSpinner } from '../utils.js';

export function filter(command: Command, manager: ManagerLocal) {
  command
    .command('filter <field> <value>')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Filter the by field and matching value')
    .action((field: keyof PackageVersion, value: string, options: CliOptions) => {
      return withSpinner(
        options,
        manager,
        `Filter ${manager.type} by ${String(field)}=${value}`,
        async () => {
          const predicate = (pkgVersion: PackageVersion) => {
            const fieldVal: any = (pkgVersion as any)[field];
            if (Array.isArray(fieldVal)) {
              return fieldVal.some((v: any) => String(v).toLowerCase() === value.toLowerCase());
            }
            if (typeof fieldVal === 'string') {
              return fieldVal.toLowerCase().includes(value.toLowerCase());
            }
            if (fieldVal === undefined || fieldVal === null) return false;
            return String(fieldVal) === value;
          };
          return manager.filter(predicate);
        },
        (result: any, useJson: boolean) => {
          if (useJson) console.log(JSON.stringify(result, null, 2));
          else console.log(formatOutput(result as any));
        },
      );
    });
}
