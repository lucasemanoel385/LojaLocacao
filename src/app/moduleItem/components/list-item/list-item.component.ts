import { ChangeDetectionStrategy, Component, ElementRef, OnChanges, OnDestroy, OnInit, Signal, SimpleChanges, ViewChild, ViewChildren, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Subscription, catchError, concatMap, pipe, throwError } from 'rxjs';
import { ListTableLayoutComponent } from '../../../componentsTemplate/list-table-layout/list-table-layout.component';
import { ProductService } from '../../service/product.service';

import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PagiantorList } from '../../../componentsTemplate/paginator/paginator-list/paginator-list.component';
import { ListItem } from '../../interface/ListItem';




@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule, RouterLink, ListTableLayoutComponent, MatPaginatorModule,
    PagiantorList
  ],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: MatPaginatorIntl, useClass: MatPaginatorIntl}],
})
export class ListItemComponent implements OnInit, OnDestroy{


  #apiServiceItem = inject(ProductService);

  //o $ é uma convenção pra dizer que ele é um observable
  public getListItems$ = this.#apiServiceItem.getItemList;
  public getListItemPage$ = this.#apiServiceItem.getItemListPage;
  public getError$ = this.#apiServiceItem.getItemError;

  // paging(): number[] {
  //   let numeros: number[] = [];
  //   numeros = Array.from({ length: this.#apiServiceItem.getItemListPage }, (_, index) => index + 1);
  //   return numeros;
  // }

  /*deleteItem(table: HTMLTableElement, tr: HTMLTableRowElement, id: number) {
    table.deleteRow(tr.rowIndex)
    //service.delete()
    return this.#apiServiceItem.httpDeleteItem$(id).pipe(
      concatMap(() => this.#apiServiceItem.httpGetItems$())).
      subscribe();
  }*/

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    if (this.getListItems$() === null) {
      this.subscriptions.push(
        this.#apiServiceItem.httpGetItems$().subscribe());
    }
  }

  numberPage = signal(0);
  searchI = signal('');

  idProductDelete!: number;
  deleteRowTableList!: number;

  deleteProduct(modalDelete: HTMLDialogElement) {
 
    this.#apiServiceItem.httpDeleteItem$(this.idProductDelete).pipe(
      concatMap(() => this.#apiServiceItem.httpGetItems$(this.numberPage(), this.searchI()))
      ).
      subscribe(res => {this.getError$.set(null); modalDelete.close();});
      
      
  }

  searchItem(search: string) {
    this.searchI.set(search);
    this.#apiServiceItem.httpGetItems$(0 ,search).subscribe();
  }

  handlePageEvent(pageNumber: number) {
    this.numberPage.set(pageNumber);
    this.#apiServiceItem.httpGetItems$(pageNumber, this.searchI()).subscribe();
  }

  ngOnDestroy(): void {

    this.getError$.set(null);

    this.subscriptions.forEach(i => i.unsubscribe());

    if(this.searchI() != '' || this.numberPage() != 0) {
      this.#apiServiceItem.httpGetItems$().subscribe();
    }

  }

}
