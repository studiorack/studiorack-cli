#!/usr/bin/env node

const program = require('commander');

const apm = require('../lib/apm.js')
const pkg = require('../package.json');

program.command('init')
  .description('Set up a new or existing apm project.')
  .action(apm.init);

program
  .command('install [path]')
  .description('Install a plugin and update project config.')
  .action(apm.install);

program
  .command('uninstall [path]')
  .description('Uninstall a plugin and update project config.')
  .action(apm.uninstall);

program
  .version(pkg.version)
  .parse(process.argv);
