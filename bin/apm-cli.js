#!/usr/bin/env node

const chalk = require('chalk');
const commander = require('commander');

const apm = require('../lib/apm.js')
const pkg = require('../package.json');

function success(msg) {
  console.log(`-------`);
  console.log(chalk.green(msg));
  process.exit(1);
}

function failure(msg) {
  console.log(`-------`);
  console.log(chalk.red(msg));
  process.exit(0);
}

async function run(action) {
  if (apm[action]) {
    await apm[action]();
    success(`Command ${action} recognized`);
  } else {
    failure(`Error command not recognized`);
  }
  return true;
}

commander
  .version(pkg.version)
  .arguments('<action>')
  .option('-t, --type <boolean>', 'Type')
  .action(run)
  .parse(process.argv);
