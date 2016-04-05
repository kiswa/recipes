require('../dist/js/vendor.js');

var chai = require('chai'),
    expect = chai.expect,
    RecipeService = require('../dist/app/services/recipe').RecipeService,
    BackendMock = function() {
        return {
            map: function() {
                return {
                    subscribe: function(fn) { fn(true); }
                };
            }
        };
    },
    HttpMock = {
        get: BackendMock,
        post: BackendMock,
        delete: BackendMock
    };

describe('Recipe Service', function() {
    var service;

    beforeEach(function() {
        service = new RecipeService(HttpMock);
    });

    it('should allow a recipe to be added', function() {
        var tested = false;

        service.addRecipe().subscribe(x => tested = x);

        expect(tested).to.equal(true);
    });

    it('should allow a recipe to be deleted', function() {
        var tested = false;

        service.deleteRecipe().subscribe(x => tested = x);

        expect(tested).to.equal(true);
    });

    it('should get all recipes', function() {
        var tested = false;

        service.getRecipes().subscribe(x => tested = x);

        expect(tested).to.equal(true);
    });

    it('should get a single recipe', function() {
        var tested = false;

        service.getRecipe(1).subscribe(x => tested = x);

        expect(tested).to.equal(true);
    });
});
