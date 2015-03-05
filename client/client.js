/**
* Templates
*/
Meteor.subscribe('chatMessages', function () {
  Session.set("messagesLoaded", true)
});

Meteor.subscribe('userPics');

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
  },
  otherUserPicture: function() {
    return Meteor.users.findOne(this.submittedBy);
  }
});

Template.input.events = {
  'keydown input#message' : function (event, tmpl) {
    if (event.which == 13) { // 13 is the enter key event
        if (Meteor.user()) {
          var name = Meteor.user().profile.name;
          var currentUserId = Meteor.userId();
        } else {
          var name = 'Anonymous';
        }
        var message = tmpl.find('#message');
        var message = message.value;

      if (message.value != '') {
        Meteor.call('insertChatMessage', name, message, currentUserId);
        tmpl.find('#message').value = '';
      }
    }
  }
}

Template.loadEarlierMessages.events({
  'click #loadMoreButton': function() {
    Session.set("messagesLimit", Session.get("messagesLimit") + 20);
  }
});

Template.messages.events({
  'click .other-msg-container': function() {
    console.log(this.name);
  },
  'click .current-user-msg': function() {
    console.log(this);
  }
});

Tracker.autorun(function () {
  if (Session.equals("messagesLoaded", true)) {
    $("html, body").animate({ scrollTop: $(document).height() });
  }
});
