const api = require('./api.js');
const file = require('./file.js');
const readline = require('readline-sync');
const slugify = require('slugify');

const PLUGIN_DIR = './plugins';
const PROJECT_CONFIG = '/project.json';

async function loadConfig() {
  return await file.loadFileJson(process.cwd() + PROJECT_CONFIG) || {};
}

function askQuestion(label, input) {
  return readline.question(`${label}: ($<defaultInput>) `, { defaultInput: input });
}

async function init() {
  const project = await loadConfig();
  project.name = askQuestion('Name', project.name);
  project.version = askQuestion('Version', project.version);
  project.description = askQuestion('Description', project.description);
  project.main = askQuestion('Main', project.main);
  project.preview.audio = askQuestion('Audio', project.preview.audio);
  project.preview.image = askQuestion('Image', project.preview.image);
  return await file.createFileJson(process.cwd() + PROJECT_CONFIG, project);
}

async function install(path) {
  const project = await loadConfig();
  const pathDetails = api.getPathDetails(path);
  const data = await api.getRaw(path);
  console.log(pathDetails);
  await file.createDirectory(`${PLUGIN_DIR}`);
  return await file.createFile(`${PLUGIN_DIR}/${pathDetails.fileName}${pathDetails.fileExt}`, data);
}

module.exports.init = init;
module.exports.install = install;
