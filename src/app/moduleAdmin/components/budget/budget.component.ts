import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DataCompanyService } from '../service/data-company.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetComponent implements OnInit {
  ngOnInit(): void {
    this.#apiCompanyService.httpGetDataCompany$().subscribe();
  }

  #apiCompanyService = inject(DataCompanyService);

  public getCompany = this.#apiCompanyService.getCompany;
  public msgSuccess = this.#apiCompanyService.getMsgSuccess;
  public msgError = this.#apiCompanyService.getMsgError;

  saveObservation(observation: string) {

    this.#apiCompanyService.httpSaveObservationCompany$(observation).pipe(
      concatMap(() => this.#apiCompanyService.httpGetDataCompany$())
    ).subscribe();

    setTimeout(() => {
      this.msgSuccess.set(null);
      this.msgError.set(null);
    }, 2000)

  }

}
