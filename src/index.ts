#!/usr/bin/env node

import { Command } from 'commander';
import {
  configGet,
  configSet,
  ConfigInterface,
  pluginCreate,
  pluginGet,
  PluginTemplate,
} from '@studiorack/core';

const program = new Command();
const pkg = require('../package.json');

// Config base command
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

// Plugin base command
const plugin = program.command('plugin');

plugin
  .command('create <folder>')
  .option('-t, --type <type>', 'Template type (dplug, iplug, juce, steinberg)')
  .description('Create plugin using a starter template')
  .action((folder: string, options: { type?: keyof PluginTemplate}) => {
    pluginCreate(folder, options.type);
  });

plugin
  .command('get <id>')
  .description('Get plugin details by id')
  .action(async (id: string) => {
    try {
      console.log(await pluginGet(id));
    } catch(error: any) {
      console.log(error);
    }
  });

program.version(pkg.version).parse(process.argv);
