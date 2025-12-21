import { Command } from 'commander';
import { CliOptions } from '../types/options.js';
import { ManagerLocal } from '@open-audio-stack/core';
import { output, OutputType } from '../utils.js';

export function scan(command: Command, manager: ManagerLocal) {
  command
    .command('scan')
    .option('-j, --json', 'Output results as json')
    .option('-l, --log', 'Enable logging')
    .description('Scan local packages into cache')
    .action(async (options: CliOptions) => {
      const message = `Scan ${manager.type}`;
      output(OutputType.START, message, options, manager);
      try {
        await manager.scan();
        // pass an object for JSON output, or a string for textual output
        const payload = options && options.json ? { type: manager.type, status: 'scanned' } : `Scanned ${manager.type}`;
        output(OutputType.SUCCESS, payload, options, manager);
      } catch (err: any) {
        output(OutputType.ERROR, err, options, manager);
        process.exit(1);
      }
    });
}
