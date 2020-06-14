const AdmZip = require('adm-zip');
const crypto = require('crypto');
const exec = require('child_process').exec;
const fs = require('fs');
const sys = require('util');

async function createDirectory(path) {
  if (!fs.existsSync(path)) {
    return await fs.mkdirSync(path, { recursive: true });
  }
}

async function createFile(path, data) {
  return await fs.writeFileSync(path, data);
}

async function createFileJson(path, data) {
  return await createFile(path, JSON.stringify(data, null, 2));
}

async function deleteDirectory(path) {
  if (fs.existsSync(path)) {
    return await fs.rmdirSync(path, { recursive: true });
  }
}

async function extractZip(content, path) {
  const zip = new AdmZip(content);
  return await zip.extractAllTo(path);
}

function getHash(data) {
  const hash = crypto.createHash('sha1');
  hash.setEncoding('hex');
  hash.write(data);
  hash.end();
  return hash.read();
}

async function loadFile(path) {
  return await fs.readFileSync(path);
}

async function loadFileJson(path) {
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path));
  } else {
    return false;
  }
}

async function openFile(filePath) {
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
module.exports.extractZip = extractZip;
module.exports.getHash = getHash;
module.exports.loadFile = loadFile;
module.exports.loadFileJson = loadFileJson;
module.exports.openFile = openFile;
