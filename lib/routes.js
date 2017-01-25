FlowRouter.route( '/all', {
  action: function() {
    BlazeLayout.render( 'masterList' );
  },
  name: 'masterList'
});

FlowRouter.route( '/add-location', {
  action: function() {
    BlazeLayout.render( 'addLocation' );
  },
  name: 'termsOfService'
});