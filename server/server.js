Meteor.publish('chatMessages', function() {
  return Messages.find({}, { sort: { time: -1}, limit: 1000});
});

Meteor.publish('userPics', function () {
  return Meteor.users.find({}, {fields: {'profile.picture': 1}});
});

Meteor.methods({
  'insertChatMessage': function(name, message) {
    if (! this.userId) return;
    Messages.insert({
      name: name,
      message: message,
      time: Date.now(),
      submittedBy: this.userId
    });
  }
});

var getFbPicture = function(accessToken) { // make async call to grab the picture from facebook
  var result;
  result = Meteor.http.get("https://graph.facebook.com/me", {
    params: {
      access_token: accessToken,
      fields: 'picture'
    }
  });
  if(result.error) {
    throw result.error;
  }
  return result.data.picture.data.url; // return the picture's url
};

Accounts.onCreateUser(function(options, user) {
  if (!options.profile) {
    user.profile = {name: 'Anonymous'};
  } else {
    options.profile.picture = getFbPicture(user.services.facebook.accessToken);
    user.profile = options.profile; // We still want the default 'profile' behavior.
  }

  return user;
});
