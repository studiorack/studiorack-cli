import CliTable3 from 'cli-table3';
import { Command } from 'commander';
import {
  inputGetParts,
  pathGetWithoutExt,
  projectCreate,
  projectInstall,
  projectGetLocal,
  projectsGetLocal,
  projectStart,
  projectUninstall,
  logEnable,
} from '@studiorack/core';
import { CliOptions, CliProjectCreateOptions } from './types/options.js';

const program = new Command();
const project = program.command('project').description('View/update projects');

project
  .command('create <path>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .option('-p, --prompt <prompt>', 'Prompt questions')
  .description('Create project using a starter template')
  .action((path: string, options: CliProjectCreateOptions) => {
    if (options.log) logEnable();
    console.log(projectCreate(path, options.prompt));
  });

project
  .command('getLocal <id>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Get local project details by id')
  .action(async (id: string, options: CliOptions) => {
    if (options.log) logEnable();
    console.log(formatOutput(await projectGetLocal(id), options.json));
  });

project
  .command('install <id> [input]')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Install project by id')
  .action(async (id: string, input?: string, options?: CliOptions) => {
    if (options?.log) logEnable();
    const projectLocal = await projectGetLocal(id);
    const [pluginId, pluginVersion] = inputGetParts(input || '');
    console.log(
      formatOutput(
        await projectInstall(
          `${projectLocal.path}/${pathGetWithoutExt(projectLocal.files.project.name || projectLocal.files.project.url)}.json`,
          pluginId,
          pluginVersion,
        ),
        options?.json,
      ),
    );
  });

project
  .command('listLocal')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('List local projects')
  .action(async (options: CliOptions) => {
    if (options.log) logEnable();
    console.log(formatOutput(await projectsGetLocal(), options.json, true));
  });

project
  .command('open <id>')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Open project by id')
  .action(async (id: string, options: CliOptions) => {
    if (options.log) logEnable();
    const projectLocal = await projectGetLocal(id);
    await projectStart(
      `${projectLocal.path}/${pathGetWithoutExt(projectLocal.files.project.name || projectLocal.files.project.url)}.json`,
    );
  });

project
  .command('uninstall <id> [input]')
  .option('-j, --json', 'Output results as json')
  .option('-l, --log', 'Enable logging')
  .description('Uninstall project by id')
  .action(async (id: string, input?: string, options?: CliOptions) => {
    if (options?.log) logEnable();
    const projectLocal = await projectGetLocal(id);
    const [pluginId, pluginVersion] = inputGetParts(input || '');
    console.log(
      formatOutput(
        await projectUninstall(
          `${projectLocal.path}/${pathGetWithoutExt(projectLocal.files.project.name || projectLocal.files.project.url)}.json`,
          pluginId,
          pluginVersion,
        ),
        options?.json,
      ),
    );
  });

// Helper function to format output
function formatOutput(result: any, json?: boolean, list?: boolean): string {
  if (!result) {
    return `Project not found`;
  }
  if (json) {
    return JSON.stringify(result, null, 2);
  }
  const table = new CliTable3({
    head: ['Id', 'Name', 'Description', 'Date', 'Version', 'Tags'],
  });
  if (list) {
    if (result.length === 0) {
      return `No results found`;
    }
    for (const key in result) {
      const latest = result[key];
      table.push([
        latest.id || '-',
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
      latest.id || '-',
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
