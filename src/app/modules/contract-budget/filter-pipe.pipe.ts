import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../../moduleItem/interface/Item';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class FilterPipePipe implements PipeTransform {

  transform(lista: Item[] | null, filtro: string) {

    
    if(filtro) {
      filtro = filtro.toUpperCase();
      let listItem;
      if(lista) {
        const item: Item[] = lista.filter(a => a.name.toUpperCase().indexOf(filtro) >= 2);
        listItem = item;
      }
      return listItem as Item[];
    } else {
      return lista;
    }
  }
} 

/*    transform(lista: string[], filtro: string) {
      console.log('FiltroPipe');
    filtro = filtro.toLowerCase();
    return lista.filter((a) => a.toLowerCase().startsWith(filtro));
  }
 */