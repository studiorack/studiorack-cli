const file = require('./file.js');
const readline = require('readline-sync');

const PROJECT_CONFIG = '/project.json';

function askQuestion(label, input) {
  return readline.question(`${label}: ($<defaultInput>) `, { defaultInput: input });
}

async function init() {
  const project = await file.loadFileJson(process.cwd() + PROJECT_CONFIG) || {};
  project.name = askQuestion('Name', project.name);
  project.version = askQuestion('Version', project.version);
  project.description = askQuestion('Description', project.description);
  project.main = askQuestion('Main', project.main);
  project.preview.audio = askQuestion('Audio', project.preview.audio);
  project.preview.image = askQuestion('Image', project.preview.image);
  return await file.createFileJson(process.cwd() + PROJECT_CONFIG, project);
}

module.exports.init = init;
