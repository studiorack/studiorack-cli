const api = require('./api');
const { execSync } = require('child_process');
const file = require('./file');
const path = require('path');

const VALIDATOR_DIR = path.join(__dirname.substring(0, __dirname.lastIndexOf('lib')), 'bin', 'validator');
const VALIDATOR_EXT = file.getPlatformPrefix() === 'win' ? '.exe' : '';
const VALIDATOR_PATH = path.join(VALIDATOR_DIR, 'validator' + VALIDATOR_EXT);

const map = {
  category: 'description',
  name: 'name',
  subCategories: 'tags',
  url: 'homepage',
  vendor: 'author',
  version: 'version'
}

async function install() {
  // If binary does not exist, download Steinberg VST3 SDK validator binary
  if (!file.directoryExists(VALIDATOR_DIR)) {
    const data = await api.getRaw(`https://github.com/studiorack/studiorack-plugin/releases/latest/download/validator-${file.getPlatformPrefix()}.zip`);
    console.log('VALIDATOR_DIR', VALIDATOR_DIR);
    console.log('VALIDATOR_EXT', VALIDATOR_EXT);
    console.log('VALIDATOR_PATH', VALIDATOR_PATH);
    file.extractZip(data, VALIDATOR_DIR);
    file.makeExecutable(VALIDATOR_PATH);
    return true;
  }
  return false;
}

function processLog(pathItem, log) {
  const folder = pathItem.substring(0, pathItem.lastIndexOf('/'));
  // console.log('processLog', pathItem);
  const json = {};
  // loop through validator output
  for (let line of log.split('\n')) {
    // remove whitespace at start and end of lines
    line = line.trim();
    // only process lines assigning values
    if (line.includes(' = ')) {
      let [key, val] = line.split(' = ');
      // ignore keys with spaces
      if (!key.includes(' ')) {
        // turn bar delimited strings into arrays
        if (val.includes('|')) {
          val = val.split('|');
        }
        // ensure tags is always an array
        if (map[key] === 'tags' && val.constructor !== Array) {
          val = [val];
        }
        // rename and output only fields which exist in our map
        if (map[key]) {
          json[map[key]] = val;
        }
      }
    }
  }
  // get date then add to json
  const date = file.getDate(pathItem);
  if (date) {
    json.date = date.toISOString();
  }
  // get filesize then add to json
  const size = file.getSize(pathItem);
  if (size) {
    json.size = size;
  }
  // generate the id from the filename
  const id = path.basename(pathItem, path.extname(pathItem))
  if (id) {
    json.id = id;
  }
  // generate the id from the filename
  const filename = path.basename(pathItem)
  if (filename) {
    json.file = filename;
  }
  // if image exists add to json
  if (file.directoryExists(`${folder}/${id}.png`)) {
    json.image = `${id}.png`;
  }
  // if audio exists add to json
  if (file.directoryExists(`${folder}/${id}.wav`)) {
    json.audio = `${id}.wav`;
  }
  return json;
}

function readPlugin(pathItem, options) {
  if (!file.directoryExists(pathItem)) {
    console.error(`File does not exist: ${pathItem}`);
    return false;
  }
  console.log(`Reading: ${pathItem}`);
  const outputText = run(pathItem);
  const outputJson = processLog(pathItem, outputText);
  const filepath = pathItem.substring(0, pathItem.lastIndexOf('.'));
  if (options.txt) {
    console.log(outputText);
    file.createFile(`${filepath}.txt`, outputText);
    console.log(`Generated: ${filepath}.txt`);
  }
  if (options.json) {
    console.log(outputJson);
    file.createFileJson(`${filepath}.json`, outputJson);
    console.log(`Generated: ${filepath}.json`);
  }
  if (options.zip) {
    file.createFileZip(`${filepath}.*`, `${filepath}.zip`);
    console.log(`Generated: ${filepath}.zip`);
  }
  return outputJson;
}

function run(path) {
  // Run Steinberg VST3 SDK validator binary
  try {
    const sdout = execSync(`${VALIDATOR_PATH} "${path}"`);
    return sdout.toString();
  } catch (error) {
    return error.output ? error.output.toString() : error.toString();
  }
}

module.exports.install = install;
module.exports.processLog = processLog;
module.exports.readPlugin = readPlugin;
module.exports.run = run;
