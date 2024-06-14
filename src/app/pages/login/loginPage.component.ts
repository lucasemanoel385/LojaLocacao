import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, Routes } from '@angular/router';
import { LoginService } from '../../moduleLogin/service/login.service';
import { Login } from '../../moduleLogin/interface/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule],
  templateUrl: './loginPage.component.html',
  styleUrl: './loginPage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

  #serviceLogin = inject(LoginService);

  #fb = inject(FormBuilder)
  #router = inject(Router)

  public loginForm = this.#fb.group({
    login: [''],
    password: ['']
  })

  submitLogin() {
    
    sessionStorage.clear();
    this.#serviceLogin.httpLogin$(this.loginForm.value as Login).subscribe(
      res => {
        sessionStorage.setItem("tokenJWT", res.token);
        sessionStorage.setItem("role", res.role);
        this.#router.navigate(['/store/dashboard']);
      });

  }
}
