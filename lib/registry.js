const api = require('./api');
const file = require('./file');

const PLUGIN_DIR = './plugins';
const REGISTRY_PATH = '/data/registry.json';

function getPlugin(id) {
  const plugins = getPlugins();
  return plugins[id];
}

function getPlugins() {
  return file.loadFileJson(__dirname + REGISTRY_PATH);
}

function getSource(plugin) {
  return plugin.sources[process.platform];
}

async function installPlugin(id) {
  if (pluginInstalled(id)) {
    return console.error(`Plugin already installed ${PLUGIN_DIR}/${id}`);
  }
  const plugin = getPlugin(id);
  if (!plugin) {
    return console.error(`Plugin not found ${id}`);
  }
  const source = getSource(plugin);
  if (source.slice(-4) !== '.zip') {
    return console.error(`Unsupported file type ${source.slice(-4)}`);
  }
  const data = await api.getRaw(source);
  file.createDirectory(`${PLUGIN_DIR}/${id}`);
  file.extractZip(data, `${PLUGIN_DIR}/${id}`);
  return plugin.version;
}

function pluginInstalled(id) {
  return file.directoryExists(`${PLUGIN_DIR}/${id}`);
}

function search(query) {
  const plugins = getPlugins();
  const results = [];
  for (pluginId in plugins) {
    const plugin = plugins[pluginId];
    if (
      plugin.name.indexOf(query) != -1 ||
      plugin.description.indexOf(query) != -1 ||
      plugin.tags.includes(query)) {
        results.push(plugin);
    }
  }
  return results;
}

function uninstallPlugin(id) {
  if (!pluginInstalled(id)) {
    return console.error(`Plugin not installed ${PLUGIN_DIR}/${id}`);
  }
  file.deleteDirectory(`${PLUGIN_DIR}/${id}`);
  return true;
}

module.exports.getPlugin = getPlugin;
module.exports.getPlugins = getPlugins;
module.exports.getSource = getSource;
module.exports.installPlugin = installPlugin;
module.exports.pluginInstalled = pluginInstalled;
module.exports.search = search;
module.exports.uninstallPlugin = uninstallPlugin;
