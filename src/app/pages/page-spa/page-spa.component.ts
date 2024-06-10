import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DefaultLayoutComponent } from '../../componentsTemplate/default-layout/default-layout.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-spa',
  standalone: true,
  imports: [DefaultLayoutComponent, RouterOutlet],
  templateUrl: './page-spa.component.html',
  styleUrl: './page-spa.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSPAComponent implements OnInit{

  #router = inject(ActivatedRoute);

  ngOnInit(): void {
    console.log(this.#router.snapshot.params['id']);
  
  }

}
