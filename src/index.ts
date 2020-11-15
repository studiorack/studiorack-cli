#!/usr/bin/env node

import * as open from 'open';
import * as program from 'commander';
import {
  dirRead,
  fileJsonCreate,
  fileOpen,
  pathGetVersionId,
  pluginCreate,
  pluginInstall,
  pluginSearch,
  pluginUninstall,
  projectInit,
  projectLoad,
  projectSave,
  validateInstall,
  validatePlugin,
} from '@studiorack/core';

const pkg = require('../package.json');
const REGISTRY_PUBLISH =
  'https://github.com/studiorack/studiorack-site/issues/new?title=Publish%20my%20plugin&body=Github%20repo%3A%20&labels=enhancement';

program
  .command('create <folder>')
  .description('Create a new folder using the plugin starter template')
  .action((folder: string) => {
    pluginCreate(folder);
  });

program.command('init').description('Set up a new or existing StudioRack project.').action(projectInit);

program
  .command('install [id]')
  .option('-g, --global', 'install the plugin globally rather than locally')
  .description('Install a plugin and update project config.')
  .action(async (input: string, options: any) => {
    const project = projectLoad();
    if (input) {
      const [id, version] = pathGetVersionId(input);
      const installedVersion = await pluginInstall(id, version, options.global);
      if (installedVersion) {
        project.plugins[id] = installedVersion;
      }
    } else {
      for (const pluginId in project.plugins) {
        const installedVersion = await pluginInstall(pluginId, project.plugins[pluginId], options.global);
        if (installedVersion) {
          project.plugins[pluginId] = installedVersion;
        }
      }
    }
    return projectSave(project);
  });

program
  .command('uninstall [id]')
  .option('-g, --global', 'uninstall the plugin globally rather than locally')
  .description('Uninstall a plugin and update project config.')
  .action(async (input: string, options: any) => {
    const project = projectLoad();
    if (input) {
      const [id, version] = pathGetVersionId(input);
      let result: string = version;
      if (!result) {
        result = project.plugins[id];
      }
      const success = pluginUninstall(id, result, options.global);
      if (success) {
        delete project.plugins[id];
      }
    } else {
      for (const pluginId in project.plugins) {
        const success = pluginUninstall(pluginId, project.plugins[pluginId], options.global);
        if (success) {
          delete project.plugins[pluginId];
        }
      }
    }
    return projectSave(project);
  });

program
  .command('publish')
  .description('Publish plugin to the registry')
  .action(async () => {
    await open(REGISTRY_PUBLISH);
  });

program
  .command('search <query>')
  .description('Search plugin registry by query.')
  .action(async (query: string) => {
    const results = await pluginSearch(query);
    console.log(JSON.stringify(results, null, 2));
    console.log(`${results.length} results found.`);
  });

program
  .command('start [path]')
  .description('Start music project using the project config.')
  .action(async (path: string) => {
    const project = await projectLoad();
    await fileOpen(path || project.main);
  });

program
  .command('validate [path]')
  .option('-j, --json', 'plugin json file')
  .option('-s, --summary', 'plugins summary json file')
  .option('-t, --txt', 'plugin txt file')
  .option('-z, --zip', 'create a zip file of plugin')
  .description('Validate a plugin using the Steinberg VST3 SDK validator')
  .action(async (pluginPath: string, options: any) => {
    const plugins: any[] = [];
    const pluginRack = {
      plugins,
    };
    await validateInstall();
    if (pluginPath.includes('*')) {
      const pathList = dirRead(pluginPath);
      pathList.forEach((pathItem) => {
        const plugin = validatePlugin(pathItem, options);
        pluginRack.plugins.push(plugin);
      });
    } else {
      const plugin = validatePlugin(pluginPath, options);
      pluginRack.plugins.push(plugin);
    }
    if (options.summary) {
      const rootPath = pluginPath.replace('**/*.{vst,vst3}', '').substring(0, pluginPath.lastIndexOf('/'));
      fileJsonCreate(`${rootPath}plugins.json`, pluginRack);
      console.log(`Generated: ${rootPath}plugins.json`);
    }
  });

program.version(pkg.version).parse(process.argv);
