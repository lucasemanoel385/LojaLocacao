import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-back-history-button',
  standalone: true,
  imports: [],
  templateUrl: './back-history-button.component.html',
  styleUrl: './back-history-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackHistoryButtonComponent {

  public backRouter() {
    //this.#router.navigate(['/category']);
    window.history.back();
  }

}
