import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../../../componentsTemplate/default-layout/default-layout.component';
import { TemplateAdminComponent } from '../../../../moduleAdmin/components/template-admin/template-admin.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [DefaultLayoutComponent, TemplateAdminComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPageComponent {

}
