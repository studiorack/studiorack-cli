#!/usr/bin/env node

import { Command } from 'commander';
import { config } from './config.js';
import { plugin } from './plugin.js';
import { project } from './project.js';
import {
  pluginValidateFolder,
  PluginValidationOptions,
  PluginVersion,
  toolFolder,
  toolInstall,
} from '@studiorack/core';

const program = new Command();
program.addCommand(config);
program.addCommand(plugin);
program.addCommand(project);

program
  .command('run [path]')
  .option('-t, --tool <type>', 'tool (clapinfo, pluginval or validator)')
  .description('Run a command-line tool')
  .action(async (pluginPath: string, options?: any) => {
    await toolInstall(options.tool);
    const results: string[] = toolFolder(options.tool, pluginPath);
    if (results.length) {
      results.forEach((result: string) => {
        console.log(result);
      });
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
  .action(async (pluginPath: string, options: PluginValidationOptions) => {
    const result: PluginVersion[] = await pluginValidateFolder(pluginPath, options);
    if (options.summary) {
      console.log(result);
    }
  });

program.version('2.0.0').parse(process.argv);
