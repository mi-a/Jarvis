Router.configure({
  layoutTemplate: 'app',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', { name: 'home' });

Router.route('/admin', { name: 'adminHome' });

Router.route('/admin/deals', { 
  name: 'dealsList',
  waitOn: function() {
    return [ Meteor.subscribe('deals')];
  } 
});

Router.route('admin/deals/create', { name: 'dealSubmit' });

// view a single deal
Router.route('/admin/deals/:_id', { 
  name: 'dealItem',
  waitOn: function() {
    return [ Meteor.subscribe('singleDeal', this.params._id)];
  }
});

Router.route('/admin/deals/:_id/edit', { name: 'dealEdit' });

// CONTROLLERS

// DealsListController = RouteController.extend({
//   template: 'dealsList',
//   increment: 10, // we can obvs change how many we want to show
//   dealsLimit: function() {
//     return parseIt(this.params.dealsLimit) || this.increment;
//   },
//   findOptions: function() {
//     return {sort: this.sort, limit: this.dealsLimit}
//   },
//   subscriptions: function() {
//     this.dealsSub = Meteor.subscribe('deals', this.findOptions());
//   },
//   deals: function() {
//     return Deals.find({}, this.findOptions());
//   },
//   data: function() {
//     // setup for pagination 
//     var hasMore = this.deals().count() === this.dealsLimit();
//     var showMore = this.route.path({dealsLimit: this.dealsLimit() + this.increment});
//     return {
//       deals: this.deals(),
//       showMore: hasMore ? this.showMore() : null
//     };
//   }
// });


// // SORT BY NEWEST DEAL
// NewDealsController = DealsListController.extend({
//   sort: {createdAt: -1, _id: -1},
//   showMore: function() {
//     return Router.routes.newDeals.path({dealsLimit: this.dealsLimit() + this.increment})
//   }
// });

// sort deals by Name
