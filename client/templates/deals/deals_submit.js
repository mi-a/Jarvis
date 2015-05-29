Template.dealSubmit.created = function() {
  Session.set('dealSubmitErrors', {});
  // This ensures that the user won't see old error messages left over from a previous visit to this page.
}
Template.dealSubmit.helpers({
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

		var deal = {
			name: $(e.target).find('[name=company]').val(),
      locationStreet: $(e.target).find('[name=locationStreet]').val(),
      locationOption: $(e.target).find('[name=locationOption]').val(),
      city: $(e.target).find('[name=city]').val(),
      state: $(e.target).find('[name=state]').val(),
      zip: $(e.target).find('[name=zip]').val(),
      headline: $(e.target).find('[name=headline]').val(),
			details: $(e.target).find('[name=details]').val()
		};

    var errors = validateDeal(deal);
    // call validateDeal function from deals.js
    if (errors.name || errors.headline || errors.details)
      return Session.set('dealSubmitErrors', errors);

		Meteor.call('dealInsert', deal, function(error, result) {
		  // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      // show this result but route anyway
      if (result.dealExists)
        throwError('This deal has already been posted');
            
      // Router.go('dealPage', {_id: result._id});  
      // deal page has not been created yet
    });
	}
});