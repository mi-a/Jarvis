//A suite of tests related to the Deals collection.. put related tests into in this block
"use strict";
describe("Deal", function() {
	it("should be created with headline, company, and details", function() {
		spyOn(Deals, "insert").and.callFake(function(doc, callback) {
			// Simulate async return of id = "1"
			callback(null, "1");
		});

		var deal = new Deal(null, "Sample Headline", "Sample Company", "Sample Details", {street: '123 Main Street', city: 'San Francisco', state: 'CA', zip: '94101'});

		expect(deal.headline).toBe("Sample Headline");
		expect(deal.company).toBe("Sample Company");
		expect(deal.details).toBe("Sample Details");

		deal.save();

		expect(deal._id).toEqual("1");
		expect(Deals.insert).toHaveBeenCalledWith( {
			headline: "Sample Headline",
			company: "Sample Company",
			details: "Sample Details"
		},
			jasmine.any(Function)
		);
	});
});