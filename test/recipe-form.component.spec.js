require('../dist/js/vendor.js');

global.FileReader = function() {
    return {
        addEventListener: function(name, fn) {
            fn();
        },
        readAsDataURL: function() { }
    };
};

global.Image = function() {
    return {
        width: 1,
        height: 1,
        addEventListener: function(name, fn) {
            fn();
        }
    };
};

global.window = {
    history: {
        back: function() {
            this.test = true;
        },
        test: false
    }
};

global.document = {
    createElement: function() {
        return {
            getContext: function() {
                return {
                    drawImage: function() { }
                };
            },
            toDataURL: function() {
                return true;
            }
        };
    }
};

var chai = require('chai'),
    expect = chai.expect,
    apiData = { alerts: [], data: [{ imageData: '' }] },
    RecipeForm = require('../dist/app/recipe-form/recipe-form.component.js').RecipeForm,
    RecipeServiceMock = {
        addRecipe: function() {
            return { subscribe: function(fn) {
                fn(apiData);
            } };
        },
        getRecipe: function() {
            return { subscribe: function(fn) {
                fn(apiData);
            } };
        },
        deleteRecipe: function() {
            return { subscribe: function(fn) {
                fn(apiData);
            } };
        },
        updateRecipe: function() {
            return { subscribe: function(fn) {
                fn(apiData);
            } };
        }
    },
    RouterMock = {
        navigate: function() { this.test = true; },
        test: false
    };

describe('Recipe Form Component', function() {
    var recipeForm;

    beforeEach(function() {
        RouterMock.test = false;
        recipeForm = new RecipeForm(RecipeServiceMock, { }, RouterMock);
    });

    it('should add an empty Ingredient to the model', function() {
        expect(recipeForm).to.have.property('addEmptyIngredient');

        expect(recipeForm._model.ingredients.length).to.equal(1);
        recipeForm.addEmptyIngredient();
        expect(recipeForm._model.ingredients.length).to.equal(2);
    });

    it('should remove an Ingredient from the model by index', function() {
        expect(recipeForm).to.have.property('removeIngredient');

        recipeForm.addEmptyIngredient();

        recipeForm.removeIngredient(0);
        expect(recipeForm._model.ingredients.length).to.equal(1);
    });

    it('should submit the Recipe and navigate on single recipe add', function() {
        expect(recipeForm._router.test).to.equal(false);
        recipeForm.onSubmit();
        expect(recipeForm._router.test).to.equal(true);
    });

    it('should submit the Recipe and allow for another to be added', function() {
        expect(recipeForm._router.test).to.equal(false);
        recipeForm.onSubmit(false);
        expect(recipeForm._router.test).to.equal(false);
    });

    it('should allow the form to be cancelled', function() {
       recipeForm.onCancel();

       expect(window.history.test).to.equal(true);
    });

    it('should reset the model on cancel', function() {
        recipeForm._model = true;

        recipeForm.onCancel();

        expect(recipeForm._model).to.have.property('ingredients').
            that.is.an('array');
    });

    it('should have a fileSelected event handler', function() {
        expect(recipeForm).to.have.property('fileSelected').
            that.is.a('function');

        recipeForm.fileSelected({ target: { files: [{ }] } });

        expect(recipeForm._model.imageData).to.equal(true);
        expect(recipeForm.imageLoaded).to.equal(true);
        expect(recipeForm.showPreview).to.equal(true);
    });

    it('should be able to load into edit mode', function() {
        recipeForm = new RecipeForm(RecipeServiceMock, { }, RouterMock,
            { get: function() { return 1; } });

        expect(recipeForm._isEdit).to.equal(true);
    });

    it('should call the service when updating a recipe', function() {
        recipeForm = new RecipeForm(RecipeServiceMock, { }, RouterMock,
            { get: function() { return 1; } });

        recipeForm.onSubmit(false);

        expect(recipeForm._router.test).to.equal(true);
    });

    it('should allow the user to clear the loaded image', function() {
        recipeForm.clearImage();

        expect(recipeForm.showPreview).to.equal(false);
        expect(recipeForm._model.imageData).to.equal('');
    });
});
