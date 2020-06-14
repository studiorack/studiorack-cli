#!/usr/bin/env node

const program = require('commander');

const apm = require('../lib/apm.js')
const pkg = require('../package.json');

program.command('init')
  .description('Set up a new or existing apm project.')
  .action(apm.init);

program
  .command('install <path>')
  .description('Install a plugin and save in project config.')
  .action(apm.install);

program
  .version(pkg.version)
  .parse(process.argv);
