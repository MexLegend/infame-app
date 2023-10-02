import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/types/user';
import { UserService } from 'src/app/services/user.service';
import { AuthError } from 'src/app/types/emailPayload';
import { MultiSelectComponent, SelectOptions } from 'src/app/components/Inputs/multi-select/multi-select.component';
import { FormErrorBoxComponent } from 'src/app/components/form-error-box/form-error-box.component';
import { InputComponent } from 'src/app/components/Inputs/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { LogoComponent } from 'src/app/components/logo/logo.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    ReactiveFormsModule,
    FormErrorBoxComponent,
    InputComponent,
    MultiSelectComponent,
    ButtonComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formSubscription$?: Subscription;

  form!: FormGroup;
  registerError: AuthError | null = null;
  isLoading: boolean = false;

  isAdminOptions: SelectOptions[] = [
    {
      key: "Yes",
      value: true
    },
    {
      key: "No",
      value: false
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.route.fragment.subscribe((fragment: any) => {
      const isAdmin = fragment === 'admin';
      this.form = this.initForm(isAdmin);
    });

  }

  ngOnDestroy(): void {
    this.formSubscription$?.unsubscribe();
  }

  initForm(isAdmin: boolean): FormGroup {
    return this.formBuilder.group({
      isAdmin: [{ value: isAdmin, disabled: false }, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      firstName: [{ value: null, disabled: false }, Validators.required],
      lastName: [{ value: null, disabled: false }, Validators.required],
      password: [{ value: null, disabled: false }, Validators.required],
      confirmPassword: [{ value: null, disabled: false }, Validators.required]
    });
  }

  handleRegister() {

    const { isAdmin, email, firstName, lastName, password, confirmPassword } = this.form.value;

    this.registerError = null;
    this.formSubscription$?.unsubscribe();

    // Validate password match
    if (!this.validatePasswordsMatch(password, confirmPassword)) return;

    this.isLoading = true;

    const user: User = {
      email,
      firstName,
      lastName,
      password,
      role: isAdmin ? "ADMIN" : "CLIENT"
    }

    const registerSub = this.userService.registerUser(user).subscribe(({ error, user }) => {

      if (error) {

        this.registerError = "ExistsAlready";
        this.form.controls['email'].setErrors({ existsAlready: true });

      } else {

        this.router.navigate(["/signin"]);

      }

      this.isLoading = false;

      registerSub.unsubscribe();
    });
  }

  handleHideErrors() {
    this.formSubscription$ =
      this.form.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe(() => this.registerError = null);
  }

  validatePasswordsMatch(password: string, confirmPassword: string): boolean {
    if (password !== confirmPassword) {
      this.registerError = "PasswordMismatch";
      this.form.controls['password'].setValue(null);
      this.form.controls['confirmPassword'].setValue(null);
      this.form.controls['password'].setErrors({ passwordmismatch: true });
      this.form.controls['confirmPassword'].setErrors({ passwordmismatch: true, disabled: false });
      this.form.updateValueAndValidity();
      this.handleHideErrors();
      return false;
    }

    return true;
  }

}
