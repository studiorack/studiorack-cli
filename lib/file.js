const AdmZip = require('adm-zip');
const exec = require('child_process').exec;
const fs = require('fs');

function createDirectory(path) {
  if (!fs.existsSync(path)) {
    return fs.mkdirSync(path, { recursive: true });
  }
}

function createFile(path, data) {
  return fs.writeFileSync(path, data);
}

function createFileJson(path, data) {
  return createFile(path, JSON.stringify(data, null, 2));
}

function deleteDirectory(path) {
  if (fs.existsSync(path)) {
    return fs.rmdirSync(path, { recursive: true });
  }
}

function directoryEmpty(path) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.DS_Store');
}

function directoryExists(path) {
  return fs.existsSync(path);
}

function extractZip(content, path) {
  const zip = new AdmZip(content);
  return zip.extractAllTo(path);
}

function loadFile(path) {
  return fs.readFileSync(path);
}

function loadFileJson(path) {
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path));
  } else {
    return false;
  }
}

function openFile(filePath) {
  let command = '';
  switch (process.platform) { 
    case 'darwin' : command = 'open'; break;
    case 'win32' : command = 'start'; break;
    case 'win64' : command = 'start'; break;
    default : command = 'xdg-open'; break;
  }
  return exec(`${command} ${filePath}`);
}

module.exports.createDirectory = createDirectory;
module.exports.createFile = createFile;
module.exports.createFileJson = createFileJson;
module.exports.deleteDirectory = deleteDirectory;
module.exports.directoryEmpty = directoryEmpty;
module.exports.directoryExists = directoryExists;
module.exports.extractZip = extractZip;
module.exports.loadFile = loadFile;
module.exports.loadFileJson = loadFileJson;
module.exports.openFile = openFile;
