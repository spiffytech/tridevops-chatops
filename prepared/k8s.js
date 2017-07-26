const exec = require('child-process-promise').exec;

function getResultLines(stdout) {
  return stdout.
  trim().
  split('\n').
  slice(1);
}

function getLineParts(line) {
  return line.split(/ +/);
}

module.exports.listServices = async function listServices() {
  const result = await exec('kubectl get services');
  const serviceLines = getResultLines(result.stdout);

  const services =
    serviceLines.map((service) => {
      const lineParts = getLineParts(service);
      const serviceName = lineParts[0];
      const endpointIP = lineParts[2];
      const endpointPort = lineParts[3].split(':')[0];
      return [
        serviceName,
        {
          endpoint: `http://${endpointIP}:${endpointPort}`
        }
      ];
    }).
    filter((service) => service[0] !== 'kubernetes');

  return new Map(services);
}

module.exports.getScale = async function getScale(serviceName) {
  const result = await exec(`kubectl get deployment ${serviceName}`);
  const scaleLine = getResultLines(result.stdout)[0];
  const lineParts = getLineParts(scaleLine);

  return {
    desired: lineParts[1],
    current: lineParts[2],
    available: lineParts[4],
  }
}

if (require.main === module) {
  module.exports.getScale('tridevops-demo').then(console.log);
}

module.exports.deployImage = function deployImage(serviceName, container, image) {
  return exec(`kubectl set image deployment/${serviceName} ${container}=${image}`)
}
