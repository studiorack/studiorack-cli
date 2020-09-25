#!/usr/bin/env node

const program = require('commander');

const studiorack = require('../lib/studiorack')
const pkg = require('../package.json');

program
  .command('create <folder>')
  .description('Create a new folder using the plugin starter template')
  .action(studiorack.create);

program.command('init')
  .description('Set up a new or existing StudioRack project.')
  .action(studiorack.init);

program
  .command('install [id]')
  .option('-g, --global', 'install the plugin globally rather than locally')
  .description('Install a plugin and update project config.')
  .action(studiorack.install);

program
  .command('uninstall [id]')
  .option('-g, --global', 'uninstall the plugin globally rather than locally')
  .description('Uninstall a plugin and update project config.')
  .action(studiorack.uninstall);

program
  .command('publish')
  .description('Publish plugin to the registry')
  .action(studiorack.publish);

program
  .command('search <query>')
  .description('Search plugin registry by query.')
  .action(studiorack.search);

program
  .command('start [path]')
  .description('Start music project using the project config.')
  .action(studiorack.start);

program
  .command('validate [path]')
  .option('-j, --json', 'plugin json file')
  .option('-s, --summary', 'plugins summary json file')
  .option('-t, --txt', 'plugin txt file')
  .option('-z, --zip', 'create a zip file of plugin')
  .description('Validate a plugin using the Steinberg VST3 SDK validator')
  .action(studiorack.validate);

program
  .version(pkg.version)
  .parse(process.argv);
