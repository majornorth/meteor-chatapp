if (Meteor.isServer) {
  Meteor.publish('chatMessages', function() {
    return Messages.find({}, { sort: { time: -1}, limit: 20});
  });

  Meteor.methods({
    'insertChatMessage': function(name, message) {
        Messages.insert({
          name: name,
          message: message,
          time: Date.now(),
        });
    }
  });
}

