const config = require('./config');
const file = require('./file');
const open = require('open');
const readline = require('readline-sync');
const registry = require('./registry');
const validator = require('./validator');

const REGISTRY_PUBLISH = 'https://github.com/studiorack/studiorack-site/issues/new?title=Publish%20my%20plugin&body=Github%20repo%3A%20&labels=enhancement';

async function create(folder) {
  const result = await registry.createPlugin(folder);
  if (result) {
    console.log(`Created new plugin at: ${folder}`);
  }
}

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

async function install(input, options) {
  const project = config.load();
  if (input) {
    const [id, version] = parseIdVersion(input);
    const installedVersion = await registry.installPlugin(id, version, options.global);
    if (installedVersion) {
      project.plugins[id] = installedVersion;
    }
  } else {
    for (const pluginId in project.plugins) {
      const installedVersion = await registry.installPlugin(pluginId, project.plugins[pluginId], options.global);
      if (installedVersion) {
        project.plugins[pluginId] = installedVersion;
      }
    }
  }
  return config.save(project);
}

function uninstall(input, options) {
  const project = config.load();
  if (input) {
    let [id, version] = parseIdVersion(input);
    if (!version) {
      version = project.plugins[id];
    }
    const success = registry.uninstallPlugin(id, version, options.global);
    if (success) {
      delete project.plugins[id];
    }
  } else {
    for (const pluginId in project.plugins) {
      const success = registry.uninstallPlugin(pluginId, project.plugins[pluginId], options.global);
      if (success) {
        delete project.plugins[pluginId];
      }
    }
  }
  return config.save(project);
}

function parseIdVersion(input) {
  return input.split('@');
}

async function publish() {
  await open(REGISTRY_PUBLISH);
}

async function search(query) {
  const results = await registry.search(query);
  console.log(JSON.stringify(results, null, 2));
  console.log(`${results.length} results found.`);
}

async function start(path) {
  const project = await loadConfig();
  return await file.openFile(path || project.main);
}

function askQuestion(label, input) {
  return readline.question(`${label}: ($<defaultInput>) `, { defaultInput: input });
}

async function validate(pluginPath, options) {
  const plugins = [];
  await validator.install();
  if (pluginPath.includes('*')) {
    const pathList = file.readDir(pluginPath);
    pathList.forEach((pathItem) => {
      const plugin = validator.readPlugin(pathItem, options);
      plugins.push(plugin);
    });
  } else {
    const plugin = validator.readPlugin(pluginPath, options);
    plugins.push(plugin);
  }
  const rootPath = pluginPath.replace('**/*.{vst,vst3}', '').substring(0, pluginPath.lastIndexOf('/'));
  file.createFileJson(`${rootPath}plugins.json`, plugins);
  console.log(`Generated: ${rootPath}plugins.json`);
  return plugins;
}

module.exports.create = create;
module.exports.init = init;
module.exports.install = install;
module.exports.uninstall = uninstall;
module.exports.publish = publish;
module.exports.search = search;
module.exports.start = start;
module.exports.validate = validate;
