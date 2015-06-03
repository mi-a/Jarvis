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
    console.log(e);

    var deal = {
      headline: $(e.target).find('[name=headline]').val(),
      company: $(e.target).find('[name=company]').val(),
      details: $(e.target).find('[name=details]').val(),
      location: {
        street: $(e.target).find('[name=street]').val(),
        city: $(e.target).find('[name=city]').val(),
        state: $(e.target).find('[name=state]').val(),
        zip: $(e.target).find('[name=zip]').val()
      }
    };

    Meteor.call('saveDeal', deal, function(error, result) {
      console.log("Error: ", error);
      console.log("Result: ", result);
      if (error) {
        Session.set('errors', error.reason);
      } else {
        Router.go('dealsList', {_id: result._id});
      }
    });
	}
});