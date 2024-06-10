import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CategoryListComponent } from '../../../../moduleCategory/components/category-list/category-list.component';
import { DefaultLayoutComponent } from '../../../../componentsTemplate/default-layout/default-layout.component';

@Component({
  selector: 'app-category-list-page',
  standalone: true,
  imports: [CategoryListComponent, DefaultLayoutComponent],
  templateUrl: './category-list-page.component.html',
  styleUrl: './category-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListPageComponent {

}
