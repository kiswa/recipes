global.XMLHttpRequest = function() { return {}; };
require('../dist/js/vendor.js');

var chai = require('chai'),
    expect = chai.expect,
    BrPipe = require('../dist/app/pipes/br.js').BrPipe;

describe('BrPipe Custom Pipe', function() {
    var pipe;

    beforeEach(function() {
        pipe = new BrPipe();
    });

    it('should replace escaped newlines with a "<br>" tag', function() {
        var actual = pipe.transform('\\n');

        expect(actual).to.equal('<br>');
    });
});