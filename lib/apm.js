const api = require('./api.js');
const file = require('./file.js');
const readline = require('readline-sync');
const registry = require('./registry');
const slugify = require('slugify');
slugify.extend({ '_': '-' });

const PROJECT_CONFIG = '/project.json';

function init() {
  const project = loadConfig();
  project.name = askQuestion('Name', project.name);
  project.version = askQuestion('Version', project.version);
  project.description = askQuestion('Description', project.description);
  project.main = askQuestion('Main', project.main);
  project.preview.audio = askQuestion('Audio', project.preview.audio);
  project.preview.image = askQuestion('Image', project.preview.image);
  file.createFileJson(process.cwd() + PROJECT_CONFIG, project);
  return project;
}

async function install(id) {
  const project = loadConfig();
  if (!project.plugins) {
    project.plugins = {};
  }
  if (id) {
    const version = await registry.installPlugin(id);
    if (version) {
      project.plugins[id] = version;
    }
  } else {
    for (const pluginId in project.plugins) {
      const version = await registry.installPlugin(pluginId);
      if (version) {
        project.plugins[pluginId] = version;
      }
    }
  }
  return saveConfig(project);
}

function uninstall(id) {
  const project = loadConfig();
  if (id) {
    const success = registry.uninstallPlugin(id);
    if (success) {
      delete project.plugins[id];
    }
  } else {
    for (const pluginId in project.plugins) {
      const success = registry.uninstallPlugin(pluginId);
      if (success) {
        delete project.plugins[pluginId];
      }
    }
  }
  return saveConfig(project);
}

function search(query) {
  const results = registry.search(query);
  console.log(results);
  console.log(`${results.length} results found.`);
}

async function start(path) {
  const project = await loadConfig();
  return await file.openFile(path || project.main);
}

function loadConfig() {
  return file.loadFileJson(process.cwd() + PROJECT_CONFIG) || {};
}

function saveConfig(config) {
  return file.createFileJson(process.cwd() + PROJECT_CONFIG, config);
}

function askQuestion(label, input) {
  return readline.question(`${label}: ($<defaultInput>) `, { defaultInput: input });
}

module.exports.init = init;
module.exports.install = install;
module.exports.uninstall = uninstall;
module.exports.search = search;
module.exports.start = start;
