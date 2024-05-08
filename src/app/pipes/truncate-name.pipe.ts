import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
  standalone: true
})
export class TruncateNamePipe implements PipeTransform {

  transform(value: string, maxSize: number, elipsis: string = '...'): string {
    if(value.length > maxSize) {
      return value.slice(0, maxSize) + elipsis;
    }
    return value;
  }

}
