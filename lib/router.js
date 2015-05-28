Router.configure({
  layoutTemplate: 'home',
  loadingTemplate: 'loading'
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