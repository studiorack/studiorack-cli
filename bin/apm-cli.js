#!/usr/bin/env node

const program = require('commander');

const apm = require('../lib/apm')
const pkg = require('../package.json');

program.command('init')
  .description('Set up a new or existing apm project.')
  .action(apm.init);

program
  .command('install [id]')
  .option('-g, --global', 'install the plugin globally rather than locally')
  .description('Install a plugin and update project config.')
  .action(apm.install);

program
  .command('uninstall [id]')
  .option('-g, --global', 'uninstall the plugin globally rather than locally')
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
