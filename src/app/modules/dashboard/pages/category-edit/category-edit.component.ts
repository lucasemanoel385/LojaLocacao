import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DefaultLayoutComponent } from '../../../../componentsTemplate/default-layout/default-layout.component';
import { FormRegisterClientComponent } from '../../../../moduleClient/components/form-register-client/form-register-client.component';
import { EditCategoryComponent } from '../../../../moduleCategory/components/edit-category/edit-category.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [DefaultLayoutComponent, EditCategoryComponent],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryEditComponent {
  idEdit = signal('');

  #route = inject(ActivatedRoute);

  ngOnInit(): void {
    console.log(this.#route.snapshot.params['id']);
    this.idEdit.set(this.#route.snapshot.params['id']);
  }
}
