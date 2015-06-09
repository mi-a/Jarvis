Deals = new Mongo.Collection('deals');
if (Meteor.isServer) {
  Future = Npm.require('fibers/future');
}

Deal = function(id, headline, company, details, location, createdAt) {
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
  this.createdAt = new Date().valueOf(); // bug
};

Deals.allow({
	update: function(userId, deal) { return ownsDocument(userId, deal); },
	remove: function(userId, deal) { return ownsDocument(userId, deal); },
});

Deals.deny({
  insert: function(userId, deal) {
    deal.createdAt = new Date().valueOf(); // bug
    return false;
  },
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

  getAllDeals: function() {
    Deals.find();
  },

  validateZip: function(zip) {
    var valid = false;
    var zipcode_regex = /^\d{5}$/;
    if (zipcode_regex.test(zip) == true) {
      valid = true;
    }
    return valid;
  },

  saveDeal: function(deal) {
    var future = new Future();
    
    // Validate data first
    function validateZip(zip) {
      var valid = false;
      var regex = /^\d{5}$/;
      if (regex.test(zip) == true) {
        valid = true;
      }
      return valid;
    }

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
        if (validateZip(deal.location.zip) == false) {
          errors.push("Please fill in a valid ZIP code");
        }
      }
      if (errors.length > 0) {
        throw new Meteor.Error('invalid-deal', errors);
      }
    } // end validateDeal

    
    // After validateDeal, insert deal into collection
    validateDeal();
    Deals.insert(deal, function(error, result) {
      if (error) {
        future.throw(error);
      } else {
        future.return(result);
      }
    }); //end Deals.insert
    return future.wait();
  } // End save method

});