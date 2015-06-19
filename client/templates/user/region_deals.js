Template.regionDeals.helpers({
	deals: function() {
		// console.log('this.region: ', this.region);
		// var deals = Deals.find({
		// 	'$or': [
		// 		{ region: this.region },
		// 		{ region: '' }
		// 	]
		// }).fetch();
		// var deals = Deals.find();
		
		// console.log('deals: ', deals);
		// return deals;

		return Deals.find({region: this.region});
	}
});