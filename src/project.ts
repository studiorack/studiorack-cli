import * as Table3 from 'cli-table3';
import { Command } from 'commander';
import {
  inputGetParts,
  projectCreate,
  projectGetLocal,
  projectInstall,
  projectsGetLocal,
  projectStart,
  projectUninstall,
} from '@studiorack/core';

const program = new Command();
const project = program
  .command('project')
  .description('View/update projects');

project
  .command('create <folder>')
  .option('-p, --prompt <prompt>', 'Prompt questions')
  .description('Create project using a starter template')
  .action((folder: string, options: { prompt?: boolean }) => {
    console.log(projectCreate(folder, options.prompt));
  });

project
  .command('getLocal <input>')
  .option('-j, --json', 'Output results as json')
  .description('Get local project details by path')
  .action(async (path: string, options: { json?: boolean }) => {
    console.log(formatOutput(await projectGetLocal(path), options.json));
  });

project
  .command('install <path> [input]')
  .option('-j, --json', 'Output results as json')
  .description('Install project by path')
  .action(async (path: string, options: { json?: boolean }, input?: string) => {
    const [pluginId, pluginVersion] = inputGetParts(input || '');
    console.log(formatOutput(await projectInstall(path, pluginId, pluginVersion), options.json));
  });

project
  .command('listLocal')
  .option('-j, --json', 'Output results as json')
  .description('List local projects')
  .action(async (options: { json?: boolean }) => {
    console.log(formatOutput(await projectsGetLocal(), options.json, true));
  });

project
  .command('open <path>')
  .description('Open project')
  .action(async (path: string, options: { json?: boolean }) => {
    console.log(await projectStart(path));
  });

project
  .command('uninstall <path> [input]')
  .option('-j, --json', 'Output results as json')
  .description('Uninstall project by path')
  .action(async (path: string, options: { json?: boolean }, input?: string) => {
    const [pluginId, pluginVersion] = inputGetParts(input || '');
    console.log(formatOutput(await projectUninstall(path, pluginId, pluginVersion), options.json));
  });

// Helper function to format output
function formatOutput(result: any, json?: boolean, list?: boolean) {
  if (json) {
    return JSON.stringify(result, null, 2);
  }
  const table = new Table3({
    head: ['Id', 'Name', 'Description', 'Date', 'Version', 'Tags'],
  });
  if (list) {
    for (const key in result) {
      const latest = result[key];
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
    const latest = result;
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

export { project };
