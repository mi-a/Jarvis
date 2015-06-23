Meteor.publish('deals', function(){
	return Deals.find();
});

Meteor.publish('singleDeal', function(id) {
	return Deals.find(id);
});

Meteor.publish('regionDeals', function(regions) {
	return Deals.find({
		region: {$in: regions}
	});
})