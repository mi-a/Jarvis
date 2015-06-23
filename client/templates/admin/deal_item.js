Template.dealItem.created = function() {
  Session.set('dealItemErrors', {});
}

Template.dealItem.helpers({
  errors: function () {
    return Session.get('errors');
  },
  errorMessage: function(field) {
    return Session.get('dealItemErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('dealItemErrors')[field] ? 'has-error' : '';
  }
});

Template.dealItem.events({
	'submit form': function(e) {
		e.preventDefault();
		var $el = $(e.target);

		var currentDealId = this._id;

    var deal = new Deal({
      id: currentDealId,
      headline: $el.find('[name=headline]').val(),
      company: $el.find('[name=company]').val(),
      details: $el.find('[name=details]').val(),
      url: $el.find('[name=url]').val(),
      phone: $el.find('[name=phone]').val(),
      location: {
        street: $el.find('[name=street]').val(),
        city: $el.find('[name=city]').val(),
        state: $el.find('[name=state]').val(),
        zip: $el.find('[name=zip]').val()
      },
      createdAt: parseInt($el.find('[name=createdAt]').val()),
      updatedAt: parseInt($el.find('[name=updatedAt]').val())
    });

    Meteor.call('saveDeal', deal, function(error, result) {
      if (error) {
        Session.set('errors', error.reason);
        console.log("Error: ", error);
      } else {
        Router.go('dealsList', {_id: result._id});
        console.log("Result: ", result);
      }
    });
  },

    'click #removeDeal': function(e) {
      e.preventDefault();
      
      if (confirm("Delete this post?")) {
        var currentDealId = this._id;
        Meteor.call('removeDeal', currentDealId);
        Router.go('dealsList');
      }
    }
    
});