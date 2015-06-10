Template.dealsList.helpers({
	deals: function() {
		return Deals.find({}, {sort: {createdAt: -1} });
	}
});