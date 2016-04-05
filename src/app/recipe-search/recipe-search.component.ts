import { Component } from 'angular2/core';
import { Control } from 'angular2/common';

import { RecipeSearchService } from './recipe-search.service';

@Component({
    selector: 'recipe-search',
    template: `
    <div class="recipe-search">
        <input type="search" placeholder="Search Recipes..."
            [ngFormControl]="term">
    </div>
    `
})
export class RecipeSearch {
    term = new Control();

    constructor(private _service: RecipeSearchService) {
        this.term.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe(term => _service.search(term + ''));
    }
}
