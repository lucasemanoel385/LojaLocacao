import { AsyncPipe, CommonModule, formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, LOCALE_ID, ViewChild, inject, OnInit, Inject, ɵDEFAULT_LOCALE_ID, signal, OnChanges, SimpleChanges, DoCheck, AfterViewInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashBoardService } from '../../service/dash-board.service';
import { Scheduling } from '../../interface/scheduling.interface';
import { concatMap } from 'rxjs';
import { SchedulingComponent } from '../scheduling/scheduling.component';
import { ContractForMonthComponent } from '../contract-for-month/contract-for-month.component';
import { WebSocketService } from '../../../config/webSocket/webSocket.service';

@Component({
  selector: 'app-layout-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, SchedulingComponent, ContractForMonthComponent],
templateUrl: './layout-dashboard.component.html',
  styleUrl: './layout-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDashboardComponent implements OnInit {

  ngOnInit(): void {
    this.getTaskList() === null ? this.#serviceDashBoard.httpGetTasks$().subscribe() : null;
    this.#serviceDashBoard.httpGetBudgetsForMonth$(formatDate(Date.now(), 'yyyy-MM-dd', 'pt-BR').slice(0,7)).subscribe();

    this.#webSocketService.getTask().subscribe((body: any) => {
      this.getTaskList.set(body);
    });
  }

  // WebSocket
  #webSocketService = inject(WebSocketService);

  // Chamada API
  #serviceDashBoard = inject(DashBoardService);
  public getDataBudgetMonth = this.#serviceDashBoard.getDataBudgetMonth;
  public getTaskList = this.#serviceDashBoard.getListTasks;
  public getTaskListError = this.#serviceDashBoard.getTaskError;
  public getCreateTask = this.#serviceDashBoard.getCreateTask

  // authorization view buttons task
  authorization = localStorage.getItem("role") === "ROLE_ADMIN" ? true : false;

  // Form
  #fb = inject(FormBuilder);
  public tasksForm = this.#fb.group({
    description:[],
  })

  public submitTasks() {
    
    this.#serviceDashBoard.httpCreateTask$(this.tasksForm.value as string).pipe(
      concatMap ( () => 
        this.#serviceDashBoard.httpGetTasks$())
    ).subscribe();
    this.tasksForm.reset();

  }

  // Get idTaks for delete
  public idTask!: number;

  public deleteTask(modalDelete: HTMLDialogElement) {

    this.#serviceDashBoard.httpDeleteTaskId$(this.idTask).pipe(
      concatMap(() => 
        this.#serviceDashBoard.httpGetTasks$()))
      .subscribe();
    modalDelete.close();
  }

  public closeDialog(modal: HTMLDialogElement) {

    this.getTaskListError.set(null);

    modal.close();

  }
}
