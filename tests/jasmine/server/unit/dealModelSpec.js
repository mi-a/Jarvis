//A suite of tests related to the Deals collection.. put related tests into in this block
"use strict";
describe("Deal", function() {

	var deal;

	beforeEach(function() {
		MeteorStubs.install();
		deal = new Deal({
			headline: "Sample Headline",
			company: "Sample Company",
			details: "Sample Details",
			location: {street: '123 Main Street', city: 'San Francisco', state: 'CA', zip: '94101'}
		});
	});

	afterEach(function() {
		MeteorStubs.uninstall();
	});

	it("should be created with headline, company, and details", function() {

		Meteor.call('saveDeal', deal, function (error, response) {
			Session.set('saveDeal', response);
		});

		expect(deal.headline).toBe("Sample Headline");
		expect(deal.company).toBe("Sample Company");
		expect(deal.details).toBe("Sample Details");
	});

	it("should update an existing deal if deal already exists", function() {
		Meteor.call('saveDeal', deal, function (error, response) {
			Session.set('saveDeal', response);
		});

		expect(deal.headline).toBe("Sample Headline");
		deal.headline = "New Headline";

		Meteor.call('saveDeal', deal, function (error, response) {
			Session.set('saveDeal', response);
		});

		expect(deal.headline).toBe("New Headline");
		expect(deal.company).toBe("Sample Company");
	});
});