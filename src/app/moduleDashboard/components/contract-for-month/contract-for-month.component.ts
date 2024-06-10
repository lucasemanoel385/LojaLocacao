
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DashBoardService } from '../../service/dash-board.service';
import { formatDate } from '@angular/common';
import { concatMap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Scheduling } from '../../interface/scheduling.interface';
import { FormatDatePipe } from "../../../moduleClient/components/pipes/format-date.pipe";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-contract-for-month',
    standalone: true,
    templateUrl: './contract-for-month.component.html',
    styleUrl: './contract-for-month.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, FormatDatePipe, RouterLink]
})
export class ContractForMonthComponent implements OnInit {


  #serviceDashBoard = inject(DashBoardService);

  public getContractsMonthList = this.#serviceDashBoard.getListContractMonth;

  public contractsMonth = signal(formatDate(Date.now(), 'yyyy-MM-dd', 'pt-BR'));

  ngOnInit(): void {
    this.contractsMonth.set(this.contractsMonth());
   
    this.#serviceDashBoard.httpGetContractsMonth$(this.contractsMonth().slice(0, 7)).subscribe();
  }

  dateScheduleDay = this.contractsMonth();

  #fb = inject(FormBuilder);

  public schedulesForm = this.#fb.group({
    name:[''],
    description:[''],
    time: [''],
    dateScheduling: ['']
  })


  public contractsMonthChange(value: string) {
    this.dateScheduleDay = value;
    this.#serviceDashBoard.httpGetContractsMonth$(value.slice(0, 7)).subscribe();
  }

}
