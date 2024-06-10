import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-components-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './components-nav.component.html',
  styleUrl: './components-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsNavComponent {

}
