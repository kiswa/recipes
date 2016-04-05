require('../dist/js/vendor.js');

var chai = require('chai'),
    expect = chai.expect,
    Recipe = require('../dist/app/models/recipe.js').Recipe;

describe('Recipe Model', function() {
    var recipe;

    beforeEach(function() {
        recipe = new Recipe();
    });

    it('should have an "id" property', function() {
        expect(recipe).to.have.property('id').
            that.equals(0);
    });

    it('should have a "name" property', function() {
        expect(recipe).to.have.property('name').
            that.equals('');
    });

    it('should have a "category" property', function() {
        expect(recipe).to.have.property('category').
            that.equals('');
    });

    it('should have a "prepTime" property', function() {
        expect(recipe).to.have.property('prepTime').
            that.equals(0);
    });

    it('should have a "cookTime" property', function() {
        expect(recipe).to.have.property('cookTime').
            that.equals(0);
    });

    it('should have an "ingredients" property', function() {
        expect(recipe).to.have.property('ingredients').
            that.is.an('array');
    });

    it('should have an "imageData" property', function() {
        expect(recipe).to.have.property('imageData').
            that.equals('');
    });

    it('should have a "directions" property', function() {
        expect(recipe).to.have.property('directions').
            that.equals('');
    });

    it('should have a "description" property', function() {
        expect(recipe).to.have.property('description').
            that.equals('');
    });
});
