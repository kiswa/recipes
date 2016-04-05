require('../dist/js/vendor.js');

var chai = require('chai'),
    expect = chai.expect,
    UtilsService = require('../dist/app/services/utils').UtilsService;

describe('Utils Service', function() {
    var service;

    beforeEach(function() {
        service = new UtilsService();
    });

    it('should convert a number to a time string', function() {
        expect(service.getTimeString(30)).to.equal('30 mins');
        expect(service.getTimeString(60)).to.equal('1 hour');
        expect(service.getTimeString(90)).to.equal('1.5 hours');
    });
});
