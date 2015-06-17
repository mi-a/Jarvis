'use strict';

describe('Deal', function() {
    it('should be created', function(done) {
        Router.go('dealSubmit');
        Meteor.setTimeout(function() {
            $('_id').val('AAAAAAAAAAAAAAAAA');
        	$('#headline').val('Free help from Charlie Co.');
            $('#company').val('Charlie Co.');
            $('#details').val('Get professional technical assistance from Charles Dudley of Charlie Co.');
            $('#phone').val('1234567890');
            $('#url').val('www.charlieco.com');
            $('#street').val('123 Charlie Street');
            $('#city').val('Charlie Town');
            $('#state').val('CA');
            $('#zip').val('94101');
            $('#buttonSubmit').click();
            $(window).load(function() {
            	expect(Router.current().route.path()).toBe('/admin/deals');
            	expect($('a.headline').first().text()).toEqual('Free help from Charlie Co.');
                expect($('td.company').first().text()).toEqual('Charlie Co.');
                expect($('td.details').first().text()).toEqual('Get professional technical assistance from Charles Dudley of Charlie Co.');
            });
            done();
        }, 600);
    });

    it('should be updated', function(done) {
        Router.go('dealsList');
        Meteor.setTimeout(function() {
            $('a.headline').first().click();
            $(window).load(function() {
                $('#headline').val('a;lskdjf;lakj;lailk34;lk3j4;lktwerldgfjboaw3u5pqwutp834y5w3rup32984wklrh2');
                $('#buttonSubmit').click();
            });
            $(window).load(function() {
                expect(Router.current().route.path()).toBe('/admin/deals');
                expect($('a.headline').first().text()).toContain('a;lskdjf;lakj;lailk34;lk3j4;lktwerldgfjboaw3u5pqwutp834y5w3rup32984wklrh2');
            });
            done();
        }, 600);
    });

    it('should display deal info when viewing specific deal page', function(done) {
        Router.go('/deals/AAAAAAAAAAAAAAAAA');
        Meteor.setTimeout(function() {
            $(window).load(function() {
                expect($('.headline').text()).toBe('Free help from Charlie Co.');
                expect($('.company').text()).toBe('Charlie Co.');
                expect($('.details').text().toBe('Get professional technical assistance from Charles Dudley of Charlie Co.'));
            });
            done();
        }, 600);
    });
});