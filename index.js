var Botkit = require('botkit');

var token = process.env.SLACK_TOKEN;
var port = process.env.PORT;

var controller = Botkit.slackbot();

var bot = controller.spawn({
  token: token
});

/*bot.api.team.info({}, function(err, res) {
  controller.storage.teams.save({id: res.team.id}, function(err) {
      if (err) {
          console.error(err);
      }
  });
});*/

bot.startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }

  controller.setupWebserver(port, function() {
    console.log('Listening on port ' + port);
  });
});

controller.hears(["/gif","*"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
  console.log('#savegiphy');
  // do something to respond to message
  // all of the fields available in a normal Slack message object are available
  // https://api.slack.com/events/message
  bot.replyPublic(message,'#savegiphy!');
  bot.replyPrivate(message, 'You should use:  `/giphy ' + message.text.replace(/\/gif\s/igm, '') + '` instead.');
});