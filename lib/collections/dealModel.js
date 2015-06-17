Deals = new Meteor.Collection('deals');
if (Meteor.isServer) {
  Future = Npm.require('fibers/future');
}

Deal = function(options) {
  options = options || {};
  if (typeof options.id !== 'undefined') {
    this.id = options.id;
  }
  this.headline = options.headline;
  this.company = options.company;
  this.details = options.details;
  this.location = options.location;
  this.phone = options.phone || "";
  this.url = options.url || "";
  this.createdAt = options.createdAt || Date.now();
  this.updatedAt = options.updatedAt || Date.now();
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

    console.log("validate deal: ", deal);

    function validateZip(zip) {
      var valid = false;
      var zipcode_regex = /^\d{5}$/;
      if (zipcode_regex.test(zip) == true) {
        valid = true;
      }
      return valid;
    }

    function validatePhone(phone) {
      var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([A-Za-z0-9]{3})[-. ]?([A-Za-z0-9]{4})$/;
      if (phoneRegex.test(phone)) {
          var formattedNum =
          phone.replace(phoneRegex, "($1) $2-$3");
          valid = true;
      }
      return valid;
    }

    var errors = [];

    check(deal, {
        company: String,
        headline: String,
        details: String,
        location: Object,
        phone: String,
        url: String,
        createdAt: Number,
        updatedAt: Number
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

    if (deal.phone) {
      if (validatePhone(deal.phone) == false) {
        errors.push("Please fill in a valid phone number");
      }
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

    if (typeof id !== 'undefined') {
      deal.updatedAt = Date.now();
    }
    
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