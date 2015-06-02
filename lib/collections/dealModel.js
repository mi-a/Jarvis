Deals = new Mongo.Collection('deals');
Future = Npm.require('fibers/future');

Deal = function(id, headline, company, details, location) {
  this._id = id;
  this.headline = headline;
  this.company = company;
  this.details = details;
  this.location = {
    street: location.street,
    city: location.city,
    state: location.state,
    zip: location.zip
  };
};

// Deal.prototype = {};

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

Meteor.methods({
  saveDeal: function(deal) {
    var future = new Future();
    // Validate data first
    function validateDeal() {
      var errors = [];

      check(deal, {
        company: String,
        headline: String,
        details: String,
        location: Object
      });

      if(!deal.company) {
        errors.push("Please fill in a company name");
      }
      
      if (!deal.headline) {
        errors.push("Please fill in a headline for your deal");
      }
        
      if (!deal.details) {
        errors.push("Please fill in deal details");
      }

      if (deal.location) {
        if (!deal.location.street) {
          errors.push("Please fill in a valid street address");
        }
        if (!deal.location.city) {
          errors.push("Please fill in a valid city");
        }
        if (!deal.location.state) {
          errors.push("Please select a state.");
        }
        if (!deal.location.zip) {
          errors.push("Please fill in a valid ZIP code");
        }
      }
      if (errors.length > 0) {
        throw new Meteor.Error('invalid-deal', errors);
      }
    } // end validateDeal

    
    // Then insert into collection
    validateDeal();
    Deals.insert(deal, function(error, result) {
      if (error) {
        future.throw(error);
      } else {
        future.return(result);
      }
    });

    return future.wait();
  } // End save method

  // validateDeal: function (deal) {
  //   var errors = {};

  //   if (!deal.company)
  //     errors.company = "Please fill in a company name";
    
  //   if (!deal.headline)
  //     errors.headline =  "Please fill in a headline for your deal";

  //   if (!deal.details)
  //     errors.details =  "Please fill in deal details";

  //   return errors;
  // }

  // dealInsert: function(dealAttributes) {
  //   check(this.userId, String);
  //   check(dealAttributes, {
  //     company: String,
  //     headline: String,
  //     details: String
  //   });
    
  //   var errors = validateDeal(dealAttributes);
  //   if (errors.company || errors.headline || errors.details)
  //     throw new Meteor.Error('invalid-deal', "You must fill in all fields");
    

  //   // DO WE CARE ABOUT SHOWING WHO POSTED THE DEAL?
    
  //   var user = Meteor.user();
  //   var deal = _.extend(dealAttributes, {
  //     userId: user._id, 
  //     author: user.username, 
  //     submitted: new Date()
  //   });
    
  //   var dealId = Deals.insert(deal);
    
  //   return {
  //     _id: dealId
  //   };
  // }

});