Deals = new Mongo.Collection('deals');

Deal = function(id, headline, company, details, location) {
  this._id = id;
  this.headline = headline;
  this.company = company;
  this.details = details;
};

Deal.prototype = {
  save: function() {
    // Validate data first
    
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
  }
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