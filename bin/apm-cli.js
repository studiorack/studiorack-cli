#!/usr/bin/env node

const program = require('commander');

const apm = require('../lib/apm.js')
const pkg = require('../package.json');

program
  .version(pkg.version)
  .command('init')
  .description('Set up a new or existing apm project.')
  .action(apm.init);

  program.parse(process.argv);
