const fs = require('fs');

async function createDirectory(path) {
  if (!fs.existsSync(path)) {
    return await fs.mkdirSync(path, { recursive: true });
  }
}

async function createFile(path, data) {
  return await fs.writeFileSync(path, data);
}

async function createFileJson(path, data) {
  return await createFile(path, JSON.stringify(data, null, 4));
}

async function loadFile(path) {
  return await fs.readFileSync(path);
}

async function loadFileJson(path) {
  return JSON.parse(fs.readFileSync(path));
}

module.exports.createDirectory = createDirectory;
module.exports.createFile = createFile;
module.exports.createFileJson = createFileJson;
module.exports.loadFile = loadFile;
module.exports.loadFileJson = loadFileJson;
