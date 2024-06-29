import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform {

  transform(value: string | undefined): string {

    if (!value) {
      return '';
    }

    let formated = value + '';

    if((value as string).length < 11) {
      formated = formated
      .replace(/[^0-9]/, '')
      .replace(
        /(\d{2})(\d{4})(\d{4})/,
      '($1) $2-$3');
      
      return formated;
    } else {
      formated = formated
      .replace(/[^0-9]/, '')
      .replace(
        /(\d{2})(\d{1})(\d{4})(\d{4})/,
      '($1) $2 $3-$4');
      
      return formated;
    }

  
  }

}
