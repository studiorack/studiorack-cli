import { Command } from 'commander';
import { configGet, configSet, ConfigInterface, logEnable } from '@studiorack/core';
import { CliOptions } from './types/options.js';

const program = new Command();
const config = program.command('config').description('View/update configuration');

config
  .command('get <key>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Get a config setting by key')
  .action((key: keyof ConfigInterface, options: CliOptions) => {
    if (options.log) logEnable();
    if (options.json) {
      const obj: any = {};
      obj[key] = configGet(key);
      console.log(obj);
    } else {
      console.log(configGet(key));
    }
  });

config
  .command('set <key> <val>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Set a config setting by key and value')
  .action((key: keyof ConfigInterface, val: any, options: CliOptions) => {
    if (options.log) logEnable();
    if (options.json) {
      const obj: any = {};
      obj[key] = configSet(key, val);
      console.log(obj);
    } else {
      console.log(configSet(key, val));
    }
  });

export { config };
