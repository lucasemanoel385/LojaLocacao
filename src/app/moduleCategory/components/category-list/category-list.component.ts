import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { ListTableLayoutComponent } from '../../../componentsTemplate/list-table-layout/list-table-layout.component';
import { CategoryItemService } from '../../service/categoryItem.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, ListTableLayoutComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit {
  ngOnInit(): void {
    
    this.#serviceCategory.httpGetListCategory().subscribe();
  }

  #serviceCategory = inject(CategoryItemService);

  public getListCategory = this.#serviceCategory.getListCategory;
  public getDeleteMsgError = this.#serviceCategory.getDeleteCategoryError;

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

  searchCategory(search: string) {

    this.#serviceCategory.httpGetListCategory(search).subscribe();

  }

}
