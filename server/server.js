if (Meteor.isServer) {
  Meteor.publish('chatMessages', function() {
    return Messages.find({}, { sort: { time: -1}, limit: 1000});
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

  Accounts.onCreateUser(function(options, user) {
      if (!options.profile) {
        user.profile = {name: 'Anonymous'};
      }
      return user;
    });
}

