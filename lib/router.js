// Router.configure({
//   layoutTemplate: 'home',
//   loadingTemplate: 'loading',
//   notFoundTemplate: 'notFound'
// });
// need to fix code above ...


Router.map(function(){
    this.route('home', {
      path: '/'
    });
});

// Viewing all deals
// Router.map(function(){
//     this.route('dealsList', {
//       path: '/admin/deals'
//     });
// });

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



