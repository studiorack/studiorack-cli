const file = require('./file');

const PROJECT_CONFIG = '/project.json';

function load() {
  const project = file.loadFileJson(process.cwd() + PROJECT_CONFIG) || {};
  if (!project.plugins) {
    project.plugins = {};
  }
  return project;
}

function save(config) {
  return file.createFileJson(process.cwd() + PROJECT_CONFIG, config);
}

module.exports.load = load;
module.exports.save = save;
