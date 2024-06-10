import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DashBoardService } from '../../service/dash-board.service';
import { formatDate } from '@angular/common';
import { concatMap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Scheduling } from '../../interface/scheduling.interface';

@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulingComponent implements OnInit {

  #serviceDashBoard = inject(DashBoardService);

  public getSchedulingList = this.#serviceDashBoard.getListScheduling;
  public getSchedulingListError = this.#serviceDashBoard.getListSchedulingError;
  public getCreateScheduling = this.#serviceDashBoard.getCreateScheduling;

  public schedulesToday = signal(formatDate(Date.now(), 'yyyy-MM-dd', 'pt-BR'));

  ngOnInit(): void {
    this.schedulesToday.set(this.schedulesToday());
    this.#serviceDashBoard.httpGetScheduling$(this.schedulesToday()).subscribe();
  }

  dateScheduleDay = this.schedulesToday();

  #fb = inject(FormBuilder);

  public schedulesForm = this.#fb.group({
    name:[''],
    description:[''],
    time: [''],
    dateScheduling: ['']
  })

  private httpSchedulingCreate(scheduling: Scheduling) {
    
    return this.#serviceDashBoard.httpCreateScheduling$(scheduling).pipe(
      concatMap(() => 
        this.#serviceDashBoard.httpGetScheduling$(this.dateScheduleDay))
    ).subscribe();
  }

  public schedulerDay(value: string) {
    this.dateScheduleDay = value;
    this.#serviceDashBoard.httpGetScheduling$(value).subscribe();
  }

  public idScheduler!: number;

  public deleteScheduler(modalDelete: HTMLDialogElement) {

    this.#serviceDashBoard.httpDeleteSchedulingId$(this.idScheduler).pipe(
      concatMap(() => 
        this.#serviceDashBoard.httpGetScheduling$(this.dateScheduleDay)))
      .subscribe();
    modalDelete.close();
  }

  public submitSchedules(modalSchedules: HTMLDialogElement) {
    
    const dateString = (this.schedulesForm.value.dateScheduling)! as string;
    const time = dateString.split('T');
    this.schedulesForm.get('time')?.setValue(time[1]);
    this.schedulesForm.get('dateScheduling')?.setValue(time[0]);

    this.httpSchedulingCreate(this.schedulesForm.value as Scheduling);

    this.schedulesForm.reset()

  }

  public closeDialog(modal: HTMLDialogElement) {
    this.getSchedulingListError.set(null);
    this.schedulesForm.reset()
    modal.close();

  }

}
