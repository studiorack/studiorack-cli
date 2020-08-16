const api = require('./api');
const config = require('./config');
const { execSync } = require('child_process');
const file = require('./file');
const open = require('open');
const readline = require('readline-sync');
const registry = require('./registry');

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

async function install(id, options) {
  const project = config.load();
  if (id) {
    const version = await registry.installPlugin(id, options.global);
    if (version) {
      project.plugins[id] = version;
    }
  } else {
    for (const pluginId in project.plugins) {
      const version = await registry.installPlugin(pluginId, options.global);
      if (version) {
        project.plugins[pluginId] = version;
      }
    }
  }
  return config.save(project);
}

function uninstall(id, options) {
  const project = config.load();
  if (id) {
    const success = registry.uninstallPlugin(id, options.global);
    if (success) {
      delete project.plugins[id];
    }
  } else {
    for (const pluginId in project.plugins) {
      const success = registry.uninstallPlugin(pluginId, options.global);
      if (success) {
        delete project.plugins[pluginId];
      }
    }
  }
  return config.save(project);
}

async function publish() {
  await open(REGISTRY_PUBLISH);
}

async function search(query) {
  const results = await registry.search(query);
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

async function validate(path) {
  // If binary does not exist, download Steinberg VST3 SDK validator binary
  if (!file.directoryExists('./bin/validator')) {
    const data = await api.getRaw(`https://github.com/studiorack/studiorack-plugin/releases/latest/download/validator-${file.getPlatformPrefix()}.zip`);
    file.extractZip(data, './bin/validator');
    execSync(`chmod +x ./bin/validator/validator`)
  }
  if (!file.directoryExists(path)) {
    console.error(`File does not exist: ${path}`);
    return false;
  }
  // Run Steinberg VST3 SDK validator binary
  try {
    const sdout = execSync(`./bin/validator/validator "${path}"`);
    return console.log(sdout.toString());
  } catch (error) {
    return console.log(error.toString());
  }
}

module.exports.create = create;
module.exports.init = init;
module.exports.install = install;
module.exports.uninstall = uninstall;
module.exports.publish = publish;
module.exports.search = search;
module.exports.start = start;
module.exports.validate = validate;
