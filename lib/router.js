Router.configure({
  layoutTemplate: 'app',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', { name: 'home' }); 

// ADMIN ROUTES
Router.route('/admin', { name: 'adminHome' });

Router.route('/admin/deals', { 
  name: 'dealsList',
  waitOn: function() {
    return [ Meteor.subscribe('deals')];
  } 
});

Router.route('admin/deals/create', { name: 'dealSubmit' });

Router.route('/admin/deals/:_id', { 
  name: 'dealItem',
  waitOn: function() {
    return [ Meteor.subscribe('singleDeal', this.params._id)];
  },
  data: function() { return Deals.findOne(this.params._id); }
});

// END USER ROUTES
Router.route('/deals', {
  name: 'allDeals',
  waitOn: function() {
    return [ Meteor.subscribe('deals') ];
  }
});

Router.route('/deals/:_id', { 
  name: 'oneDeal',
  waitOn: function() {
    return [ Meteor.subscribe('singleDeal', this.params._id)];
  },
  data: function() { return Deals.findOne(this.params._id); }
});

//REMOVED REGION-SPECIFIC ROUTES
// Router.route('/:region/deals', {
//   name: 'regionDeals',
//   waitOn: function() {
//     return [Meteor.subscribe('regionDeals', [this.params.region, 'all'])];
//   },
//   data: function() { return this.params.region; }
// });