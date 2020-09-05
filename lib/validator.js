const api = require('./api');
const { execSync } = require('child_process');
const file = require('./file');

const VALIDATOR_PATH = __dirname.substring(0, __dirname.lastIndexOf('/lib')) + '/bin/validator';

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
  if (!file.directoryExists(VALIDATOR_PATH)) {
    const data = await api.getRaw(`https://github.com/studiorack/studiorack-plugin/releases/latest/download/validator-${file.getPlatformPrefix()}.zip`);
    file.extractZip(data, VALIDATOR_PATH);
    execSync(`chmod +x ${VALIDATOR_PATH}/validator`);
    return true
  }
  return false
}

function processLog(path, log) {
  const folder = path.substring(0, path.lastIndexOf('/'));
  // console.log('processLog', path);
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
  // if we can get date then add to json
  const date = file.getDate(path);
  if (date) {
    json.date = date.toISOString();
  }
  // if we can get filesize then add to json
  const size = file.getSize(path);
  if (size) {
    json.size = size;
  }
  // if image exists add to json
  if (file.directoryExists(`${folder}/plugin.png`)) {
    json.image = 'plugin.png';
  }
  // if audio exists add to json
  if (file.directoryExists(`${folder}/plugin.wav`)) {
    json.audio = 'plugin.wav';
  }
  return json;
}

function readPlugin(path, options) {
  if (!file.directoryExists(path)) {
    console.error(`File does not exist: ${path}`);
    return false;
  }
  console.log(`Reading: ${path}`);
  let output = run(path);
  const filepath = path.substring(0, path.lastIndexOf('.'));
  if (options.metadata) {
    output = processLog(path, output);
    console.log(output);
    file.createFileJson(`${filepath}.json`, output);
    console.log(`Generated: ${filepath}.json`);
  } else {
    console.log(output);
    file.createFile(`${filepath}.txt`, output);
    console.log(`Generated: ${filepath}.txt`);
  }
  return output;
}

function run(path) {
  // Run Steinberg VST3 SDK validator binary
  try {
    const sdout = execSync(`${VALIDATOR_PATH}/validator "${path}"`);
    return sdout.toString();
  } catch (error) {
    return error.output ? error.output.toString() : error.toString();
  }
}

module.exports.install = install;
module.exports.processLog = processLog;
module.exports.readPlugin = readPlugin;
module.exports.run = run;
