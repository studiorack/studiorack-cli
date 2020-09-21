const AdmZip = require('adm-zip');
const exec = require('child_process').exec;
const fs = require('fs');
const fsUtils = require('nodejs-fs-utils');
const glob = require('glob');
const path = require('path');

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

function createFileZip(filesPath, zipPath) {
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }
  const zip = new AdmZip();
  const pathList = readDir(filesPath);
  pathList.forEach(pathItem => {
    if (fs.lstatSync(pathItem).isDirectory()) {
      zip.addLocalFolder(pathItem, path.basename(pathItem));
    } else {
      zip.addLocalFile(pathItem);
    }
  });
  return zip.writeZip(zipPath);
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

function directoryRename(oldPath, newPath) {
  return fs.renameSync(oldPath, newPath);
}

function extractZip(content, path) {
  const zip = new AdmZip(content);
  return zip.extractAllTo(path);
}

function getPlatformPrefix() {
  switch (process.platform) { 
    case 'darwin' : return 'mac';
    case 'win32' : return 'win';
    case 'win64' : return 'win';
    default : return 'linux';
  }
}

function getDate(path) {
  return fs.statSync(path).mtime;
}

function getSize(path) {
  return fsUtils.fsizeSync(path);
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

function makeExecutable(path) {
  return fs.chmodSync(path, '755');
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

function readDir(path) {
  return glob.sync(path);
}

module.exports.createDirectory = createDirectory;
module.exports.createFile = createFile;
module.exports.createFileJson = createFileJson;
module.exports.createFileZip = createFileZip;
module.exports.deleteDirectory = deleteDirectory;
module.exports.directoryEmpty = directoryEmpty;
module.exports.directoryExists = directoryExists;
module.exports.directoryRename = directoryRename;
module.exports.extractZip = extractZip;
module.exports.getPlatformPrefix = getPlatformPrefix;
module.exports.getDate = getDate;
module.exports.getSize = getSize;
module.exports.loadFile = loadFile;
module.exports.loadFileJson = loadFileJson;
module.exports.makeExecutable = makeExecutable;
module.exports.openFile = openFile;
module.exports.readDir = readDir;
