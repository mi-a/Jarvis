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

Router.map(function(){
    this.route('dealSubmit', {
      path: '/submit'
    });
});