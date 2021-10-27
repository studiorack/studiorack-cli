#!/usr/bin/env node

import { Command } from 'commander';
import { config } from './config';
import { plugin } from './plugin';
import { project } from './project';
import { testFolder, validateFolder } from '@studiorack/core';

const pkg = require('../package.json');
const program = new Command();
program.addCommand(config);
program.addCommand(plugin);
program.addCommand(project);

program
  .command('test [path]')
  .option('-s, --summary', 'plugin test summary json file')
  .description('Test a plugin using the Tracktion plugin validator')
  .action(async (pluginPath: string, options?: any) => {
    const result = await testFolder(pluginPath, options);
    if (options.summary) {
      console.log(result);
    }
  });

// Backwards compatibility with Github Actions
program
  .command('validate [path]')
  .option('-f, --files', 'add files (audio, video and platform)')
  .option('-j, --json', 'plugin json file')
  .option('-s, --summary', 'plugins summary json file')
  .option('-t, --txt', 'plugin txt file')
  .option('-z, --zip', 'create a zip file of plugin')
  .description('Validate a plugin using the Steinberg VST3 SDK validator')
  .action(async (pluginPath: string, options?: any) => {
    const result = await validateFolder(pluginPath, options);
    if (options.summary) {
      console.log(result);
    }
  });

program.version(pkg.version).parse(process.argv);
