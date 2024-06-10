import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../../../componentsTemplate/default-layout/default-layout.component';
import { LayoutDashboardComponent } from '../../../../moduleDashboard/components/layout-dashboard/layout-dashboard.component';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [DefaultLayoutComponent, LayoutDashboardComponent],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDashboardComponent {

}
