const file = require('./file.js');
const readline = require('readline-sync');

const PROJECT_CONFIG = '/project.json';

function askQuestion(label, input) {
  return readline.question(`${label}: ($<defaultInput>) `, { defaultInput: input });
}

async function init() {
  const package = await file.loadFileJson(process.cwd() + PROJECT_CONFIG) || {};
  package.name = askQuestion('Name', package.name);
  package.version = askQuestion('Version', package.version);
  package.description = askQuestion('Description', package.description);
  package.main = askQuestion('Main', package.main);
  package.preview.audio = askQuestion('Audio', package.preview.audio);
  package.preview.image = askQuestion('Image', package.preview.image);
  return await file.createFileJson(process.cwd() + PROJECT_CONFIG, package);
}

module.exports.init = init;
