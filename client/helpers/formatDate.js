Template.registerHelper('formatDate', function(date) {
  // return moment(date).format('MM-DD-YYYY');
  return new Date(date).toString('MM-DD-YYYY');
});
