import { Pipe, PipeTransform } from '@angular/core';
import { find, result } from 'lodash';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(value: any, args: any[]) {
    if (args[1]) {
      return value.filter(function (el: any) {
        return el[args[0]].toLowerCase().indexOf(args[1].toLowerCase()) > -1;
      });
    }
    return value;
  }

}