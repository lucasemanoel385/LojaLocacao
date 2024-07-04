import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
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
export class LoginPageComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.getLoginError.set(null)
  }

  #serviceLogin = inject(LoginService);

  public getLoginError = this.#serviceLogin.getLoginError;

  #fb = inject(FormBuilder)
  #router = inject(Router)

  public loginForm = this.#fb.group({
    login: [''],
    password: ['']
  })

  submitLogin() {
    
    localStorage.clear();
    this.#serviceLogin.httpLogin$(this.loginForm.value as Login).subscribe(
      res => {
        localStorage.setItem("tokenJWT", res.token);
        localStorage.setItem("role", res.role);
        this.#router.navigate(['/store/dashboard']);
      });

  }
}
