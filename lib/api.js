const request = require('request');

async function get(url, options) {
  console.log('api.get', url);
  return new Promise((resolve, reject) => {
    request(url, options, (error, response, body) => {
      if (error) {
        reject(error);
      }
      resolve(body);
    });
  });
};

async function getJSON(url) {
  return JSON.parse(await get(url));
};

async function getRaw(url) {
  console.log('api.getRaw', url);
  return get(url, { encoding: null });
};

module.exports.get = get;
module.exports.getJSON = getJSON;
module.exports.getRaw = getRaw;
