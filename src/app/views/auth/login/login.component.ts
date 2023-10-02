import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthError } from 'src/app/types/emailPayload';
import { FormErrorBoxComponent } from 'src/app/components/form-error-box/form-error-box.component';
import { InputComponent } from 'src/app/components/Inputs/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    ReactiveFormsModule,
    FormErrorBoxComponent,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formSubscription$?: Subscription;

  form!: FormGroup;
  loginError: AuthError | null = null;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [{ value: null, disabled: false }, Validators.required]
    });
  }

  handleLogin() {

    const { email, password } = this.form.value;
    this.isLoading = true;
    this.loginError = null;

    const loginSub = this.authService.login(email, password).subscribe(({ error, user, tokens }) => {

      this.isLoading = false;

      if (error) {

        this.loginError = error;
        this.form.setErrors({ unauthenticated: true });

      } else {
        this.authService.setCurrentUserAndTokens(
          user!,
          {
            access_token: tokens!.access_token,
            refresh_token: tokens!.refresh_token,
          }
        );
        this.router.navigate(["/"]);
      }

      loginSub.unsubscribe();
    });
  }
}
