Deals = new Mongo.Collection('deals');

Deals.allow({
	update: function(userId, deal) { return ownsDocument(userId, deal); },
	remove: function(userId, deal) { return ownsDocument(userId, deal); },
});

Deals.deny({
	update: function(userId, deal, fieldNames) {
	  return (_.without(fieldNames, 'company', 'headline', 'details').length > 0);
	}
});

Deals.deny({
  update: function(userId, deal, fieldNames, modifier) {
    var errors = validateDeal(modifier.$set);
    return errors.company || errors.headline;
  }
});

validateDeal = function (deal) {
  var errors = {};

  if (!deal.company)
    errors.company = "Please fill in a company name";
  
  if (!deal.headline)
    errors.headline =  "Please fill in a headline for your deal";

  if (!deal.details)
    errors.details =  "Please fill in deal details";

  return errors;
}



Meteor.methods({
  dealInsert: function(dealAttributes) {
    check(this.userId, String);
    check(dealAttributes, {
      company: String,
      headline: String,
      details: String
    });
    
    var errors = validateDeal(dealAttributes);
    if (errors.company || errors.headline || errors.details)
      throw new Meteor.Error('invalid-deal', "You must fill in all fields");
    

    // DO WE CARE ABOUT SHOWING WHO POSTED THE DEAL?
    
    var user = Meteor.user();
    var deal = _.extend(dealAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });
    
    var dealId = Deals.insert(deal);
    
    return {
      _id: dealId
    };
  }

});