#!/usr/bin/env node

import { Command } from 'commander';
import {
  configGet,
  configSet,
  ConfigInterface,
  inputGetParts,
  pluginCreate,
  pluginGet,
  PluginTemplate,
  projectInstall,
  pluginInstall,
  pathGetId,
  pathGetVersion,
  pluginUninstall,
  pluginGetLocal,
  pluginsGet,
  pluginsGetLocal,
  pluginSearch,
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
  .command('get <input>')
  .description('Get registry plugin by id')
  .action(async (input: string) => {
    const [pluginId, pluginVersion] = inputGetParts(input);
    console.log(await pluginGet(pluginId, pluginVersion));
  });

plugin
  .command('getLocal <path>')
  .description('Get local plugin details by path')
  .action(async (path: string) => {
    console.log(await pluginGetLocal(path));
  });

plugin
  .command('install <input>')
  .description('Install a plugin by id')
  .action(async (input: string) => {
    const [pluginId, pluginVersion] = inputGetParts(input);
    console.log(await pluginInstall(pluginId, pluginVersion));
  });

plugin
  .command('list')
  .description('List registry plugins')
  .action(async () => {
    console.log(await pluginsGet());
  });

plugin
  .command('listLocal')
  .description('List local plugins')
  .action(async () => {
    console.log(await pluginsGetLocal());
  });

plugin
  .command('search <query>')
  .description('List registry plugins')
  .action(async (query?: string) => {
    console.log(await pluginSearch(query));
  });

plugin
  .command('uninstall <input>')
  .description('Uninstall a plugin by id')
  .action(async (input: string) => {
    const [pluginId, pluginVersion] = inputGetParts(input);
    console.log(await pluginUninstall(pluginId, pluginVersion));
  });

program.version(pkg.version).parse(process.argv);
