const config = require('./config');
const file = require('./file');
const readline = require('readline-sync');
const registry = require('./registry');

function init() {
  const project = config.load();
  project.name = askQuestion('Name', project.name);
  project.version = askQuestion('Version', project.version);
  project.description = askQuestion('Description', project.description);
  project.main = askQuestion('Main', project.main);
  project.preview.audio = askQuestion('Audio', project.preview.audio);
  project.preview.image = askQuestion('Image', project.preview.image);
  return config.save(project);
}

async function install(id) {
  const project = config.load();
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
  return config.save(project);
}

function uninstall(id) {
  const project = config.load();
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
  return config.save(project);
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

function askQuestion(label, input) {
  return readline.question(`${label}: ($<defaultInput>) `, { defaultInput: input });
}

module.exports.init = init;
module.exports.install = install;
module.exports.uninstall = uninstall;
module.exports.search = search;
module.exports.start = start;
