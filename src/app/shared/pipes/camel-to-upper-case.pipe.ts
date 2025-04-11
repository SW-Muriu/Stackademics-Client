import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelToUpperCase',
  standalone: true,
})
export class CamelToUpperCasePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (!value) return '';
    return value.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
  }
}
