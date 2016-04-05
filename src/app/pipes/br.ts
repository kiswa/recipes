import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({ name: 'br' })
export class BrPipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        return value.replace(/\\n/g, '<br>');
    }
}
