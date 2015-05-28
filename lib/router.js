Router.configure({
  layoutTemplate: 'home',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

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