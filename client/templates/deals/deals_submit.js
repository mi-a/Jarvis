Template.dealSubmit.created = function() {
  Session.set('dealSubmitErrors', {});
  // This ensures that the user won't see old error messages left over from a previous visit to this page.
}
Template.dealSubmit.helpers({
  errors: function () {
    return Session.get('errors');
  },
  errorMessage: function(field) {
    return Session.get('dealSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('dealSubmitErrors')[field] ? 'has-error' : '';
  }
  // errorMessage simply returns the message itself, errorClass checks for the presence of a message and returns has-error if such a message exists
});

Template.dealSubmit.events({
	'submit form': function(e) {
		e.preventDefault();
    var $el = $(e.target);

    var deal = {
      headline: $el.find('[name=headline]').val(),
      company: $el.find('[name=company]').val(),
      details: $el.find('[name=details]').val(),
      location: {
        street: $el.find('[name=street]').val(),
        city: $el.find('[name=city]').val(),
        state: $el.find('[name=state]').val(),
        zip: $el.find('[name=zip]').val()
      }
    };

    Meteor.call('saveDeal', deal, function(error, result) {
      if (error) {
        Session.set('errors', error.reason);
        console.log("Error: ", error);
      } else {
        Router.go('dealsList', {_id: result._id});
        console.log("Result: ", result);
      }
    });
    
	}
});