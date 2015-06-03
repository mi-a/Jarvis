Template.dealsList.helpers({
	deals: function() {
		return Deals.find({}, {sort: {_id: 1} });
	}
});