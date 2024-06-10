import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CreateCategoryComponent],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCategoryComponent {

  idEdit = signal('');
  #router = inject(ActivatedRoute);

  ngOnInit(): void {
    this.idEdit.set(this.#router.snapshot.params['id']);
  }
}
