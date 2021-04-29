import * as Table3 from 'cli-table3';
import { Command } from 'commander';
import {
  inputGetParts,
  pluginCreate,
  pluginGet,
  PluginTemplate,
  pluginInstall,
  pluginUninstall,
  pluginGetLocal,
  pluginsGet,
  pluginsGetLocal,
  pluginSearch,
  pluginLatest
} from '@studiorack/core';

const program = new Command();
const plugin = program.command('plugin');

plugin
  .command('create <folder>')
  .option('-t, --type <type>', 'Template type (dplug, iplug, juce, steinberg)')
  .description('Create plugin using a starter template')
  .action((folder: string, options: { type?: keyof PluginTemplate}) => {
    console.log(pluginCreate(folder, options.type));
  });

plugin
  .command('get <input>')
  .option('-j, --json', 'Output results as json')
  .description('Get registry plugin by id')
  .action(async (input: string, options: { json?: Boolean}) => {
    const [pluginId, pluginVersion] = inputGetParts(input);
    console.log(formatOutput(await pluginGet(pluginId, pluginVersion), options.json));
  });

plugin
  .command('getLocal <path>')
  .option('-j, --json', 'Output results as json')
  .description('Get local plugin details by path')
  .action(async (path: string, options: { json?: Boolean}) => {
    console.log(formatOutput(await pluginGetLocal(path), options.json));
  });

plugin
  .command('install <input>')
  .option('-j, --json', 'Output results as json')
  .description('Install a plugin by id')
  .action(async (input: string, options: { json?: Boolean}) => {
    const [pluginId, pluginVersion] = inputGetParts(input);
    console.log(formatOutput(await pluginInstall(pluginId, pluginVersion), options.json));
  });

plugin
  .command('list')
  .option('-j, --json', 'Output results as json')
  .description('List registry plugins')
  .action(async (options: { json?: Boolean}) => {
    console.log(formatOutput(await pluginsGet(), options.json, true));
  });

plugin
  .command('listLocal')
  .option('-j, --json', 'Output results as json')
  .description('List local plugins')
  .action(async (options: { json?: Boolean}) => {
    console.log(formatOutput(await pluginsGetLocal(), options.json, true));
  });

plugin
  .command('search <query>')
  .option('-j, --json', 'Output results as json')
  .description('Search registry plugins')
  .action(async (query: string, options: { json?: Boolean}) => {
    console.log(formatOutput(await pluginSearch(query), options.json, true));
  });

plugin
  .command('uninstall <input>')
  .option('-j, --json', 'Output results as json')
  .description('Uninstall a plugin by id')
  .action(async (input: string, options: { json?: Boolean}) => {
    const [pluginId, pluginVersion] = inputGetParts(input);
    console.log(formatOutput(await pluginUninstall(pluginId, pluginVersion), options.json));
  });

// Helper function to format output
function formatOutput(result: any, json?: Boolean, list?: Boolean) {
  if (json) {
    return JSON.stringify(result, null, 2);
  }
  const table = new Table3({
    head: ['Id', 'Name', 'Description', 'Date', 'Version', 'Tags']
  });
  if (list) {
    for (const key in result) {
      const latest = result[key].versions ? pluginLatest(result[key]) : result[key];
      table.push([
        latest.id || '-',
        latest.name || '-',
        latest.description || '-',
        latest.date.split('T')[0] || '-',
        latest.version || '-',
        latest.tags.join(', ') || '-',
      ]);
    }
  } else {
    const latest = pluginLatest(result);
    table.push([
      latest.id || '-',
      latest.name || '-',
      latest.description || '-',
      latest.date.split('T')[0] || '-',
      latest.version || '-',
      latest.tags.join(', ') || '-',
    ]);
  }
  return table.toString();
}


export { plugin };
