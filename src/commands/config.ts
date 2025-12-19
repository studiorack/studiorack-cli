import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ConfigInterface, ConfigLocal, isTests } from '@open-audio-stack/core';
import { CONFIG_LOCAL_TEST } from '../data/Config.js';
import { output, OutputType } from '../utils.js';

const config: ConfigLocal = new ConfigLocal(isTests() ? CONFIG_LOCAL_TEST : undefined);
const program = new Command();
export const configCmd = program.command('config').description('View/update configuration');

configCmd
  .command('get <key>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Get a config setting by key')
  .action((key: keyof ConfigInterface, options: CliOptions) => {
    {
      const message = `Get config ${String(key)}`;
      output(OutputType.START, message, options, config);
      try {
        const payload = options && options.json ? { key, value: config.get(key) } : String(config.get(key));
        output(OutputType.SUCCESS, payload, options, config);
      } catch (err: any) {
        output(OutputType.ERROR, err, options, config);
        process.exit(1);
      }
    }
  });

configCmd
  .command('set <key> <val>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Set a config setting by key and value')
  .action((key: keyof ConfigInterface, val: any, options: CliOptions) => {
    {
      const message = `Set config ${String(key)}`;
      output(OutputType.START, message, options, config);
      try {
        const res = config.set(key, val);
        const payload = options && options.json ? { key, value: res } : String(res);
        output(OutputType.SUCCESS, payload, options, config);
      } catch (err: any) {
        output(OutputType.ERROR, err, options, config);
        process.exit(1);
      }
    }
  });
