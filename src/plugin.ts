import CliTable3 from 'cli-table3';
import { Command } from 'commander';
import {
  inputGetParts,
  pluginCreate,
  pluginGet,
  pluginInstall,
  pluginUninstall,
  pluginGetLocal,
  pluginsGet,
  pluginsGetLocal,
  pluginSearch,
  pluginLatest,
  pluginLicense,
  logEnable,
} from '@studiorack/core';
import { CliOptions, CliPluginCreateOptions } from './types/options.js';

const program = new Command();
const plugin = program.command('plugin').description('View/add/remove individual plugins');

plugin
  .command('create <path>')
  .option('-l, --log', 'Enable logging')
  .option('-t, --type <type>', 'Template type (dplug, iplug, juce, steinberg)')
  .description('Create plugin using a starter template')
  .action((path: string, options: CliPluginCreateOptions) => {
    if (options.log) logEnable();
    console.log(pluginCreate(path, options.type));
  });

plugin
  .command('get <input>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Get registry plugin by id')
  .action(async (input: string, options: CliOptions) => {
    if (options.log) logEnable();
    const [pluginId, pluginVersion] = inputGetParts(input);
    console.log(formatOutput(await pluginGet(pluginId, pluginVersion), options.json));
  });

plugin
  .command('getLocal <input>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Get local plugin details by id')
  .action(async (input: string, options: CliOptions) => {
    if (options.log) logEnable();
    const [pluginId, pluginVersion] = inputGetParts(input);
    console.log(formatOutput(await pluginGetLocal(pluginId, pluginVersion), options.json));
  });

plugin
  .command('install <input>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Install a plugin by id')
  .action(async (input: string, options: CliOptions) => {
    if (options.log) logEnable();
    const [pluginId, pluginVersion] = inputGetParts(input);
    console.log(formatOutput(await pluginInstall(pluginId, pluginVersion), options.json));
  });

plugin
  .command('list')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('List registry plugins')
  .action(async (options: CliOptions) => {
    if (options.log) logEnable();
    console.log(formatOutput(await pluginsGet(), options.json, true));
  });

plugin
  .command('listLocal')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('List local plugins')
  .action(async (options: CliOptions) => {
    if (options.log) logEnable();
    console.log(formatOutput(await pluginsGetLocal(), options.json, true));
  });

plugin
  .command('search <query>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Search registry plugins')
  .action(async (query: string, options: CliOptions) => {
    if (options.log) logEnable();
    console.log(formatOutput(await pluginSearch(query), options.json, true));
  });

plugin
  .command('uninstall <input>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Uninstall a plugin by id')
  .action(async (input: string, options: CliOptions) => {
    if (options.log) logEnable();
    const [pluginId, pluginVersion] = inputGetParts(input);
    console.log(formatOutput(await pluginUninstall(pluginId, pluginVersion), options.json));
  });

// Helper function to format output
function formatOutput(result: any, json?: boolean, list?: boolean): string {
  if (!result) {
    return `Plugin not found`;
  }
  if (json) {
    return JSON.stringify(result, null, 2);
  }
  const table = new CliTable3({
    head: ['Id', 'Name', 'Version', 'Date', 'License', 'Tags'],
  });
  if (list) {
    if (result.length === 0) {
      return `No results found`;
    }
    for (const key in result) {
      const latest = result[key].versions ? pluginLatest(result[key]) : result[key];
      table.push([
        latest.id || '-',
        truncateString(latest.name || '-', 40),
        truncateString(latest.version || '-', 10),
        truncateString(latest.date.split('T')[0] || '-', 10),
        truncateString(pluginLicense(latest.license)?.name || '-', 20),
        truncateString(latest.tags?.join(', ') || '-', 30),
      ]);
    }
  } else {
    const latest = result.versions ? pluginLatest(result) : result;
    table.push([
      latest.id || '-',
      truncateString(latest.name || '-', 40),
      truncateString(latest.version || '-', 10),
      truncateString(latest.date.split('T')[0] || '-', 10),
      truncateString(pluginLicense(latest.license)?.name || '-', 20),
      truncateString(latest.tags?.join(', ') || '-', 30),
    ]);
  }
  return table.toString();
}

// Helper function to format strings
function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}

export { plugin };
