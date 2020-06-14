const fs = require('fs');
const path = require('path');

const AUDIO_EXT = '.wav';
const IMAGE_EXT = '.png';

function searchDirectory(directory, extensions, library) {
  if (!library) {
    library = {};
  }
  if (fs.existsSync(directory)) {
    const pathList = fs.readdirSync(directory);
    pathList.forEach((pathItem) => {
      const fullPath = path.join(directory, pathItem);
      const dirName = path.dirname(fullPath) + '/';
      const fileExt = path.extname(pathItem);
      const fileName = path.basename(pathItem, fileExt);
      const group = extensions[fileExt];
      const stat = fs.lstatSync(fullPath);
      if (stat.isDirectory()) {
        searchDirectory(fullPath, extensions, library);
      } else if (group) {
        console.log('+', fullPath);
        const item = {
          folder: dirName,
          file: fileName + fileExt
        };
        if (!library[group]) {
          library[group] = [];
        }
        if (fs.existsSync(dirName + fileName + AUDIO_EXT)) {
          item.audio = fileName + AUDIO_EXT;
        }
        if (fs.existsSync(dirName + fileName + IMAGE_EXT)) {
          item.image = fileName + IMAGE_EXT;
        }
        library[group].push(item);
      } else {
        console.log('-', fullPath);
      }
    });
    return library;
  } else {
    console.error('Cannot find', directory);
  }
}

module.exports.searchDirectory= searchDirectory;
