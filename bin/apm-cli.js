#!/usr/bin/env node

const program = require('commander');

const apm = require('../lib/apm.js')
const pkg = require('../package.json');

program.command('init')
  .description('Set up a new or existing apm project.')
  .action(apm.init);

program
  .command('install [key]')
  .description('Install a plugin and update project config.')
  .action(apm.install);

program
  .command('uninstall [key]')
  .description('Uninstall a plugin and update project config.')
  .action(apm.uninstall);

program
  .command('search <query>')
  .description('Search plugin registry by query.')
  .action(apm.search);

program
  .command('start [path]')
  .description('Start music project using the project config.')
  .action(apm.start);

program
  .version(pkg.version)
  .parse(process.argv);
