#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');

const file = require('./file.js');
const package = require('./package.json');

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

async function init(action) {
  if (action === 'init') {
    success(`Init successful`);
  } else {
    failure(`Error command not recognized`);
  }
  return true;
}

program
  .version(package.version)
  .arguments('<action>')
  .option('-t, --type <boolean>', 'Type')
  .option('-p, --paginate <boolean>', 'Paginate')
  .action(init)
  .parse(process.argv);
