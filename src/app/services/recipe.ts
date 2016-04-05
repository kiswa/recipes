import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable()
export class RecipeService {
    constructor(private _http: Http) {
    }

    addRecipe(recipe: Recipe): Observable<any> {
        return this._http.post('api/recipes', JSON.stringify(recipe)).
            map(res => res.json());
    }

    deleteRecipe(id: number): Observable<any> {
        return this._http.delete('api/recipes/' + id).
            map(res => res.json());
    }

    getRecipe(id: number): Observable<any> {
        return this._http.get('api/recipes/' + id).
            map(res => res.json());
    }

    getRecipes(): Observable<any> {
        return this._http.get('api/recipes').
            map(res => res.json().data);
    }

    updateRecipe(recipe: Recipe): Observable<any> {
        return this._http.post('api/recipes/' + recipe.id,
                JSON.stringify(recipe)).
            map(res => res.json());
    }
}
