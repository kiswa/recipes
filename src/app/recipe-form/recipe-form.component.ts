import { Component, ViewChildren } from 'angular2/core';
import { NgForm } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';

import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import { RecipeService } from '../services/recipe';
import { NotificationsService } from '../notifications/notifications.service';
import { Notification } from '../notifications/notifications.model';

export var RECIPE_CATEGORIES: string[] = [
    'Appetizer',
    'Beverage',
    'Dessert',
    'Dip',
    'Main Dish',
    'Sauce',
    'Side Dish',
    'Soup'
];

@Component({
    selector: 'recipe-form',
    templateUrl: 'app/recipe-form/recipe-form.template.html',
    providers: [ RecipeService ]
})
export class RecipeForm {
    @ViewChildren('name') names;
    private _model: Recipe;
    private _isEdit: boolean;
    private _categories = RECIPE_CATEGORIES;

    imageLoaded: boolean = true;
    showPreview: boolean = false;

    constructor(private _service: RecipeService,
                private _notes: NotificationsService,
                private _router: Router,
                private _routeParams: RouteParams) {
        this._newModel();

        let id = 0;
        try {
            id = Number(_routeParams.get('id'));
        } catch (ex) { }

        if (id) {
            this._isEdit = true;
            this._loadRecipe(id);
        }
    }

    ngAfterViewInit() {
        // Focus the last name input when ingredients are added/removed
        this.names.changes.subscribe((x) => x.last.nativeElement.focus());
    }

    fileSelected(evt: any): void {
        let reader = new FileReader();

        this.imageLoaded = false;
        this.showPreview = false;

        reader.addEventListener('load', () => {
            this._model.imageData = reader.result;
            this._resizeImage();
        }, false);

        reader.readAsDataURL(evt.target.files[0]);
    }

    onSubmit(isSingleAdd: boolean = true): boolean {
        if (this._isEdit) {
            this._service.updateRecipe(this._model).
                subscribe(apiData => {
                    apiData.alerts.forEach(msg => this._notes
                        .add(new Notification(msg.type, msg.text))
                    );

                    this._router.navigate(['RecipeDetail', { id: this._model.id }]);
                });

            return false;
        }

        this._service.addRecipe(this._model).
            subscribe(apiData => {
                apiData.alerts.forEach(msg => this._notes
                    .add(new Notification(msg.type, msg.text))
                );

                let errors = apiData.alerts.filter(a => a.type === 'error');
                if (errors.length) {
                    return false;
                }

                this._newModel();

                if (isSingleAdd) {
                    this._router.navigate(['RecipeList']);
                }
            });

        return false;
    }

    onCancel(): void {
        this._newModel();
        window.history.back();
    }

    addEmptyIngredient(): boolean {
        this._model.ingredients.push(new Ingredient());
        return false;
    }

    removeIngredient(index: string | number): boolean {
        this._model.ingredients.splice(Number(index), 1);
        return false;
    }

    clearImage() {
        this.showPreview = false;
        this._model.imageData = '';
    }

    private _loadRecipe(id: number) {
        this._service.getRecipe(id).
            subscribe(apiData => {
                let errors = apiData.alerts.filter(x => x.type === 'error');

                if (errors.length) {
                    errors.forEach(err => this._notes.add(new Notification(err.type, err.text)));
                    this._router.navigate(['RecipeList']);
                }

                this._model = apiData.data[0];

                if (this._model.imageData.length) {
                    this.imageLoaded = true;
                    this.showPreview = true;
                }
            });
    }

    private _newModel() {
        this._model = new Recipe();
        this.addEmptyIngredient();
    }

    private _resizeImage() {
        if (this._model.imageData === '') {
            this.imageLoaded = true;
            return;
        }

        let image = new Image();
        let MAX_HEIGHT = 250;

        image.addEventListener('load', () => {
            let canvas = document.createElement('canvas');
            let width = image.width;
            let height = image.height;

            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }

            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);

            this._model.imageData = canvas.toDataURL('image/png');

            this.imageLoaded = true;
            this.showPreview = true;
        }, false);

        image.src = this._model.imageData;
    }
}
