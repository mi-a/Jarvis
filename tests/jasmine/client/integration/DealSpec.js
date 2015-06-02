'use strict';

describe('Deal', function() {
    it('should be created', function(done) {
        Router.go('dealSubmit');
        Meteor.setTimeout(function() {
          expect($('legend').html()).toEqual('Create New Deal');
          done();
        }, 600);
    });
});