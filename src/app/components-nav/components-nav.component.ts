import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-components-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './components-nav.component.html',
  styleUrl: './components-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsNavComponent {

  #router = inject(Router)

  authorization = localStorage.getItem("role") === "ROLE_ADMIN" ? "flex" : "none";

  logout() {
    localStorage.clear();
    this.#router.navigate(['../login'])
  }

}
