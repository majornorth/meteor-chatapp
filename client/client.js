/**
* Templates
*/
if (Meteor.isClient){
  Meteor.subscribe('chatMessages');
}

Template.messages.helpers({
  messages: function() {
    if (Meteor.user())
      return Messages.find({}, { sort: { time: 1}});
  },
  currentUserSubmitted: function() {
    var currentUser = Meteor.user();
    var currentUserName = currentUser.profile.name;
    if (currentUserName === this.name)
      return true;
  }
});

Template.input.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
        if (Meteor.user())
          var name = Meteor.user().profile.name;
        else
          var name = 'Anonymous';
        var message = document.getElementById('message');
        var message = message.value;

      if (message.value != '') {
        Meteor.call('insertChatMessage', name, message);
        document.getElementById('message').value = '';
      }
    }
  }
}
