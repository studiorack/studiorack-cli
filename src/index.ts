#!/usr/bin/env node

import { dirApp, isTests, ManagerLocal, RegistryType } from '@open-audio-stack/core';
import { Command } from 'commander';
import { sync } from './commands/sync.js';
import { configCmd } from './commands/config.js';
import { create } from './commands/create.js';
import { filter } from './commands/filter.js';
import { get } from './commands/get.js';
import { install } from './commands/install.js';
import { list } from './commands/list.js';
import { reset } from './commands/reset.js';
import { scan } from './commands/scan.js';
import { search } from './commands/search.js';
import { uninstall } from './commands/uninstall.js';

// Create based program and add static commands.
const appDir: string = isTests() ? 'test' : dirApp();
const program = new Command();
program.addCommand(configCmd);

// Dynamically add commands for each registry type.
const types = [RegistryType.Plugins, RegistryType.Presets, RegistryType.Projects];
types.forEach((type: RegistryType) => {
  const command: Command = program.command(type);
  const manager: ManagerLocal = new ManagerLocal(type, { appDir });
  create(command, manager);
  filter(command, manager);
  get(command, manager);
  install(command, manager);
  list(command, manager);
  reset(command, manager);
  scan(command, manager);
  search(command, manager);
  sync(command, manager);
  uninstall(command, manager);
});

program.version('3.0.0').parse(process.argv);
