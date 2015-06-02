'use strict';

describe('Deal', function() {
    it('should be created', function(done) {
        Router.go('dealSubmit');
        Meteor.setTimeout(function() {
            $('#company').val('Charlie Co.');
            $('#buttonSubmit').click();
            expect($('legend').html()).toEqual('Create New Deal');
            done();
        }, 600);
    });
});