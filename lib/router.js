Router.configure({
  layoutTemplate: 'app',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.map(function(){
    this.route('home', {
      path: '/'
    });
});

Router.map(function(){
    this.route('adminHome', {
      path: '/admin'
    });
});

// Viewing all deals
Router.map(function(){
    this.route('dealsList', {
      path: '/admin/deals'
    });
});

Router.map(function(){
    this.route('dealSubmit', {
      path: 'admin/deals/create'
    });
});


// Edit singular deal
// Router.map(function(){
//     this.route('dealEdit', {
//       path: '/admin/deals/:_id/edit'
//     });
// });

// View singular deal
// Router.map(function(){
//     this.route('dealView', {
//       path: '/admin/deals/:_id'
//     });
// });



