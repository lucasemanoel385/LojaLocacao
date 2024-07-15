import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, signal} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { Pageable } from '../../../moduleItem/interface/Pageable';

@Component({
  selector: 'paginator-list',
  templateUrl: 'paginator-list.component.html',
  styleUrl: 'paginator-list.component.scss',
  standalone: true,
  imports: [],
})
export class PagiantorList implements OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    
    setTimeout(() => {
      this.getRangeLabel(changes['pageable'].currentValue['totalPages'], 
      changes['pageable'].currentValue['totalElements'], changes['pageable'].currentValue['size'], changes['pageable'].currentValue['number']);
    }, 50)

  }

  @Input() pageable!: Pageable | null;
  @Output() nextPageOutPut = new EventEmitter<number>();
  @Output() previousPageOutPut= new EventEmitter<number>();

  checkDisabledPreviousPage() {
    return (this.pageable?.number as number > 0) ? false : true;
  }

  checkDisabledNextPage() {
    return ((this.pageable?.number as number + 1)  === this.pageable?.totalPages) ? true : false;
  }
  
  nextPage() {

    if(!((this.pageable?.number as number + 1) === this.pageable?.totalPages)) {
      this.nextPageOutPut.emit(this.pageable?.number as number + 1);
      this.checkDisabledPreviousPage();
      this.checkDisabledNextPage();
    }
  }

  previousPage() {
    if(this.pageable?.number as number > 0) {
      this.previousPageOutPut.emit(this.pageable?.number as number - 1);
      this.checkDisabledNextPage();
    }
  }

  rangePage = signal<string | null>(null);

  private getRangeLabel(totalPages: number, totalElements: number, size: number, number: number) {
    if(totalPages === 0) {
      this.rangePage.set("Página 1 de 1")
    } else {
      const amountPages = Math.ceil(totalElements / size);
      this.rangePage.set(`Página ${number + 1} de ${amountPages}`);
    }

  }

}

