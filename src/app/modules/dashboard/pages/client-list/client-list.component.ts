import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../../../componentsTemplate/default-layout/default-layout.component';
import { ListClientComponent } from '../../../../moduleClient/components/list-client/list-client.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [DefaultLayoutComponent, ListClientComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientListComponent {

}
