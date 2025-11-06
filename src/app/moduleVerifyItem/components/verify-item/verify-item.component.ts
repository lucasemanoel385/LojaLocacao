import { ChangeDetectionStrategy, Component, OnDestroy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { VerifyItemByDate } from '../../interface/verifyItemByDate.interface';
import { CheckItemService } from '../../service/check-item.service';
import { ListTableLayoutComponent } from '../../../componentsTemplate/list-table-layout/list-table-layout.component';
import { PagiantorList } from '../../../componentsTemplate/paginator/paginator-list/paginator-list.component';
import { CurrencyPipe } from '@angular/common';
import { FormatDatePipe } from '../../../moduleClient/components/pipes/format-date.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verify-item',
  standalone: true,
  imports: [ReactiveFormsModule, ListTableLayoutComponent, PagiantorList, CurrencyPipe, FormatDatePipe, RouterLink],
  templateUrl: './verify-item.component.html',
  styleUrl: './verify-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyItemComponent implements OnDestroy {

  #serviceCheckItem = inject(CheckItemService);

  public getVerifySuccess = this.#serviceCheckItem.getVerify;
  public getVerifyError = this.#serviceCheckItem.getVerifyError;

  public getListItems$ = this.#serviceCheckItem.getItemList;
  public getListItemPage$ = this.#serviceCheckItem.getItemListPage;

  loading = signal(true);

  #fb = inject(FormBuilder);

  public verifyItem = this.#fb.group({
    search: [''],
    dateStart: [''],
    dateFinal: ['']
  })

  searchItem() {
    this.loading.set(false);
    this.#serviceCheckItem.httpGetItemsIfAvailable$(0, this.verifyItem.value).subscribe(res => this.loading.set(true));
  }

  submitCheckItem() {
    this.getVerifyError.set(null);
    this.getVerifySuccess.set(null);
    this.#serviceCheckItem.httpCheckItem$(
      this.verifyItem.value as VerifyItemByDate).subscribe();
  }

  numberPage = signal(0);
  
  handlePageEvent(pageNumber: number) {
    this.numberPage.set(pageNumber);
    this.#serviceCheckItem.httpGetItemsIfAvailable$(pageNumber, this.verifyItem.value).subscribe();
  }

  ngOnDestroy(): void {
    this.getVerifyError.set(null);
    this.getVerifySuccess.set(null);
    this.getListItems$.set(null);
  }
}
