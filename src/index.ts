#!/usr/bin/env node --no-warnings=ExperimentalWarning

import { isTests, ManagerLocal, RegistryType } from '@open-audio-stack/core';
import { Command } from 'commander';
import { sync } from './commands/sync.js';
import { configCmd } from './commands/config.js';
import { create } from './commands/create.js';
import { filter } from './commands/filter.js';
import { get } from './commands/get.js';
import { install } from './commands/install.js';
import { list } from './commands/list.js';
import { open } from './commands/open.js';
import { reset } from './commands/reset.js';
import { scan } from './commands/scan.js';
import { search } from './commands/search.js';
import { uninstall } from './commands/uninstall.js';
import { CONFIG_LOCAL_TEST } from './data/Config.js';

// Create based program and add static commands.
const program = new Command();
program.addCommand(configCmd);

// Dynamically add commands for each registry type.
const types = [RegistryType.Apps, RegistryType.Plugins, RegistryType.Presets, RegistryType.Projects];
for (const type of types) {
  const command: Command = program.command(type);
  const manager: ManagerLocal = new ManagerLocal(type as RegistryType, isTests() ? CONFIG_LOCAL_TEST : undefined);
  await manager.sync();
  manager.scan();
  create(command, manager);
  filter(command, manager);
  get(command, manager);
  install(command, manager);
  list(command, manager);
  open(command, manager);
  reset(command, manager);
  scan(command, manager);
  search(command, manager);
  sync(command, manager);
  uninstall(command, manager);
}

program.version('3.0.0').parse(process.argv);
