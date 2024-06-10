import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDatePipe',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any): any {

    let formated = value;

    formated = formatDate(value, 'dd/MM/yyyy', 'pt-BR');

    return formated;
  }

  transformInputDate(value: any): any {

    let formated = value;

    formated = formatDate(value, 'yyyy-MM-dd', 'pt-BR');

    return formated;
  }

}
