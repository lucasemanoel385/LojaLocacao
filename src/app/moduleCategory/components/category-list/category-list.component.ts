import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';

import { RouterLink } from '@angular/router';
import { ListTableLayoutComponent } from '../../../componentsTemplate/list-table-layout/list-table-layout.component';
import { CategoryItemService } from '../../service/categoryItem.service';
import { concatMap } from 'rxjs';
import { PagiantorList } from '../../../componentsTemplate/paginator/paginator-list/paginator-list.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, ListTableLayoutComponent, PagiantorList],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit, OnDestroy {


  #serviceCategory = inject(CategoryItemService);

  public getListCategory = this.#serviceCategory.getListCategory;
  public getListCategoryPage = this.#serviceCategory.getListCategoryPage;
  public getDeleteMsgError = this.#serviceCategory.getDeleteCategoryError;

  ngOnInit(): void {
    if(this.getListCategory() === null) {
      this.#serviceCategory.httpGetListCategory().subscribe();
    }
  }

  idCategory!: any;
  indexTableList!: any;

  public deleteCategory(modalDelete: HTMLDialogElement) {
    this.#serviceCategory.httpDeleteCategory(this.idCategory).pipe(
      concatMap(() => this.#serviceCategory.httpGetListCategory())
    ).subscribe(res => modalDelete.close());
    setTimeout(() => {
      this.getDeleteMsgError.set(null);
    }, 5000)
  }

  searchCategory = signal('');

  filterCategory(search: string) {
    this.searchCategory.set(search);
    this.#serviceCategory.httpGetListCategory(search).subscribe();

  }

  numberPage = signal(0);

  handlePageEvent(pageNumber: number) {
    this.numberPage.set(pageNumber);
    this.#serviceCategory.httpGetListCategory(this.searchCategory(), pageNumber).subscribe();
  }

  ngOnDestroy(): void {
    if(this.searchCategory() != '' || this.numberPage() != 0) {
      this.#serviceCategory.httpGetListCategory().subscribe();
    }
  }

  

}
