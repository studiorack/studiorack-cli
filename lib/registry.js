const api = require('./api');
const file = require('./file');
const homedir = require('os').homedir();

const PLUGIN_DIR = './plugins';
const PLUGIN_TEMPLATE = 'https://github.com/studiorack/studiorack-plugin/archive/master.zip';
const REGISTRY_PATH = process.env.REGISTRY_PATH || 'https://studiorack.github.io/studiorack-registry/';

async function createPlugin(folder) {
  if (file.directoryExists(folder)) {
    console.error(`Directory already exists: ${folder}`);
    return false;
  }
  const data = await api.getRaw(PLUGIN_TEMPLATE);
  file.extractZip(data, './');
  file.directoryRename('studiorack-plugin-master', folder);
  return true;
}

async function getPlugin(id) {
  const plugins = await getPlugins();
  return plugins[id] || false;
}

async function getPlugins() {
  return await api.getJSON(REGISTRY_PATH).then((data) => {
    return data.objects;
  })
}

function getPluginFolder(global) {
  const supported = {
    'aix': homedir + '/.vst3',
    'darwin': '/Library/Audio/Plug-ins/VST3',
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

function getSource(repoId, pluginId, version) {
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
    return `https://github.com/${repoId}/releases/download/v${version}/${pluginId}-${supported[process.platform]}.zip`;
  }
  return false;
}

function getRepo(id) {
  return id.slice(0, id.lastIndexOf('/'))
}

function getPluginId(id) {
  return id.slice(id.lastIndexOf('/') + 1)
}

async function installPlugin(id, version, global) {
  const plugin = await getPlugin(id);
  const pluginId = getPluginId(id);
  const repoId = getRepo(id);
  if (!version) {
    version = plugin.version;
  }
  if (pluginInstalled(repoId, pluginId, version, global)) {
    console.error(`Plugin already installed ${getPluginFolder(global)}/${repoId}/${pluginId}/${version}`);
    return version;
  }
  if (!plugin) {
    return console.error(`Plugin not found ${id}`);
  }
  if (!plugin.versions[version]) {
    return console.error(`Plugin version not found ${version}`);
  }
  const source = getSource(repoId, pluginId, version);
  if (!source) {
    return console.error(`Plugin not available for your system ${id}`);
  }
  if (source.slice(-4) !== '.zip') {
    return console.error(`Unsupported file type ${source.slice(-4)}`);
  }
  const data = await api.getRaw(source);
  file.createDirectory(`${getPluginFolder(global)}/${repoId}/${pluginId}/${version}`);
  file.extractZip(data, `${getPluginFolder(global)}/${repoId}/${pluginId}/${version}`);
  return version;
}

function pluginInstalled(repoId, pluginId, version, global) {
  return file.directoryExists(`${getPluginFolder(global)}/${repoId}/${pluginId}/${version}`);
}

async function search(query) {
  query = query.toLowerCase();
  const plugins = await getPlugins();
  const results = [];
  for (pluginId in plugins) {
    const plugin = plugins[pluginId];
    const latest = plugin.versions[plugin.version];
    if (
      latest.name.toLowerCase().indexOf(query) != -1 ||
      latest.description.toLowerCase().indexOf(query) != -1 ||
      latest.tags.includes(query)) {
        results.push(plugin);
    }
  }
  return results;
}

function uninstallPlugin(id, version, global) {
  const pluginId = getPluginId(id);
  const repoId = getRepo(id);
  if (!pluginInstalled(repoId, pluginId, version, global)) {
    return console.error(`Plugin not installed ${getPluginFolder(global)}/${repoId}/${pluginId}/${version}`);
  }
  file.deleteDirectory(`${getPluginFolder(global)}/${repoId}/${pluginId}/${version}`);
  const pluginDir = `${getPluginFolder(global)}/${repoId}/${pluginId}`;
  if (file.directoryEmpty(pluginDir)) {
    file.deleteDirectory(pluginDir);
  }
  const parentDir = `${getPluginFolder(global)}/${repoId}`;
  if (file.directoryEmpty(parentDir)) {
    file.deleteDirectory(parentDir);
  }
  const grandparentDir = `${getPluginFolder(global)}/${repoId.split('/')[0]}`;
  if (file.directoryEmpty(grandparentDir)) {
    file.deleteDirectory(grandparentDir);
  }
  return true;
}

module.exports.createPlugin = createPlugin;
module.exports.getPlugin = getPlugin;
module.exports.getPlugins = getPlugins;
module.exports.getSource = getSource;
module.exports.installPlugin = installPlugin;
module.exports.pluginInstalled = pluginInstalled;
module.exports.search = search;
module.exports.uninstallPlugin = uninstallPlugin;
