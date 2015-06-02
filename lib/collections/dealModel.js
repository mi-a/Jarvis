Deals = new Mongo.Collection('deals');

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

Deal.prototype = {
  save: function() {
    // Validate data first
    function validateDeal(deal) {
      var errors = {};

      check(deal, {
        company: String,
        headline: String,
        details: String,
        location: Object
      });

      if(!deal.company) {
        errors.company = "Please fill in a company name";
      }
      
      if (!deal.headline) {
        errors.headline =  "Please fill in a headline for your deal";
      }
        
      if (!deal.details) {
        errors.details =  "Please fill in deal details";
      }

      if (location) {
        if (!location.street) {
          errors.location.street = "Please fill in a valid street address";
        }
        if (!location.city) {
          errors.location.city = "Please fill in a valid city";
        }
        if (!location.state) {
          errors.location.state = "Please select a state.";
        }
        if (!location.zip) {
          errors.location.zip = "Please fill in a valid ZIP code";
        }
      }
      if (errors) {
        throw new Meteor.Error('invalid-deal', "You must fill in all fields");
      }
    } // end validateDeal
    
    // Then insert into collection
    var that = this;
    var doc = {
      headline: this.headline,
      company: this.company,
      details: this.details
    };
    Deals.insert(doc, function(error, result) {
      that._id = result;
    });
  } // End save method
};

// Deal.prototype = {
//   save: function() {
//     function validateDeal(deal) {
//       var errors = {};

//       if (!deal.company)
//         errors.company = "Please fill in a company name";
      
//       if (!deal.headline)
//         errors.headline =  "Please fill in a headline for your deal";

//       if (!deal.details)
//         errors.details =  "Please fill in deal details";

//       return errors;
//     }

//     check(this.userId, String);
//     check(dealAttributes, {
//       company: String,
//       headline: String,
//       details: String
//     });
    
//     var errors = validateDeal(dealAttributes);
//     if (errors.company || errors.headline || errors.details) {

//       throw new Meteor.Error('invalid-deal', "You must fill in all fields");
//     }    

//     // DO WE CARE ABOUT SHOWING WHO POSTED THE DEAL?
    
//     var user = Meteor.user();
//     var deal = _.extend(dealAttributes, {
//       userId: user._id, 
//       author: user.username, 
//       submitted: new Date()
//     });
    
//     var dealId = Deals.insert(deal);
    
//     return {
//       _id: dealId
//     }; 
//   }
// } // End Deal.prototype

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

// Meteor.methods({
//   validateDeal: function (deal) {
//     var errors = {};

//     if (!deal.company)
//       errors.company = "Please fill in a company name";
    
//     if (!deal.headline)
//       errors.headline =  "Please fill in a headline for your deal";

//     if (!deal.details)
//       errors.details =  "Please fill in deal details";

//     return errors;
//   }

//   dealInsert: function(dealAttributes) {
//     check(this.userId, String);
//     check(dealAttributes, {
//       company: String,
//       headline: String,
//       details: String
//     });
    
//     var errors = validateDeal(dealAttributes);
//     if (errors.company || errors.headline || errors.details)
//       throw new Meteor.Error('invalid-deal', "You must fill in all fields");
    

//     // DO WE CARE ABOUT SHOWING WHO POSTED THE DEAL?
    
//     var user = Meteor.user();
//     var deal = _.extend(dealAttributes, {
//       userId: user._id, 
//       author: user.username, 
//       submitted: new Date()
//     });
    
//     var dealId = Deals.insert(deal);
    
//     return {
//       _id: dealId
//     };
//   }

// });