const fetch = require('node-fetch');

module.exports.getServiceVersion = async function getServiceVersion(endpoint) {
  return await (await fetch(`${endpoint}/version.txt`)).text();
}
