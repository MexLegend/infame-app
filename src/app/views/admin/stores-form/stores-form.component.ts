import { Component, ElementRef, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InputComponent } from 'src/app/components/Inputs/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { StoreService } from '../../../services/store.service';
import { SafeStore, Store } from 'src/app/types/store';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';

@Component({
  selector: 'app-stores-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent, LogoComponent],
  templateUrl: './stores-form.component.html',
  styleUrls: ['./stores-form.component.scss']
})
export class StoresFormComponent {

  @Input() stores!: WritableSignal<SafeStore[]>;

  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private elementRef: ElementRef,
    private authService: AuthService,
    private storeService: StoreService,
    private reactiveFormService: ReactiveFormService
  ) {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }

  handleSubmit = () => {

    if (this.form.invalid) {
      this.reactiveFormService.addFocusOnFirstInvalidInput(this.form, this.elementRef);
      return;
    }

    this.isLoading = true;

    const { name }: { name: string } = this.form.value;

    const store: Store = {
      name,
      slug: name.toLocaleLowerCase().replaceAll(" ", "_").replaceAll("-", "_"),
      userId: this.authService.getCurrentUser()!.id
    }

    const createStoreSub$ = this.storeService.createStore(store).subscribe((store) => {

      this.isLoading = false;
      this.stores.set([store]);

      this.router.navigate(["/admin/" + store.id]);
      createStoreSub$.unsubscribe();
    });
  }

}
