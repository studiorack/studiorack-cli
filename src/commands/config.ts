import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ConfigInterface, ConfigLocal, isTests } from '@open-audio-stack/core';
import { CONFIG_LOCAL_TEST } from '../data/Config.js';

const config: ConfigLocal = new ConfigLocal(isTests() ? CONFIG_LOCAL_TEST : undefined);
const program = new Command();
export const configCmd = program.command('config').description('View/update configuration');

configCmd
  .command('get <key>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Get a config setting by key')
  .action((key: keyof ConfigInterface, options: CliOptions) => {
    if (options.log) config.logEnable();
    if (options.json) {
      const obj: any = {};
      obj[key] = config.get(key);
      console.log({ key });
    } else {
      console.log(config.get(key));
    }
  });

configCmd
  .command('set <key> <val>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Set a config setting by key and value')
  .action((key: keyof ConfigInterface, val: any, options: CliOptions) => {
    // if (options.log) config.logEnable();
    if (options.json) {
      const obj: any = {};
      obj[key] = config.set(key, val);
      console.log(obj);
    } else {
      console.log(config.set(key, val));
    }
  });
