import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform {

  transform(value: String): String {

    let formated = value + '';

    formated = formated
    .replace(/[^0-9]/, '')
    .replace(
      /(\d{2})(\d{1})(\d{4})(\d{4})/,
    '($1) $2 $3-$4');
    
    return formated;
  }

}
