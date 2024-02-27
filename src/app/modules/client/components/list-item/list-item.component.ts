import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewChildren, inject, signal } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop'
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit{
 
  #apiServiceItem = inject(ApiService);

  public getListItems$ = this.#apiServiceItem.getItemList;
  public getListItemsError$ = this.#apiServiceItem.getItemListError;
  

  /*deleteItem(table: HTMLTableElement, tr: HTMLTableRowElement, id: number) {
    table.deleteRow(tr.rowIndex)
    //service.delete()
    console.log(table, tr, id);
  }*/

  ngOnInit(): void {
    this.#apiServiceItem.httpGetItems$().subscribe();
  }

}
