const api = require('./api.js');
const file = require('./file.js');
const readline = require('readline-sync');
const slugify = require('slugify');
slugify.extend({ '_': '-' });

const PLUGIN_DIR = './plugins';
const PROJECT_CONFIG = '/project.json';
const PLUGIN_REGISTRY = '/data/registry.json';

async function loadConfig() {
  return await file.loadFileJson(process.cwd() + PROJECT_CONFIG) || {};
}

async function loadRegistry() {
  return await file.loadFileJson(__dirname + PLUGIN_REGISTRY) || {};
}

function askQuestion(label, input) {
  return readline.question(`${label}: ($<defaultInput>) `, { defaultInput: input });
}

async function installPlugin(path, project) {
  const pathDetails = api.getPathDetails(path);
  if (pathDetails.fileExt === '.zip') {
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
  } else {
    console.error('Unsupported format');
  }
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

async function install(key) {
  const project = await loadConfig();
  if (key) {
    if (api.isValidUrl(key)) {
        await installPlugin(key, project);
    } else {
      const registry = await loadRegistry();
      await installPlugin(registry[key].sources[process.platform], project);
    }
  } else {
    for (const pluginKey in project.plugins) {
      const plugin = project.plugins[pluginKey];
      await installPlugin(plugin.resolved, project);
    }
  }
  return await file.createFileJson(process.cwd() + PROJECT_CONFIG, project);
}

async function uninstall(key) {
  const project = await loadConfig();
  if (key) {
    if (api.isValidUrl(key)) {
        await uninstallPlugin(key, project);
    } else {
      const registry = await loadRegistry();
      await uninstallPlugin(registry[key].sources[process.platform], project);
    }
  } else {
    for (const pluginKey in project.plugins) {
      const plugin = project.plugins[pluginKey];
      await uninstallPlugin(plugin.resolved, project);
    }
  }
  return await file.createFileJson(process.cwd() + PROJECT_CONFIG, project);
}

async function search(query) {
  const registry = await loadRegistry();
  const results = [];
  for (pluginKey in registry) {
    const plugin = registry[pluginKey];
    if (
      plugin.name.indexOf(query) != -1 ||
      plugin.description.indexOf(query) != -1 ||
      plugin.tags.includes(query)) {
        results.push(plugin);
    }
  }
  console.log(results);
  console.log(`${results.length} results found.`);
  return results;
}

async function start(path) {
  const project = await loadConfig();
  return await file.openFile(path || project.main);
}

module.exports.init = init;
module.exports.install = install;
module.exports.uninstall = uninstall;
module.exports.search = search;
module.exports.start = start;
