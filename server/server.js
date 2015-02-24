if (Meteor.isServer) {
  Meteor.publish('chatMessages', function() {
    return Messages.find();
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

