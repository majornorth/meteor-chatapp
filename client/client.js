/**
* Templates
*/
if (Meteor.isClient){
  Meteor.subscribe('chatMessages');
}

Template.messages.helpers({
  messages: function() {
    if (Meteor.user())
      return Messages.find({}, { sort: { time: -1}});
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

      if (message.value != '') {
        Messages.insert({
          name: name,
          message: message.value,
          time: Date.now(),
        });

        message.value = '';
      }
    }
  }
}
