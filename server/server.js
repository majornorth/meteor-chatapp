if (Meteor.isServer) {
  Meteor.publish('chatMessages', function() {
    return Messages.find();
  });
}

