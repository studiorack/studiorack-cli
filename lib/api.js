const path = require('path');
const request = require('sync-request');
const url = require('url');

async function get(url) {
  console.log('api.get', url);
  return await request('GET', url, null).getBody('utf8');
};

async function getJSON(url) {
  console.log('api.getJSON', `${this.getAPI()}/${url}`);
  return JSON.parse(await get(`${this.getAPI()}/${url}`));
};

function getPathDetails(fullUrl) {
  const parsedUrl = url.parse(fullUrl);
  const fileExt = path.extname(parsedUrl.pathname);
  return {
    fileExt: fileExt,
    fileName: path.basename(parsedUrl.pathname, fileExt)
  };
}

async function getRaw(url) {
  console.log('api.getRaw', url);
  return await request('GET', url, null).body;
};

function isValidUrl(url) {
  if (
    url.startsWith('http://') || 
    url.startsWith('https://') ||
    url.startsWith('//')) {
    return true;
  }
  return false;
}

module.exports.get = get;
module.exports.getJSON = getJSON;
module.exports.getPathDetails = getPathDetails;
module.exports.getRaw = getRaw;
module.exports.isValidUrl = isValidUrl;
