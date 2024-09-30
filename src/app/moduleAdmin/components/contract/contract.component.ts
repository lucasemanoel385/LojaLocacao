import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DataCompanyService } from '../service/data-company.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractComponent implements OnInit {
  ngOnInit(): void {
    this.#apiCompanyService.httpGetDataCompany$().subscribe();
  }

  #apiCompanyService = inject(DataCompanyService)

  public getCompany = this.#apiCompanyService.getCompany;
  public msgSuccess = this.#apiCompanyService.getMsgSuccess;
  public msgError = this.#apiCompanyService.getMsgError;

  saveClauses(clauses: string) {

    this.#apiCompanyService.httpSaveClausesCompany$(clauses).pipe(
      concatMap(() => this.#apiCompanyService.httpGetDataCompany$())
    ).subscribe();

    setTimeout(() => {
      this.msgSuccess.set(null);
      this.msgError.set(null);
    }, 2000)

  }

}
