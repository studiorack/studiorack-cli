import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ConfigInterface, ConfigLocal, isTests } from '@open-audio-stack/core';
import { CONFIG_LOCAL_TEST } from '../data/Config.js';
import { withSpinner } from '../utils.js';

const config: ConfigLocal = new ConfigLocal(isTests() ? CONFIG_LOCAL_TEST : undefined);
const program = new Command();
export const configCmd = program.command('config').description('View/update configuration');

configCmd
  .command('get <key>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Get a config setting by key')
  .action((key: keyof ConfigInterface, options: CliOptions) => {
    return withSpinner(
      options,
      config as any,
      `Get config ${String(key)}`,
      async () => {
        return { key, value: config.get(key) };
      },
      (result: any, useJson: boolean) => {
        if (useJson) {
          const obj: any = {};
          obj[result.key] = result.value;
          console.log(JSON.stringify(obj, null, 2));
        } else {
          console.log(result.value);
        }
      },
    );
  });

configCmd
  .command('set <key> <val>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Set a config setting by key and value')
  .action((key: keyof ConfigInterface, val: any, options: CliOptions) => {
    return withSpinner(
      options,
      config as any,
      `Set config ${String(key)}`,
      async () => {
        const res = config.set(key, val);
        return { key, value: res };
      },
      (result: any, useJson: boolean) => {
        if (useJson) {
          const obj: any = {};
          obj[result.key] = result.value;
          console.log(JSON.stringify(obj, null, 2));
        } else {
          console.log(result.value);
        }
      },
    );
  });
