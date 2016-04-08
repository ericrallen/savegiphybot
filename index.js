var Botkit = require('botkit');

var token = process.env.SLACK_TOKEN;

var controller = Botkit.slackbot();

var bot = controller.spawn({
  token: token
});

bot.startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }

  controller.setupWebserver(3000, function() {
    console.log('Listening on port 3000');
  });
});

controller.hears(["/gif","*"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
  // do something to respond to message
  // all of the fields available in a normal Slack message object are available
  // https://api.slack.com/events/message
  bot.reply(message,'#savegiphy!');
  bot.reply(message, '/giphy ' + message.text);
});