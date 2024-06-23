import { ChangeDetectionStrategy, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewChildren, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';
import { catchError, concatMap, pipe, throwError } from 'rxjs';
import { ListTableLayoutComponent } from '../../../componentsTemplate/list-table-layout/list-table-layout.component';
import { ProductService } from '../../service/product.service';

import { HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule, RouterLink, ListTableLayoutComponent],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit{
 
 
  #apiServiceItem = inject(ProductService);

  //o $ é uma convenção pra dizer que ele é um observable
  public getListItems$ = this.#apiServiceItem.getItemList;
  getListItemPage = this.#apiServiceItem.getItemListPage;
  
  numberPage = 0;

  paging(): number[] {
    let numeros: number[] = [];
    numeros = Array.from({ length: this.#apiServiceItem.getItemListPage }, (_, index) => index + 1);
    return numeros;
  }

  /*deleteItem(table: HTMLTableElement, tr: HTMLTableRowElement, id: number) {
    table.deleteRow(tr.rowIndex)
    //service.delete()
    return this.#apiServiceItem.httpDeleteItem$(id).pipe(
      concatMap(() => this.#apiServiceItem.httpGetItems$())).
      subscribe();
  }*/

  ngOnInit(): void {
    this.#apiServiceItem.httpGetItems$(this.numberPage).subscribe();
  }

  pageNumber(pageNumber: number) {
    console.log(this.searchI());
    this.numberPage = pageNumber;
    this.#apiServiceItem.httpGetItems$(this.numberPage, this.searchI()).subscribe();
  
  }

  idProductDelete!: number;
  deleteRowTableList!: number;

  deleteProduct(modalDelete: HTMLDialogElement) {
 
    this.#apiServiceItem.httpDeleteItem$(this.idProductDelete).pipe(
      ).
      subscribe(res => modalDelete.close());
      
      this.getListItems$()?.splice(this.deleteRowTableList,1);
  }

  searchI = signal('');

  searchItem(search: string) {
    this.searchI.set(search);
    this.#apiServiceItem.httpGetItems$(0 ,search).subscribe();
  }

}
