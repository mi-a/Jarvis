Meteor.publish('deals', function(){
	return Deals.find();
});

Meteor.publish('singleDeal', function(id) {
	check(id, String);
	return Deals.find(id);
});