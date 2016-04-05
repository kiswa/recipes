require('../dist/js/vendor.js');

global.confirm = function() {
    return true;
};

var chai = require('chai'),
    expect = chai.expect,
    apiData = { alerts: [], data: [{}] },
    RecipeDetail = require('../dist/app/recipe-detail/recipe-detail.component.js').RecipeDetail,
    RecipeServiceMock = {
        getRecipe: function() {
            return { subscribe: function(fn) {
                fn(apiData);
            } };
        },
        deleteRecipe: function() {
            return { subscribe: function(fn) {
                fn({ alerts: [] });
            } };
        }
    },
    UtilsServiceMock = {
        getTimeString() { }
    },
    NotificationsServiceMock = { },
    navigated = false,
    RouterMock = {
        navigate: function() {
            navigated = true;
        }
    },
    RouteParamsMock = {
        get: function() { return '1'; }
    };

describe('Recipe Detail Component', function() {
    var recipeDetail;

    beforeEach(function() {
        navigated = false;

        recipeDetail = new RecipeDetail(RecipeServiceMock,
            UtilsServiceMock, NotificationsServiceMock,
            RouterMock, RouteParamsMock);
    });

    it('should call the service in the constructor', function() {
        expect(recipeDetail._recipe).to.equal(apiData.data[0]);
    });

    it('should let the user edit the recipe', function() {
        expect(recipeDetail.editRecipe()).to.equal(false);
        expect(navigated).to.equal(true);
    });

    it('should let the user delete the recipe', function() {
        expect(recipeDetail.deleteRecipe()).to.equal(false);
        expect(navigated).to.equal(true);
    });
});
