const Conversation = require('hubot-conversation');

const k8s = require('../lib/k8s');
const libApp = require('../lib/app');

module.exports = function main(robot) {
  const switchboard = new Conversation(robot);

  robot.respond(/get services/, async (res) => {
    const services = await k8s.listServices();
    Array.from(services.keys()).forEach((serviceName) => {
      res.reply(serviceName);
    });
  });

  robot.respond(/get service scale (.*)/, async (res) => {
    const serviceName = res.match[1];
    try {
      const {desired, current, available} = await k8s.getScale(serviceName);
      res.reply(`${serviceName} scale: ${desired}/${current}/${available}`);
    } catch(ex) {
      return res.reply(`Could not find service ${serviceName}`);
    }
  });

  robot.respond(/get service version (.*)/, async (res) => {
    const serviceName = res.match[1];
    const services = await k8s.listServices();
    const service = services.get(serviceName);
    if (!service) {
      return res.reply(`Could not find service ${serviceName}`);
    }

    const version = await libApp.getServiceVersion(service.endpoint);
    res.reply(`${serviceName} is at version ${version}`);
  });

  robot.respond(/deploy service/, (res) => {
    const dialog = switchboard.startDialog(res);

    res.reply('What is the service name?');
    dialog.addChoice(/(.*)/, (serviceRes) => {
      const serviceName = serviceRes.match[1];

      res.reply("What's the container name?");
      dialog.addChoice(/(.*)/, (containerRes) => {
        const container = containerRes.match[1];

        res.reply("What's the new image name?");
        dialog.addChoice(/(.*)/, async (imageRes) => {
          const image = imageRes.match[1];

          res.reply(`Going to update service ${serviceName} container ${container} with ${image}`);

          await k8s.deployImage(serviceName, container, image);

          res.reply('Deployed!');
        });
      });
    });
  });

  robot.router.get('/webhook', (request, response) => {
    const room = request.query.room;
    const echoValue = request.query.echo;
    robot.messageRoom(room, echoValue);

    response.send(null);
  });

  /*
  setInterval(() => {
    robot.messageRoom('general', new Date().toString());
  }, 1000);
  */

  console.log(robot.brain)
}
