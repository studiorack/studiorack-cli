const api = require('./api');
const file = require('./file');
const homedir = require('os').homedir();

const PLUGIN_DIR = './plugins';
const REGISTRY_PATH = process.env.REGISTRY_PATH || 'https://studiorack.github.io/studiorack-registry/_next/data/latest/index.json';

async function getPlugin(id) {
  let match = false;
  const plugins = await getPlugins();
  plugins.forEach((plugin) => {
    if (plugin.id === id) {
      match = plugin;
    }
  })
  return match;
}

async function getPlugins() {
  return await api.getJSON(REGISTRY_PATH).then((data) => {
    return data.pageProps.plugins;
  })
}

function getPluginFolder(global) {
  const supported = {
    'aix': homedir + '/.vst3',
    'darwin': homedir + '/Library/Audio/Plug-ins/VST3',
    'freebsd': homedir + '/.vst3',
    'linux': homedir + '/.vst3',
    'openbsd': homedir + '/.vst3',
    'sunos': homedir + '/.vst3',
    'win32': '/Program Files/Common Files/VST3',
    'win64': '/Program Files/Common Files/VST3'
  }
  if (global) {
    return supported[process.platform];
  } else {
    return PLUGIN_DIR;
  }
}

function getSource(plugin) {
  var supported = {
    'aix': 'linux',
    'darwin': 'mac',
    'freebsd': 'linux',
    'linux': 'linux',
    'openbsd': 'linux',
    'sunos': 'linux',
    'win32': 'win',
    'win64': 'win'
  }
  if (supported[process.platform]) {
    return `https://github.com/${plugin.id}/releases/latest/download/plugin-${supported[process.platform]}.zip`;
  }
  return false;
}

async function installPlugin(id, global) {
  if (pluginInstalled(id, global)) {
    return console.error(`Plugin already installed ${getPluginFolder(global)}/${id}`);
  }
  const plugin = await getPlugin(id);
  console.log(plugin);
  if (!plugin) {
    return console.error(`Plugin not found ${id}`);
  }
  const source = getSource(plugin);
  if (!source) {
    return console.error(`Plugin not available for your system ${id}`);
  }
  if (source.slice(-4) !== '.zip') {
    return console.error(`Unsupported file type ${source.slice(-4)}`);
  }
  const data = await api.getRaw(source);
  file.createDirectory(`${getPluginFolder(global)}/${id}`);
  file.extractZip(data, `${getPluginFolder(global)}/${id}`);
  return plugin.version;
}

function pluginInstalled(id, global) {
  return file.directoryExists(`${getPluginFolder(global)}/${id}`);
}

async function search(query) {
  query = query.toLowerCase();
  const plugins = await getPlugins();
  const results = [];
  for (pluginId in plugins) {
    const plugin = plugins[pluginId];
    if (
      plugin.name.toLowerCase().indexOf(query) != -1 ||
      plugin.description.toLowerCase().indexOf(query) != -1 ||
      plugin.tags.includes(query)) {
        results.push(plugin);
    }
  }
  return results;
}

function uninstallPlugin(id, global) {
  if (!pluginInstalled(id, global)) {
    return console.error(`Plugin not installed ${getPluginFolder(global)}/${id}`);
  }
  file.deleteDirectory(`${getPluginFolder(global)}/${id}`);
  const parentDir = `${getPluginFolder(global)}/${id.split('/')[0]}`;
  if (file.directoryEmpty(parentDir)) {
    file.deleteDirectory(parentDir);
  }
  return true;
}

module.exports.getPlugin = getPlugin;
module.exports.getPlugins = getPlugins;
module.exports.getSource = getSource;
module.exports.installPlugin = installPlugin;
module.exports.pluginInstalled = pluginInstalled;
module.exports.search = search;
module.exports.uninstallPlugin = uninstallPlugin;
