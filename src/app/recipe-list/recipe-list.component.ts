import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { Response } from 'angular2/http';

import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe';
import { UtilsService } from '../services/utils';
import { RecipeSearchService } from '../recipe-search/recipe-search.service';
import { RECIPE_CATEGORIES } from '../recipe-form/recipe-form.component';

@Component({
    selector: 'recipe-list',
    templateUrl: 'app/recipe-list/recipe-list.template.html',
    providers: [ RecipeService, UtilsService ]
})
export class RecipeList {
    private _num = Number;
    private _categories = RECIPE_CATEGORIES;
    private _recipes: Recipe[];

    recipes: Recipe[];
    loaded: boolean = false;

    constructor(private _service: RecipeService,
                private _utils: UtilsService,
                private _search: RecipeSearchService,
                private _router: Router) {
        _service.getRecipes().subscribe(recipes => {
            this._recipes = recipes;
            this._filterChanged('');
            this.loaded = true;
        });

        _search.searchUpdated.subscribe(term => this._filterForSearch(term));
    }

    viewRecipe(id: number): boolean {
        this._router.navigate([ 'RecipeDetail', { id: id } ]);
        return false;
    }

    addRecipe(): boolean {
        this._router.navigate([ 'RecipeAdd' ]);
        return false;
    }

    private _filterChanged(filter: string): void {
        this.recipes = this._recipes.filter(x => {
            return (filter === '' ||
               (filter !== '' && x.category === filter));
        });
    }

    private _filterForSearch(term: string): void {
        term = term.trim().toLowerCase();

        this.recipes = this._recipes.filter(x => {
            function hasIngredient(term) {
                let found = x.ingredients.filter(i =>
                    i.name.toLowerCase().search(term) !== -1);

                return found.length > 0;
            }

            return (term === '' ||
                (term !== '' && (x.name.toLowerCase().search(term) !== -1 ||
                hasIngredient(term))));
        });
    }
}
