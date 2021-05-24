import * as Table3 from 'cli-table3';
import { Command } from 'commander';
import {
  inputGetParts,
  pathGetDirectory,
  pathGetWithoutExt,
  projectCreate,
  projectInstall,
  projectGetLocal,
  projectsGetLocal,
  projectStart,
  projectUninstall,
} from '@studiorack/core';

const program = new Command();
const project = program
  .command('project')
  .description('View/update projects');

project
  .command('create <path>')
  .option('-p, --prompt <prompt>', 'Prompt questions')
  .description('Create project using a starter template')
  .action((path: string, options?: { prompt?: boolean }) => {
    console.log(projectCreate(`${pathGetWithoutExt(path)}.json`, options?.prompt));
  });

project
  .command('getLocal <id>')
  .option('-j, --json', 'Output results as json')
  .description('Get local project details by id')
  .action(async (id: string, options?: { json?: boolean }) => {
    console.log(formatOutput(await projectGetLocal(id), options?.json));
  });

project
  .command('install <id> [input]')
  .option('-j, --json', 'Output results as json')
  .description('Install project by id')
  .action(async (id: string, input?: string, options?: { json?: boolean }, ) => {
    const projectLocal = await projectGetLocal(id);
    const [pluginId, pluginVersion] = inputGetParts(input || '');
    console.log(formatOutput(await projectInstall(`${projectLocal.path}/${pathGetWithoutExt(projectLocal.files.project.name)}.json`, pluginId, pluginVersion), options?.json));
  });

project
  .command('listLocal')
  .option('-j, --json', 'Output results as json')
  .description('List local projects')
  .action(async (options: { json?: boolean }) => {
    console.log(formatOutput(await projectsGetLocal(), options.json, true));
  });

project
  .command('open <id>')
  .description('Open project by id')
  .action(async (id: string) => {
    const projectLocal = await projectGetLocal(id);
    const projectRoot = pathGetDirectory(projectLocal.path);
    await projectStart(`${projectRoot}/${projectLocal.files.project.name}`);
  });

project
  .command('uninstall <id> [input]')
  .option('-j, --json', 'Output results as json')
  .description('Uninstall project by id')
  .action(async (id: string, input?: string, options?: { json?: boolean }) => {
    const projectLocal = await projectGetLocal(id);
    const [pluginId, pluginVersion] = inputGetParts(input || '');
    console.log(formatOutput(await projectUninstall(`${projectLocal.path}/${pathGetWithoutExt(projectLocal.files.project.name)}.json`, pluginId, pluginVersion), options?.json));
  });

// Helper function to format output
function formatOutput(result: any, json?: boolean, list?: boolean): string {
  if (!result) {
    return `Project not found`;
  }
  if (json) {
    return JSON.stringify(result, null, 2);
  }
  const table = new Table3({
    head: ['Id', 'Name', 'Description', 'Date', 'Version', 'Tags'],
  });
  if (list) {
    if (result.length === 0) {
      return `No results found`;
    }
    for (const key in result) {
      const latest = result[key];
      table.push([
        latest.id ? `${latest.repo}/${latest.id}` : '-',
        latest.name || '-',
        latest.description || '-',
        latest.date.split('T')[0] || '-',
        latest.version || '-',
        latest.tags.join(', ') || '-',
        // Object.keys(latest.plugins).join(', ') || '-',
      ]);
    }
  } else {
    const latest = result;
    table.push([
      latest.id ? `${latest.repo}/${latest.id}` : '-',
      latest.name || '-',
      latest.description || '-',
      latest.date.split('T')[0] || '-',
      latest.version || '-',
      latest.tags.join(', ') || '-',
      // Object.keys(latest.plugins).join(', ') || '-',
    ]);
  }
  return table.toString();
}

export { project };
