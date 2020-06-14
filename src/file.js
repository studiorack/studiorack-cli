const fs = require('fs');
const path = require('path');

function searchDirectory(directory, extensions, library) {
  if (!library) {
    library = {};
  }
  if (fs.existsSync(directory)) {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      const filename = path.join(directory, file);
      const fileExt =  path.extname(filename);
      const group = extensions[fileExt];
      const stat = fs.lstatSync(filename);
      if (stat.isDirectory()) {
        searchDirectory(filename, extensions, library);
      } else if (group) {
        console.log('+', filename);
        if (!library[group]) {
          library[group] = [];
        }
        library[group].push({
          filename: filename
        });
      } else {
        console.log('-', filename);
      }
    });
    return library;
  } else {
    console.error('Cannont find', directory);
  }
}

module.exports.searchDirectory= searchDirectory;
