import { Command } from 'commander';
import { configGet, configSet, ConfigInterface } from '@studiorack/core';

const program = new Command();
const config = program.command('config');

config
  .command('get <key>')
  .description('Get a config setting by key')
  .action((key: keyof ConfigInterface) => {
    console.log(configGet(key));
  });

config
  .command('set <key> <val>')
  .description('Set a config setting by key and value')
  .action((key: keyof ConfigInterface, val: any) => {
    console.log(configSet(key, val));
  });

export { config };
