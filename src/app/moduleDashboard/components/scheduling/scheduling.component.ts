import { ChangeDetectionStrategy, Component, DoCheck, OnInit, inject, signal } from '@angular/core';
import { DashBoardService } from '../../service/dash-board.service';
import { formatDate } from '@angular/common';
import { concatMap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Scheduling } from '../../interface/scheduling.interface';
import { WebSocketService } from '../../../config/webSocket/webSocket.service';

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
  #webSocketService = inject(WebSocketService);

  public getSchedulingList = this.#serviceDashBoard.getListScheduling;
  public getSchedulingListError = this.#serviceDashBoard.getListSchedulingError;
  public getCreateScheduling = this.#serviceDashBoard.getCreateScheduling;

  public schedulesToday = signal(formatDate(Date.now(), 'yyyy-MM-dd', 'pt-BR'));

  ngOnInit(): void {
      this.schedulesToday()
      this.getSchedulingList() === null ? this.#serviceDashBoard.httpGetScheduling$(this.schedulesToday()).subscribe() : null;
      this.#webSocketService.getScheduling().subscribe((categories: any) => {
       
          if(categories[0] === undefined) {
            this.getSchedulingList.set(categories);
    
          } else if(this.dateScheduleDay === categories[0].dateScheduling) {
            this.getSchedulingList.set(categories);
   
          }
      });
  
    }
   
  dateScheduleDay = this.schedulesToday();

  #fb = inject(FormBuilder);
  public schedulesForm = this.#fb.group({
    name:[''],
    description:[''],
    time: [''],
    dateScheduling: ['']
  })

  public schedulerDay(value: string) {
    this.dateScheduleDay = value;
    this.#serviceDashBoard.httpGetScheduling$(value).subscribe();
  }

  public submitSchedules() {
    
    const dateString = (this.schedulesForm.value.dateScheduling)! as string;
    const time = dateString.split('T');
    this.schedulesForm.get('time')?.setValue(time[1]);
    this.schedulesForm.get('dateScheduling')?.setValue(time[0]);

    this.#serviceDashBoard.httpCreateScheduling$(this.schedulesForm.value as Scheduling).pipe(
      concatMap(() => 
        this.#serviceDashBoard.httpGetScheduling$(this.dateScheduleDay))
    ).subscribe(res => {this.schedulesForm.reset();
    });
  }

    // Get id for delete
    public idScheduler!: number;

  public deleteScheduler(modalDelete: HTMLDialogElement) {

    this.#serviceDashBoard.httpDeleteSchedulingId$(this.idScheduler, this.dateScheduleDay).pipe(
      concatMap(() => 
        this.#serviceDashBoard.httpGetScheduling$(this.dateScheduleDay)))
      .subscribe();
    modalDelete.close();
  }

  public closeDialog(modal: HTMLDialogElement) {
    this.getSchedulingListError.set(null);
    this.getCreateScheduling.set(null);
    this.schedulesForm.reset()
    modal.close();

  }

}
