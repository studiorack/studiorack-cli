#!/usr/bin/env node

import { Command } from 'commander';
import { config } from './config';
import { plugin } from './plugin';
import { project } from './project';

const pkg = require('../package.json');
const program = new Command();
program.addCommand(config);
program.addCommand(plugin);
program.addCommand(project);
program.version(pkg.version).parse(process.argv);
