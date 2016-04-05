import { Ingredient } from './ingredient';

export class Recipe {
    constructor(public id: number = 0,
            public name: string = '',
            public category: string = '',
            public prepTime: number = 0,
            public cookTime: number = 0,
            public ingredients: Ingredient[] = [],
            public imageData: string = '',
            public directions: string = '',
            public description: string = '') {
    }
}
