/**
* Templates
*/
Meteor.subscribe('chatMessages', function () {
  Session.set("messagesLoaded", true)
});

Session.setDefault("messagesLimit", 20);
Template.messages.helpers({
  messages: function() {
    if (Meteor.user()) {
      var earliest = Messages.findOne({}, { sort: {time: -1}, skip: Session.get("messagesLimit")});
      if (!earliest) {
        earliest = Messages.findOne({}, {sort: {time: 1}});
      }
      return earliest && Messages.find({time: {$gte: earliest.time}}, { sort: { time: 1}});
    }
  },
  currentUserSubmitted: function() {
    var currentUser = Meteor.user();
    var currentUserName = currentUser.profile.name;
    if (currentUserName === this.name)
      return true;
  }
});

Template.input.events = {
  'keydown input#message' : function (event, tmpl) {
    if (event.which == 13) { // 13 is the enter key event
        if (Meteor.user())
          var name = Meteor.user().profile.name;
        else
          var name = 'Anonymous';
        var message = tmpl.find('#message');
        var message = message.value;

      if (message.value != '') {
        Meteor.call('insertChatMessage', name, message);
        tmpl.find('#message').value = '';
      }
    }
  }
}

Template.loadEarlierMessages.events({
  'click #loadMoreButton': function () {
    Session.set("messagesLimit", Session.get("messagesLimit") + 20);
  }
});

Tracker.autorun(function () {
  if (Session.equals("messagesLoaded", true)) {
    $("html, body").animate({ scrollTop: $(document).height() });
  }
});
