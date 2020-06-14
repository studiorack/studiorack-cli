const api = require('./api.js');
const file = require('./file.js');
const readline = require('readline-sync');
const slugify = require('slugify');
slugify.extend({ '_': '-' });

const PLUGIN_DIR = './plugins';
const PROJECT_CONFIG = '/project.json';

async function loadConfig() {
  return await file.loadFileJson(process.cwd() + PROJECT_CONFIG) || {};
}

function askQuestion(label, input) {
  return readline.question(`${label}: ($<defaultInput>) `, { defaultInput: input });
}

async function installPlugin(path, project) {
  const pathDetails = api.getPathDetails(path);
  const data = await api.getRaw(path);
  const slug = slugify(pathDetails.fileName, { lower: true });
  await file.createDirectory(`${PLUGIN_DIR}/${slug}`);
  await file.extractZip(data, `${PLUGIN_DIR}/${slug}`);
  if (!project.plugins) {
    project.plugins = {};
  }
  project.plugins[slug] = {
    version: '1.0.0',
    resolved: path,
    integrity: file.getHash(data),
  };
  return project.plugins[slug];
}

async function uninstallPlugin(path, project) {
  const pathDetails = api.getPathDetails(path);
  const slug = slugify(pathDetails.fileName, { lower: true });
  await file.deleteDirectory(`${PLUGIN_DIR}/${slug}`);
  if (project.plugins && project.plugins[slug]) {
    delete project.plugins[slug];
  }
  return slug;
}

async function init() {
  const project = await loadConfig();
  project.name = askQuestion('Name', project.name);
  project.version = askQuestion('Version', project.version);
  project.description = askQuestion('Description', project.description);
  project.main = askQuestion('Main', project.main);
  project.preview.audio = askQuestion('Audio', project.preview.audio);
  project.preview.image = askQuestion('Image', project.preview.image);
  await file.createFileJson(process.cwd() + PROJECT_CONFIG, project);
  return project;
}

async function install(path) {
  const project = await loadConfig();
  if (path) {
    await installPlugin(path, project);
  } else {
    for (const pluginKey in project.plugins) {
      const plugin = project.plugins[pluginKey];
      await installPlugin(plugin.resolved, project);
    }
  }
  return await file.createFileJson(process.cwd() + PROJECT_CONFIG, project);
}

async function uninstall(path) {
  const project = await loadConfig();
  if (path) {
    await uninstallPlugin(path, project);
  } else {
    for (const pluginKey in project.plugins) {
      const plugin = project.plugins[pluginKey];
      await uninstallPlugin(plugin.resolved, project);
    }
  }
  return await file.createFileJson(process.cwd() + PROJECT_CONFIG, project);
}

async function start(path) {
  const project = await loadConfig();
  return await file.openFile(path || project.main);
}

module.exports.init = init;
module.exports.install = install;
module.exports.uninstall = uninstall;
module.exports.start = start;
