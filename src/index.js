const extensions = require('./config/extensions.json');
const file = require('./file.js');

const library = file.searchDirectory('./example', extensions);
console.log('library', JSON.stringify(library, null, 2));
