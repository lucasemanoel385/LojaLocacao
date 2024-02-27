import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class FilterPipePipe implements PipeTransform {

  transform(lista: string[], filtro: string) {

    if(filtro) {
      filtro = filtro.toUpperCase();
      return lista.filter(a => a.toUpperCase().indexOf(filtro) >= 0);
    } else {
      return filtro;
    }
  }
} 

/*    transform(lista: string[], filtro: string) {
      console.log('FiltroPipe');
    filtro = filtro.toLowerCase();
    return lista.filter((a) => a.toLowerCase().startsWith(filtro));
  }
 */