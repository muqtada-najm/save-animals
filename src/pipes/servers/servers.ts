import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ServersPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'servers',
})
export class ServersPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, args?: any): any {
    if(value != null){
      return value.slice().reverse();
    }
  }
}
