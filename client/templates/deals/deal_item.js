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

		var deal = {
      id: currentDealId,
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
    console.log("Saving deal now. Current Deal ID: " + deal.id);

    Deals.update(currentDealId, {$set: deal}, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go('dealsList');
      }
    });

	}
});