//A suite of tests related to the Deals collection.. put related tests into in this block
"use strict";
describe("Deal", function() {

	var deal;

	beforeEach(function() {
		deal = new Deal(null, "Sample Headline", "Sample Company", "Sample Details", {street: '123 Main Street', city: 'San Francisco', state: 'CA', zip: '94101'});
	});

	it("should be created with headline, company, and details", function() {

		Meteor.call('saveDeal', deal, function (error, response) {
			Session.set('saveDeal', response);
		});

		expect(deal.headline).toBe("Sample Headline");
		expect(deal.company).toBe("Sample Company");
		expect(deal.details).toBe("Sample Details");
	});
});