import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditItemComponent implements OnInit {

  ngOnInit(): void {
    this.idParamItem.set(this.#router.snapshot.params['id']);
  }

  #router = inject(ActivatedRoute)

  idParamItem = signal('');

}
