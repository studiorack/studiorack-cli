#!/usr/bin/env node

import { Command } from 'commander';
import { config } from './config';
import { plugin } from './plugin';

const pkg = require('../package.json')
const program = new Command();
program.addCommand(config);
program.addCommand(plugin);
program.version(pkg.version).parse(process.argv);
