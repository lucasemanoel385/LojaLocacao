import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-back-history',
  standalone: true,
  imports: [],
  templateUrl: './back-history.component.html',
  styleUrl: './back-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackHistoryComponent {


  public backRouter() {
    //this.#router.navigate(['/category']);
    window.history.back();
  }
  
}
