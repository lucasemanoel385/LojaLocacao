import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../../../componentsTemplate/default-layout/default-layout.component';
import { CreateCategoryComponent } from '../../../../moduleCategory/components/create-category/create-category.component';

@Component({
  selector: 'app-category-create-page',
  standalone: true,
  imports: [DefaultLayoutComponent, CreateCategoryComponent],
  templateUrl: './category-create-page.component.html',
  styleUrl: './category-create-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCreatePageComponent {


}
