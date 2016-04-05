require('../dist/js/vendor.js');

var chai = require('chai'),
    expect = chai.expect,
    recipes = [
        { name: 'test', ingredients: [{ name: 'test' }] },
        { name: 'other', ingredients: [{ name: '' }] }
    ],
    RecipeList = require('../dist/app/recipe-list/recipe-list.component.js').RecipeList,
    RecipeService = require('../dist/app/services/recipe.js').RecipeService,
    RecipeSearchService = require('../dist/app/recipe-search/recipe-search.service.js').RecipeSearchService,
    RouterMock = {
        navigate: function() { this.test = true; },
        test: false
    },
    HttpMock = {
        get: function(){
            return {
                map: function() {
                    return {
                        subscribe: function(fn) {
                            fn(recipes);
                        }
                    };
                }
            };
        }
    };

describe('Recipe List Component', function() {
    var recipeList;

    beforeEach(function() {
        RouterMock.test = false;
        recipeList = new RecipeList(new RecipeService(HttpMock),
            { }, new RecipeSearchService(), RouterMock);
    });

    it('should call the service in the constructor', function() {
        expect(recipeList.recipes).to.be.an('array');
        expect(recipeList.recipes.length).to.equal(2);
        expect(recipeList.loaded).to.equal(true);
    });

    it('should allow the user to view a recipe', function() {
        var retVal = recipeList.viewRecipe(0);

        expect(retVal).to.equal(false);
        expect(recipeList._router.test).to.equal(true);
    });

    it('should allow the user to add a recipe', function() {
        var retVal = recipeList.addRecipe();

        expect(retVal).to.equal(false);
        expect(recipeList._router.test).to.equal(true);
    });

    it('should filter recipes by search term', function() {
        recipeList._filterForSearch('test');

        expect(recipeList.recipes.length).to.equal(1);
    });
});
