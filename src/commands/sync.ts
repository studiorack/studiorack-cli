import { Command } from 'commander';
import ora from 'ora';
import { CliOptions } from '../types/options.js';
import { ManagerLocal, isTests } from '@open-audio-stack/core';

export function sync(command: Command, manager: ManagerLocal) {
  command
    .command('sync')
    .option('-l, --log', 'Enable logging')
    .description('Sync remote packages into cache')
    .action(async (options: CliOptions) => {
      if (options.log) manager.logEnable();
      else manager.logDisable();
      const spinner = ora(`Syncing ${manager.type}...`).start();
      try {
        await manager.sync();
        spinner.succeed(`${manager.type} sync completed`);
        if (isTests()) console.log(`${manager.type} sync completed`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        spinner.fail(errorMessage);
        if (isTests()) console.log(errorMessage);
      }
    });
}
