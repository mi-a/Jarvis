Template.dealsList.helpers({
	deals: function() {
		return Deals.find({}, {sort: {updatedAt: -1} });
	}
});