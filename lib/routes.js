FlowRouter.route( '/all', {
  action: function() {
    BlazeLayout.render( 'masterList' );
  },
  name: 'masterList'
});

FlowRouter.route( '/vote-r1', {
  action: function() {
    BlazeLayout.render( 'voteR1' );
  },
  name: 'voteR1'
});