import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpj',
  standalone: true
})
export class CpfCnpjPipe implements PipeTransform {

  transform(value: string | undefined): string {

    if (!value) {
      return '';
    }

    const valueString = value as string;

    if(valueString.length === 14) {
      let valorFormatado = valueString + '';

      valorFormatado = valorFormatado
          //padStart preenche a string com o valor definido no parametro 2 até que atinja o numero especificado no parametro 1
          .padStart(14, '0')                  // item 1
          .slice(0, 14)                      // item 2 slice recorta a parte pelos length da string
          .replace(/[^0-9]/, '')              // item 3 substitui qualquer coisa que não seja um número por nada
          .replace(                           // item 4
              /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
              '$1.$2.$3/$4-$5'
          );
  
      return valorFormatado;
    }

    let valorFormatado = valueString + '';

    valorFormatado = valorFormatado
        .padStart(11, '0')                  // item 1
        .substr(0, 11)                      // item 2
        .replace(/[^0-9]/, '')              // item 3
        .replace(                           // item 4
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
        );

    return valorFormatado;
  }

}
