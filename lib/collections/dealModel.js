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
  this.createdAt = new Date().valueOf(); // not working?
};

Deals.allow({
	update: function(userId, deal) { return true; },
	remove: function(userId, deal) { return true; },
});

Meteor.methods({

  getAllDeals: function() {
    Deals.find();
  },

  validateDeal: function(deal) {
    function validateZip(zip) {
      var valid = false;
      var zipcode_regex = /^\d{5}$/;
      if (zipcode_regex.test(zip) == true) {
        valid = true;
      }
      return valid;
    }

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

    if (deal.location.street || deal.location.city || deal.location.state || deal.location.zip) {
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
  },

  saveDeal: function(deal) {
    console.log('Saving this object: ', deal);
    var id = deal.id;
    delete deal.id;

    console.log('id: ', id);

    var future = new Future();

    Meteor.call('validateDeal', deal);
    
    Deals.update({ _id: id }, deal, {upsert: true}, function(error, result) {
      if (error) {
        console.log('Error: ', error);
        future.throw(error);
      } else {
        console.log('Result: ', result);
        future.return(result);
      }
    }); //end Deals.insert


    return future.wait();

  } // End save method

});