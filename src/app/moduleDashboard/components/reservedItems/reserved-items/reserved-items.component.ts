import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DashBoardService } from '../../../service/dash-board.service';
import { RouterLink } from '@angular/router';
import { FormatDatePipe } from '../../../../moduleClient/components/pipes/format-date.pipe';

@Component({
  selector: 'app-reserved-items',
  standalone: true,
  imports: [RouterLink, FormatDatePipe],
  templateUrl: './reserved-items.component.html',
  styleUrl: './reserved-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservedItemsComponent implements OnInit{

  #serviceDashBoard = inject(DashBoardService);
  public listReservedItems = this.#serviceDashBoard.getListReservedWeek;

  ngOnInit(): void {
    this.#serviceDashBoard.httpGetReservedItems$().subscribe();
  }



}
