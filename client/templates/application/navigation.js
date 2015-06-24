Template.navigation.helpers({
	showBackButton: function() {
		return Router.current().route.getName() === 'oneDeal';
	}
});