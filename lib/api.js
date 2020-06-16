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

async function getRaw(url) {
  console.log('api.getRaw', url);
  return await request('GET', url, null).body;
};

module.exports.get = get;
module.exports.getJSON = getJSON;
module.exports.getRaw = getRaw;
