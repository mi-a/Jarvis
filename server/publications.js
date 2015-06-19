Meteor.publish('deals', function(){
	return Deals.find();
});

Meteor.publish('singleDeal', function(id) {
	return Deals.find(id);
});

Meteor.publish('regionDeal', function(region) {
	return Deals.find({
		region: region
	});
})