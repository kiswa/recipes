import { Injectable } from 'angular2/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeSearchService {
        private _updates = new Subject<string>();

        public searchUpdated = this._updates.asObservable();

        public search(term: string): void {
            this._updates.next(term);
        }
}
