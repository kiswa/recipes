require('../node_modules/systemjs/dist/system-polyfills.js');
require('../dist/js/vendor.js');

var chai = require('chai'),
    expect = chai.expect,
    Ingredient = require('../dist/app/models/ingredient.js').Ingredient;

describe('Ingredient Model', function() {
    var ingredient;

    beforeEach(function() {
        ingredient = new Ingredient();
    });

    it('should have an "id" property', function() {
        expect(ingredient).to.have.property('id');
    });

    it('should have a "name" property', function() {
        expect(ingredient).to.have.property('name');
    });

    it('should have an "amount" property', function() {
        expect(ingredient).to.have.property('amount');
    });

    it('should have a "measure" property', function() {
        expect(ingredient).to.have.property('measure');
    });
});
