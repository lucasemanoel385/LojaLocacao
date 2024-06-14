import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../moduleLogin/service/login.service';

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

  authorization = sessionStorage.getItem("role") === "ROLE_ADMIN" ? "flex" : "none";

  logout() {
    sessionStorage.clear();
    this.#router.navigate(['../login'])
  }

}
