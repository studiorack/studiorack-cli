const fs = require('fs');
const AdmZip = require('adm-zip');

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

async function extractZip(content, path) {
  const zip = new AdmZip(content);
  return await zip.extractAllTo(path);
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

module.exports.createDirectory = createDirectory;
module.exports.createFile = createFile;
module.exports.createFileJson = createFileJson;
module.exports.extractZip = extractZip;
module.exports.loadFile = loadFile;
module.exports.loadFileJson = loadFileJson;
