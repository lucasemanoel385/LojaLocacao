import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-table-layout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-table-layout.component.html',
  styleUrl: './list-table-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListTableLayoutComponent {

  @Input() routeLink!: string;

  @Input() nameCreate!: string;
  
  @Input() placeHolder!: string;

  @Output() public outputSearch = new EventEmitter<string>();

  public emitSearch(search: string): any {
    
    this.outputSearch.emit(search);
  }

}
